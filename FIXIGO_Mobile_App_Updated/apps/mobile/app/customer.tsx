import { Linking } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Audio } from "expo-av";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as SecureStore from "expo-secure-store";

import { createServiceRequest } from "../src/lib/api";
import { Action, Card, Pill, ui } from "../src/components/ui";
import { FixigoBanner } from "../src/components/FixigoBanner";
import { ProfileSetup } from "../src/components/ProfileSetup";
import { theme } from "../src/theme";

const DRAFT_KEY = "fixigo.customer.requestDraft.v1";

const categories = [
  { icon: "⚡", name: "Electrical", desc: "Wiring, switches & power" },
  { icon: "🚰", name: "Plumbing", desc: "Leaks, taps & fittings" },
  { icon: "❄️", name: "Appliance repair", desc: "AC, fridge & appliances" },
  { icon: "🪚", name: "Carpentry", desc: "Furniture & woodwork" },
  { icon: "🧹", name: "Cleaning", desc: "Home & workplace" },
  { icon: "🧰", name: "General maintenance", desc: "Everyday repairs" },
  { icon: "📦", name: "Moving assistance", desc: "Loading & shifting" },
  { icon: "🌿", name: "Gardening", desc: "Outdoor maintenance" },
];

type Draft = {
  description: string;
  category: string;
  updatedAt: string;
};

type Booking = {
  id: string;
  name: string;
  category: string;
  date: string;
  status: string;
  amount: string;
  details?: BookingDetailData & {
    providerConfirmed?: boolean;
    providerPhone?: string;
  };
};

type Tab = "Home" | "Drafts" | "Messages" | "Profile";

type BookingPhoto = {
  uri: string;
  caption?: string;
};

type BookingDetailData = {
  providerName?: string;
  providerTitle?: string;
  providerExperience?: string;
  providerRating?: string;
  providerVerified?: boolean;
  beforePhotos?: BookingPhoto[];
  afterPhotos?: BookingPhoto[];
  quotationStatus?: string;
  quotationAmount?: number;
  quotationApprovedAt?: string;
  laborCost?: number;
  travelCost?: number;
  materialCost?: number;
  complexityCost?: number;
  urgencyAdjustment?: number;
  paymentStatus?: string;
  paymentMethod?: string;
  paymentReference?: string;
  customerPaid?: number;
  platformCommission?: number;
  providerPayout?: number;
  paidAt?: string;
  aiEstimate?: {
    suggestedMinimum?: number;
    suggestedMaximum?: number;
    calculatedAmount?: number;
    explanation?: string;
    modelVersion?: string;
  };
};

export default function CustomerScreen() {
  const [tab, setTab] = useState<Tab>("Home");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Electrical");
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [draftLoaded, setDraftLoaded] = useState(false);

  const [selectedBooking, setSelectedBooking] =
    useState<Booking | null>(null);

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "FX-2041",
      name: "Kitchen tap repair",
      category: "Plumbing",
      date: "Oct 28, 2026",
      status: "Completed",
      amount: "₹650",
    },
    {
      id: "FX-2034",
      name: "Ceiling fan installation",
      category: "Electrical",
      date: "Oct 21, 2026",
      status: "Completed",
      amount: "₹500",
    },
  ]);

  const userName = "Ashish";

  useEffect(() => {
    let mounted = true;

    async function loadDraft() {
      try {
        const raw = await SecureStore.getItemAsync(DRAFT_KEY);
        if (!mounted) return;

        if (raw) {
          const saved = JSON.parse(raw) as Draft;

          if (
            saved &&
            typeof saved.description === "string" &&
            typeof saved.category === "string"
          ) {
            setDraft(saved);
            setDescription(saved.description);
            setCategory(saved.category);
          }
        }
      } catch {
        // A malformed or unavailable draft won't prevent the screen opening.
      } finally {
        if (mounted) setDraftLoaded(true);
      }
    }

    void loadDraft();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!draftLoaded) return;

    const trimmed = description.trim();

    if (!trimmed) {
      setDraft(null);
      void SecureStore.deleteItemAsync(DRAFT_KEY).catch(() => {});
      return;
    }

    const nextDraft: Draft = {
      description,
      category,
      updatedAt: new Date().toISOString(),
    };

    setDraft(nextDraft);

    void SecureStore.setItemAsync(
      DRAFT_KEY,
      JSON.stringify(nextDraft)
    ).catch(() => {});
  }, [description, category, draftLoaded]);

  async function submit() {
    if (loading) return;

    if (description.trim().length < 8) {
      Alert.alert(
        "Add a little more detail",
        "Describe the work so we can understand what you need."
      );
      return;
    }

    setLoading(true);

    try {
      const result = await createServiceRequest({
        customer_id: "demo-customer",
        description: `${category}: ${description.trim()}`,
        urgency: "normal",
      });

      Alert.alert(
        "Request submitted",
        `Your demo request ID is ${result.request_id}.`
      );

      setBookings((current) => [
        {
          id: result.request_id,
          name: description.trim(),
          category,
          date: "Just now",
          status: "Request submitted",
          amount: "Estimate pending",
        },
        ...current,
      ]);

      setDescription("");
      setDraft(null);

      await SecureStore.deleteItemAsync(DRAFT_KEY);
    } catch (error) {
      Alert.alert(
        "Request not submitted",
        error instanceof Error
          ? error.message
          : "Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function chooseCategory(name: string) {
    setCategory(name);

    setDescription((current) =>
      current.trim()
        ? current
        : `I need ${name.toLowerCase()} service. `
    );
  }

  function openDraft() {
    if (draft) {
      setDescription(draft.description);
      setCategory(draft.category);
    }

    setTab("Home");
  }

  async function deleteDraft() {
    try {
      await SecureStore.deleteItemAsync(DRAFT_KEY);
    } catch {
      // Continue clearing the in-memory draft if storage is unavailable.
    }

    setDraft(null);
    setDescription("");

    Alert.alert("Draft deleted", "Your saved draft was removed.");
  }

  const visibleBookings = useMemo(
    () => bookings.slice(0, 3),
    [bookings]
  );

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.page}
        contentInsetAdjustmentBehavior="never"
        automaticallyAdjustContentInsets={false}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <FixigoBanner />

        <View style={styles.content}>
          {selectedBooking ? (
            <BookingDetails
              booking={selectedBooking}
              onBack={() => setSelectedBooking(null)}
            />
          ) : (
            <>
              {tab === "Home" && (
                <>
                  <View style={styles.welcomeRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.greeting}>
                        Welcome back, {userName} 👋
                      </Text>

                      <Text style={styles.welcomeSub}>
                        How can I help you today?
                      </Text>
                    </View>

                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>
                        {userName.slice(0, 1)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.searchBox}>
                    <Text style={styles.searchIcon}>⌕</Text>

                    <TextInput
                      value={description}
                      onChangeText={setDescription}
                      placeholder="Describe what you need..."
                      placeholderTextColor="#89958F"
                      style={styles.searchInput}
                      multiline
                      returnKeyType="search"
                    />

                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel="Voice input"
                      style={styles.mic}
                      onPress={() =>
                        Alert.alert(
                          "Voice search",
                          "Voice-to-text will be connected with the speech recognition service."
                        )
                      }
                    >
                      <Text style={styles.micText}>🎙</Text>
                    </Pressable>
                  </View>

                  <View style={styles.rowBetween}>
                    <Text style={ui.section}>Find a service</Text>
                    <Text style={styles.smallHint}>
                      Choose a category
                    </Text>
                  </View>

                  <View style={styles.categories}>
                    {categories.map((item) => (
                      <Pressable
                        key={item.name}
                        onPress={() => chooseCategory(item.name)}
                        style={[
                          styles.category,
                          category === item.name &&
                            styles.categorySelected,
                        ]}
                      >
                        <Text style={styles.categoryIcon}>
                          {item.icon}
                        </Text>

                        <Text style={styles.categoryName}>
                          {item.name}
                        </Text>

                        <Text style={styles.categoryDesc}>
                          {item.desc}
                        </Text>
                      </Pressable>
                    ))}
                  </View>

                  <Card style={styles.requestCard}>
                    <View style={styles.rowBetween}>
                      <View>
                        <Pill>YOUR REQUEST</Pill>

                        <Text style={styles.requestTitle}>
                          Tell us a little more
                        </Text>
                      </View>

                      <Text style={styles.selectedCategory}>
                        {category}
                      </Text>
                    </View>

                    <TextInput
                      value={description}
                      onChangeText={setDescription}
                      placeholder="Describe the issue, task, or service you are looking for..."
                      placeholderTextColor="#89958F"
                      multiline
                      style={styles.detailInput}
                    />

                    <View style={styles.rowBetween}>
                      <Text style={styles.helper}>
                        {draft
                          ? "Your unfinished request is saved as a draft."
                          : "Your request is saved as a draft while you type."}
                      </Text>

                      <Text style={styles.helper}>
                        {description.trim().length} chars
                      </Text>
                    </View>

                    {draft && (
                      <Pressable
                        style={styles.draftShortcut}
                        onPress={() => setTab("Drafts")}
                      >
                        <Text style={styles.draftShortcutText}>
                          ✎ You have a saved draft
                        </Text>

                        <Text style={styles.draftShortcutAction}>
                          View →
                        </Text>
                      </Pressable>
                    )}

                    <Action
                      title={
                        loading
                          ? "Sending request..."
                          : "Continue →"
                      }
                      onPress={submit}
                    />
                  </Card>

                  <View style={styles.sectionHeading}>
                    <Text style={ui.section}>
                      Previous bookings
                    </Text>

                    <Text style={styles.smallHint}>
                      Your recent activity
                    </Text>
                  </View>

                  {visibleBookings.length > 0 ? (
                    visibleBookings.map((booking) => (
                      <Pressable
                        key={booking.id}
                        onPress={() => setSelectedBooking(booking)}
                        accessibilityRole="button"
                        accessibilityLabel={`View details for ${booking.name}`}
                      >
                        <Card style={styles.bookingCard}>
                          <View style={styles.rowBetween}>
                            <Text style={styles.bookingName}>
                              {booking.name}
                            </Text>

                            <Pill
                              tone={
                                booking.status === "Completed"
                                  ? "green"
                                  : "gold"
                              }
                            >
                              {booking.status.toUpperCase()}
                            </Pill>
                          </View>

                          <Text style={ui.subtitle}>
                            {booking.category} · {booking.date}
                          </Text>

                          <View style={styles.rowBetween}>
                            <Text style={styles.bookingId}>
                              {booking.id}
                            </Text>

                            <Text style={styles.amount}>
                              {booking.amount}
                            </Text>
                          </View>

                          <Text style={styles.viewDetails}>
                            View complete service details →
                          </Text>
                        </Card>
                      </Pressable>
                    ))
                  ) : (
                    <Card style={styles.empty}>
                      <Text style={ui.subtitle}>
                        Your previous bookings will appear here after you complete a service.
                      </Text>
                    </Card>
                  )}
                </>
              )}

              {tab === "Drafts" && (
                <>
                  <Text style={styles.pageTitle}>
                    Your drafts
                  </Text>

                  {draft ? (
                    <Card style={styles.draftCard}>
                      <View style={styles.rowBetween}>
                        <Pill tone="gold">IN PROGRESS</Pill>

                        <Text style={ui.muted}>
                          {new Date(
                            draft.updatedAt
                          ).toLocaleDateString()}
                        </Text>
                      </View>

                      <Text style={styles.bookingName}>
                        {draft.category}
                      </Text>

                      <Text style={ui.subtitle}>
                        {draft.description}
                      </Text>

                      <View style={styles.rowBetween}>
                        <Action
                          title="Continue draft"
                          onPress={openDraft}
                        />

                        <Pressable onPress={deleteDraft}>
                          <Text style={styles.delete}>
                            Delete
                          </Text>
                        </Pressable>
                      </View>
                    </Card>
                  ) : (
                    <Card style={styles.empty}>
                      <Text style={styles.emptyIcon}>✎</Text>

                      <Text style={styles.bookingName}>
                        No unfinished requests
                      </Text>

                      <Text style={ui.subtitle}>
                        Your unfinished service requests will appear here.
                      </Text>

                      <Action
                        title="Find a service"
                        onPress={() => setTab("Home")}
                      />
                    </Card>
                  )}
                </>
              )}

              {tab === "Messages" && (
                <ChatCenter bookings={bookings} />
              )}

              {tab === "Profile" && (
                <ProfileSetup
                  role="customer"
                  displayName={userName}
                />
              )}
            </>
          )}
        </View>
      </ScrollView>

      {!selectedBooking && (
        <View style={styles.bottom}>
          {(
            ["Home", "Drafts", "Messages", "Profile"] as Tab[]
          ).map((name, index) => {
            const navColors = [
              "#168C78",
              "#D69B27",
              "#8164C5",
              "#E47767",
            ];

            return (
              <Pressable
                key={name}
                onPress={() => setTab(name)}
                style={styles.navItem}
              >
                <Text
                  style={[
                    styles.navIcon,
                    tab === name && {
                      color: navColors[index],
                    },
                  ]}
                >
                  {["⌂", "✎", "✉", "◉"][index]}
                </Text>

                <Text
                  style={[
                    styles.navLabel,
                    tab === name && {
                      color: navColors[index],
                      fontWeight: "900",
                    },
                  ]}
                >
                  {name}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}

/* =========================================================
   CUSTOMER-PROVIDER CHAT
   Local prototype: backend delivery is not connected yet.
========================================================= */

type ChatMessage = {
  id: string;
  kind: "text" | "image" | "voice" | "location";
  text?: string;
  uri?: string;
  createdAt: string;
  mine: boolean;
};

function ChatCenter({ bookings }: { bookings: Booking[] }) {
  const confirmedBookings = bookings.filter(
    (booking) =>
      booking.details?.providerConfirmed === true &&
      Boolean(booking.details?.providerName)
  );

  const [selectedBookingId, setSelectedBookingId] = useState(
    confirmedBookings[0]?.id ?? ""
  );

  const [messagesByBooking, setMessagesByBooking] = useState<
    Record<string, ChatMessage[]>
  >({});

  const [messageText, setMessageText] = useState("");
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [playingSound, setPlayingSound] = useState<Audio.Sound | null>(null);

  const selectedBooking = confirmedBookings.find(
    (booking) => booking.id === selectedBookingId
  );

  const messages = selectedBookingId
    ? messagesByBooking[selectedBookingId] ?? []
    : [];

  function addMessage(message: ChatMessage) {
    if (!selectedBookingId) return;

    setMessagesByBooking((current) => ({
      ...current,
      [selectedBookingId]: [
        ...(current[selectedBookingId] ?? []),
        message,
      ],
    }));
  }

  function sendTextMessage() {
    const text = messageText.trim();

    if (!text || !selectedBooking) return;

    addMessage({
      id: `${Date.now()}`,
      kind: "text",
      text,
      createdAt: new Date().toISOString(),
      mine: true,
    });

    setMessageText("");
  }

  async function sendImage() {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission required",
          "Allow photo library access to share images."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
      });

      if (result.canceled || !result.assets[0]?.uri) return;

      addMessage({
        id: `${Date.now()}`,
        kind: "image",
        uri: result.assets[0].uri,
        createdAt: new Date().toISOString(),
        mine: true,
      });
    } catch {
      Alert.alert("Image error", "Unable to select an image.");
    }
  }

  async function shareLocation() {
    try {
      const permission =
        await Location.requestForegroundPermissionsAsync();

      if (permission.status !== "granted") {
        Alert.alert(
          "Location permission",
          "Allow location access to share your current location."
        );
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = position.coords;

      addMessage({
        id: `${Date.now()}`,
        kind: "location",
        text: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: new Date().toISOString(),
        mine: true,
      });
    } catch {
      Alert.alert(
        "Location error",
        "Unable to get your current location."
      );
    }
  }

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Microphone permission",
          "Allow microphone access to record a voice message."
        );
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const result = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(result.recording);
    } catch {
      Alert.alert(
        "Recording error",
        "Unable to start voice recording."
      );
    }
  }

  async function stopRecording() {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();

      const uri = recording.getURI();
      setRecording(null);

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
      });

      if (uri) {
        addMessage({
          id: `${Date.now()}`,
          kind: "voice",
          uri,
          createdAt: new Date().toISOString(),
          mine: true,
        });
      }
    } catch {
      setRecording(null);
      Alert.alert(
        "Recording error",
        "Unable to save the voice message."
      );
    }
  }

  async function playVoice(uri: string) {
    try {
      if (playingSound) {
        await playingSound.stopAsync();
        await playingSound.unloadAsync();
        setPlayingSound(null);
      }

      const { sound } = await Audio.Sound.createAsync({ uri });

      setPlayingSound(sound);
      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          void sound.unloadAsync();
          setPlayingSound(null);
        }
      });
    } catch {
      Alert.alert(
        "Playback error",
        "Unable to play this voice message."
      );
    }
  }

  function callProvider() {
    const phone = selectedBooking?.details?.providerPhone;

    if (!phone) {
      Alert.alert(
        "Phone number unavailable",
        "This booking does not have a provider phone number yet."
      );
      return;
    }

    Linking.openURL(`tel:${phone}`).catch(() =>
      Alert.alert(
        "Call error",
        "Unable to open the phone dialer."
      )
    );
  }

  if (confirmedBookings.length === 0) {
    return (
      <View style={chatStyles.empty}>
        <Text style={chatStyles.emptyTitle}>
          No active conversations
        </Text>

        <Text style={chatStyles.emptyText}>
          Chat becomes available after a service provider confirms a booking.
        </Text>
      </View>
    );
  }

  return (
    <View style={chatStyles.container}>
      <Text style={chatStyles.heading}>Messages</Text>

      <Text style={chatStyles.subheading}>
        Communicate with your confirmed service providers.
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={chatStyles.bookingList}
      >
        {confirmedBookings.map((booking) => (
          <Pressable
            key={booking.id}
            onPress={() => setSelectedBookingId(booking.id)}
            style={[
              chatStyles.bookingChip,
              selectedBookingId === booking.id &&
                chatStyles.bookingChipActive,
            ]}
          >
            <Text style={chatStyles.bookingChipText}>
              {booking.details?.providerName}
            </Text>

            <Text style={chatStyles.bookingChipSubtext}>
              {booking.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {selectedBooking && (
        <>
          <View style={chatStyles.providerBar}>
            <View style={{ flex: 1 }}>
              <Text style={chatStyles.providerName}>
                {selectedBooking.details?.providerName}
              </Text>

              <Text style={chatStyles.providerService}>
                {selectedBooking.name} · {selectedBooking.id}
              </Text>
            </View>

            <Pressable
              onPress={callProvider}
              style={chatStyles.callButton}
            >
              <Text style={chatStyles.callButtonText}>
                Call
              </Text>
            </Pressable>
          </View>

          <ScrollView
            style={chatStyles.messageArea}
            contentContainerStyle={chatStyles.messageContent}
          >
            {messages.length === 0 ? (
              <Text style={chatStyles.noMessages}>
                No messages yet. Start the conversation.
              </Text>
            ) : (
              messages.map((message) => (
                <View
                  key={message.id}
                  style={[
                    chatStyles.messageBubble,
                    message.mine
                      ? chatStyles.myMessage
                      : chatStyles.providerMessage,
                  ]}
                >
                  {message.kind === "text" && (
                    <Text style={chatStyles.messageText}>
                      {message.text}
                    </Text>
                  )}

                  {message.kind === "image" && message.uri && (
                    <Image
                      source={{ uri: message.uri }}
                      style={chatStyles.sharedImage}
                      resizeMode="cover"
                    />
                  )}

                  {message.kind === "voice" && message.uri && (
                    <Pressable
                      onPress={() => void playVoice(message.uri!)}
                    >
                      <Text style={chatStyles.messageText}>
                        ▶ Play voice message
                      </Text>
                    </Pressable>
                  )}

                  {message.kind === "location" && message.text && (
                    <Pressable
                      onPress={() =>
                        void Linking.openURL(message.text!)
                      }
                    >
                      <Text style={chatStyles.locationText}>
                        📍 Open shared location
                      </Text>
                    </Pressable>
                  )}

                  <Text style={chatStyles.messageTime}>
                    {new Date(
                      message.createdAt
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </View>
              ))
            )}
          </ScrollView>

          <View style={chatStyles.tools}>
            <Pressable
              onPress={() => void sendImage()}
              style={chatStyles.toolButton}
            >
              <Text style={chatStyles.toolText}>Photo</Text>
            </Pressable>

            <Pressable
              onPress={() => void shareLocation()}
              style={chatStyles.toolButton}
            >
              <Text style={chatStyles.toolText}>Location</Text>
            </Pressable>

            <Pressable
              onPress={() =>
                void (
                  recording
                    ? stopRecording()
                    : startRecording()
                )
              }
              style={[
                chatStyles.toolButton,
                recording && chatStyles.recordingButton,
              ]}
            >
              <Text style={chatStyles.toolText}>
                {recording ? "Stop recording" : "Voice"}
              </Text>
            </Pressable>
          </View>

          <View style={chatStyles.composer}>
            <TextInput
              value={messageText}
              onChangeText={setMessageText}
              placeholder="Write a message..."
              placeholderTextColor="#888"
              style={chatStyles.input}
              multiline
            />

            <Pressable
              onPress={sendTextMessage}
              style={chatStyles.sendButton}
            >
              <Text style={chatStyles.sendButtonText}>
                Send
              </Text>
            </Pressable>
          </View>

          <Text style={chatStyles.notice}>
            Local preview only. Messages and media are not delivered to the provider until a backend chat service is connected.
          </Text>
        </>
      )}
    </View>
  );
}

const chatStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16,
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "700",
    marginBottom: 5,
  },
  subheading: {
    color: "#777777",
    fontSize: 13,
    marginBottom: 16,
  },
  empty: {
    padding: 24,
    borderRadius: 16,
    backgroundColor: "#191919",
    alignItems: "center",
    marginVertical: 20,
  },
  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  emptyText: {
    color: "#AAAAAA",
    textAlign: "center",
    lineHeight: 21,
  },
  bookingList: {
    flexGrow: 0,
    marginBottom: 14,
  },
  bookingChip: {
    backgroundColor: "#202020",
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 12,
    padding: 12,
    marginRight: 9,
    minWidth: 145,
  },
  bookingChipActive: {
    borderColor: "#D6A84B",
    backgroundColor: "#302817",
  },
  bookingChipText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
  bookingChipSubtext: {
    color: "#AAAAAA",
    fontSize: 11,
    marginTop: 5,
  },
  providerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1C1C1C",
    borderRadius: 13,
    padding: 13,
    marginBottom: 12,
  },
  providerName: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  providerService: {
    color: "#AAAAAA",
    fontSize: 11,
    marginTop: 4,
  },
  callButton: {
    backgroundColor: "#D6A84B",
    borderRadius: 9,
    paddingHorizontal: 17,
    paddingVertical: 10,
  },
  callButtonText: {
    color: "#171717",
    fontWeight: "700",
  },
  messageArea: {
    minHeight: 220,
    maxHeight: 380,
    backgroundColor: "#121212",
    borderRadius: 14,
  },
  messageContent: {
    padding: 12,
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  noMessages: {
    color: "#999999",
    textAlign: "center",
    marginVertical: 35,
  },
  messageBubble: {
    maxWidth: "82%",
    padding: 11,
    borderRadius: 13,
    marginVertical: 5,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#49391D",
  },
  providerMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#292929",
  },
  messageText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  sharedImage: {
    width: 190,
    height: 150,
    borderRadius: 9,
  },
  locationText: {
    color: "#F0C66C",
    fontWeight: "600",
  },
  messageTime: {
    color: "#AAAAAA",
    fontSize: 9,
    textAlign: "right",
    marginTop: 6,
  },
  tools: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  toolButton: {
    backgroundColor: "#292929",
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 9,
  },
  recordingButton: {
    backgroundColor: "#713333",
  },
  toolText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  composer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 100,
    color: "#FFFFFF",
    backgroundColor: "#252525",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  sendButton: {
    backgroundColor: "#D6A84B",
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: 10,
  },
  sendButtonText: {
    color: "#171717",
    fontWeight: "700",
  },
  notice: {
    color: "#888888",
    fontSize: 10,
    marginTop: 10,
    lineHeight: 15,
  },
});

/* =========================================================
   BOOKING DETAILS
========================================================= */

function BookingDetails({
  booking,
  onBack,
}: {
  booking: Booking;
  onBack: () => void;
}) {
  // Replace this with the booking-specific record returned by your API.
  // Missing information is deliberately not fabricated.
  const detail: BookingDetailData = booking.details ?? {};

  const money = (value?: number) =>
    value === undefined
      ? "Not available"
      : `₹${value.toLocaleString("en-IN")}`;

  const pricingItems = [
    ["Labor", detail.laborCost],
    ["Travel", detail.travelCost],
    ["Materials / parts", detail.materialCost],
    ["Job complexity", detail.complexityCost],
    ["Permitted urgency adjustment", detail.urgencyAdjustment],
  ] as const;

  const hasItemizedPrice = pricingItems.some(
    ([, value]) => value !== undefined
  );

  const renderPhotos = (
    title: string,
    items?: BookingPhoto[]
  ) => (
    <View style={detailStyles.section}>
      <Text style={detailStyles.sectionTitle}>
        {title}
      </Text>

      {items && items.length > 0 ? (
        <View style={detailStyles.photoGrid}>
          {items.map((photo, index) => (
            <View
              key={`${photo.uri}-${index}`}
              style={detailStyles.photoItem}
            >
              <Image
                source={{ uri: photo.uri }}
                style={detailStyles.photo}
              />

              <Text style={detailStyles.photoCaption}>
                {photo.caption || `Photo ${index + 1}`}
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={detailStyles.unavailable}>
          <Text style={detailStyles.emptyIcon}>▧</Text>

          <Text style={detailStyles.muted}>
            No {title.toLowerCase()} have been uploaded for this booking.
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={detailStyles.container}>
      <Pressable
        onPress={onBack}
        style={detailStyles.backButton}
      >
        <Text style={detailStyles.backText}>
          ‹  Back to bookings
        </Text>
      </Pressable>

      <View style={detailStyles.hero}>
        <Text style={detailStyles.eyebrow}>
          FIXIGO SERVICE HISTORY
        </Text>

        <Text style={detailStyles.heroTitle}>
          {booking.name}
        </Text>

        <Text style={detailStyles.heroSubtitle}>
          {booking.id} · {booking.date}
        </Text>

        <View style={detailStyles.heroBottom}>
          <Text style={detailStyles.totalLabel}>
            Recorded booking amount
          </Text>

          <Text style={detailStyles.total}>
            {booking.amount}
          </Text>
        </View>

        <View style={detailStyles.statusPill}>
          <Text style={detailStyles.statusText}>
            {booking.status}
          </Text>
        </View>
      </View>

      <View style={detailStyles.section}>
        <Text style={detailStyles.sectionTitle}>
          Service information
        </Text>

        <DetailRow label="Booking ID" value={booking.id} />
        <DetailRow label="Service" value={booking.name} />
        <DetailRow label="Category" value={booking.category} />
        <DetailRow label="Booking date" value={booking.date} />
        <DetailRow label="Completion status" value={booking.status} />
      </View>

      <View style={detailStyles.section}>
        <Text style={detailStyles.sectionTitle}>
          Service professional
        </Text>

        <Text style={detailStyles.providerName}>
          {detail.providerName || "Provider information unavailable"}
        </Text>

        <DetailRow
          label="Professional title"
          value={detail.providerTitle || "Not available"}
        />

        <DetailRow
          label="Experience"
          value={detail.providerExperience || "Not available"}
        />

        <DetailRow
          label="Customer rating"
          value={detail.providerRating || "Not available"}
        />

        <DetailRow
          label="Identity verification"
          value={
            detail.providerVerified === undefined
              ? "Not available"
              : detail.providerVerified
                ? "Verified"
                : "Not verified"
          }
        />
      </View>

      {renderPhotos(
        "Before-service photographs",
        detail.beforePhotos
      )}

      {renderPhotos(
        "After-service photographs",
        detail.afterPhotos
      )}

      <View style={detailStyles.section}>
        <Text style={detailStyles.sectionTitle}>
          FIXIGO quotation & price estimation
        </Text>

        <Text style={detailStyles.explanation}>
          FIXIGO's pricing workflow can consider labor, travel,
          materials, job complexity, permitted urgency adjustments
          and configured platform rules. AI may help interpret the
          job and estimate its characteristics, while deterministic
          platform logic validates the final amount.
        </Text>

        <DetailRow
          label="Quotation status"
          value={detail.quotationStatus || "Not available"}
        />

        <DetailRow
          label="Provider quotation"
          value={money(detail.quotationAmount)}
        />

        <DetailRow
          label="Customer approval time"
          value={detail.quotationApprovedAt || "Not available"}
        />

        <View style={detailStyles.separator} />

        <Text style={detailStyles.subheading}>
          Itemized price components
        </Text>

        {hasItemizedPrice ? (
          pricingItems.map(([label, value]) => (
            <DetailRow
              key={label}
              label={label}
              value={money(value)}
            />
          ))
        ) : (
          <View style={detailStyles.unavailable}>
            <Text style={detailStyles.muted}>
              The itemized quotation has not been connected to this booking yet.
            </Text>
          </View>
        )}
      </View>

      <View style={detailStyles.section}>
        <Text style={detailStyles.sectionTitle}>
          AI-assisted price intelligence
        </Text>

        <DetailRow
          label="Suggested price range"
          value={
            detail.aiEstimate?.suggestedMinimum !== undefined &&
            detail.aiEstimate?.suggestedMaximum !== undefined
              ? `${money(detail.aiEstimate.suggestedMinimum)} – ${money(detail.aiEstimate.suggestedMaximum)}`
              : "Not available"
          }
        />

        <DetailRow
          label="Validated estimate"
          value={money(detail.aiEstimate?.calculatedAmount)}
        />

        <DetailRow
          label="Model version"
          value={detail.aiEstimate?.modelVersion || "Not available"}
        />

        <Text style={detailStyles.explanation}>
          {detail.aiEstimate?.explanation ||
            "No saved AI estimate is available for this booking. An estimate must be generated from actual job details and validated by FIXIGO's pricing rules. The AI model cannot independently commit a final financial amount."}
        </Text>
      </View>

      <View style={detailStyles.section}>
        <Text style={detailStyles.sectionTitle}>
          Payment & settlement
        </Text>

        <DetailRow
          label="Payment status"
          value={detail.paymentStatus || "Not available"}
        />

        <DetailRow
          label="Payment method"
          value={detail.paymentMethod || "Not available"}
        />

        <DetailRow
          label="Transaction reference"
          value={detail.paymentReference || "Not available"}
        />

        <DetailRow
          label="Amount paid by customer"
          value={money(detail.customerPaid)}
        />

        <DetailRow
          label="Platform commission"
          value={money(detail.platformCommission)}
        />

        <DetailRow
          label="Provider payout"
          value={money(detail.providerPayout)}
        />

        <DetailRow
          label="Payment timestamp"
          value={detail.paidAt || "Not available"}
        />

        <Text style={detailStyles.explanation}>
          Customer payment, platform commission and provider payout
          must come from the actual transaction ledger. They are
          not inferred from the booking amount.
        </Text>
      </View>

      <View style={detailStyles.footer}>
        <Text style={detailStyles.footerTitle}>
          Need help with this booking?
        </Text>

        <Text style={detailStyles.muted}>
          Contact FIXIGO support to report a pricing issue,
          missing work evidence or payment discrepancy.
        </Text>
      </View>
    </View>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={detailStyles.row}>
      <Text style={detailStyles.rowLabel}>
        {label}
      </Text>

      <Text style={detailStyles.rowValue}>
        {value}
      </Text>
    </View>
  );
}

const detailStyles = StyleSheet.create({
  container: {
    gap: 15,
    paddingBottom: 28,
  },
  backButton: {
    paddingVertical: 9,
  },
  backText: {
    fontSize: 15,
    fontWeight: "800",
    color: theme.colors.primary,
  },
  hero: {
    backgroundColor: theme.colors.primaryDark,
    padding: 19,
    borderRadius: 18,
    gap: 8,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: "900",
    color: "#BDE9D9",
    letterSpacing: 1,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
  },
  heroSubtitle: {
    color: "#D5E8E1",
    fontSize: 12,
  },
  heroBottom: {
    borderTopWidth: 1,
    borderColor: "#FFFFFF35",
    marginTop: 10,
    paddingTop: 13,
  },
  totalLabel: {
    color: "#D5E8E1",
    fontSize: 12,
  },
  total: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "900",
    marginTop: 3,
  },
  statusPill: {
    alignSelf: "flex-start",
    backgroundColor: "#DDF5E8",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 4,
  },
  statusText: {
    color: "#147A48",
    fontWeight: "900",
    fontSize: 11,
  },
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: theme.colors.text,
    marginBottom: 3,
  },
  providerName: {
    fontSize: 15,
    fontWeight: "800",
    color: theme.colors.text,
  },
  subheading: {
    fontSize: 14,
    fontWeight: "900",
    color: theme.colors.text,
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#EEF0ED",
  },
  rowLabel: {
    flex: 1,
    fontSize: 12,
    color: theme.colors.muted,
  },
  rowValue: {
    flex: 1,
    fontSize: 12,
    fontWeight: "800",
    color: theme.colors.text,
    textAlign: "right",
  },
  explanation: {
    fontSize: 12,
    lineHeight: 19,
    color: theme.colors.muted,
    marginTop: 5,
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: 5,
  },
  unavailable: {
    backgroundColor: "#F5F7F4",
    padding: 13,
    borderRadius: 11,
  },
  muted: {
    color: theme.colors.muted,
    fontSize: 12,
    lineHeight: 18,
  },
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  photoItem: {
    width: "47%",
  },
  photo: {
    width: "100%",
    height: 125,
    borderRadius: 11,
    backgroundColor: "#E9EEEA",
  },
  photoCaption: {
    fontSize: 11,
    color: theme.colors.muted,
    marginTop: 5,
  },
  emptyIcon: {
    fontSize: 25,
    color: theme.colors.muted,
    marginBottom: 5,
  },
  footer: {
    backgroundColor: "#EAF5F0",
    borderRadius: 15,
    padding: 15,
    gap: 7,
  },
  footerTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: theme.colors.primaryDark,
  },
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  page: {
    flexGrow: 1,
    paddingTop: 0,
  },
  content: {
    paddingHorizontal: 15,
    paddingTop: 14,
    paddingBottom: 24,
  },
  welcomeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  greeting: {
    fontSize: 23,
    fontWeight: "900",
    color: theme.colors.text,
    letterSpacing: -0.5,
  },
  welcomeSub: {
    fontSize: 15,
    color: theme.colors.muted,
    marginTop: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 18,
  },
  searchBox: {
    minHeight: 58,
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  searchIcon: {
    fontSize: 27,
    color: theme.colors.primary,
    marginRight: 9,
  },
  searchInput: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 15,
    maxHeight: 82,
    paddingVertical: 12,
  },
  mic: {
    width: 39,
    height: 39,
    borderRadius: 11,
    backgroundColor: theme.colors.paleMint,
    alignItems: "center",
    justifyContent: "center",
  },
  micText: {
    fontSize: 18,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  smallHint: {
    fontSize: 11,
    color: theme.colors.muted,
    marginBottom: 13,
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 19,
  },
  category: {
    width: "48%",
    minHeight: 108,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 15,
    padding: 13,
  },
  categorySelected: {
    borderColor: theme.colors.primary,
    backgroundColor: "#EFF8F4",
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "800",
    color: theme.colors.text,
    marginTop: 7,
  },
  categoryDesc: {
    fontSize: 11,
    color: theme.colors.muted,
    marginTop: 4,
  },
  requestCard: {
    marginBottom: 19,
  },
  requestTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: theme.colors.text,
    marginTop: 8,
  },
  selectedCategory: {
    fontSize: 12,
    color: theme.colors.primary,
    fontWeight: "800",
  },
  detailInput: {
    marginTop: 12,
    minHeight: 96,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    padding: 13,
    color: theme.colors.text,
    fontSize: 14,
  },
  helper: {
    fontSize: 11,
    color: theme.colors.muted,
    marginVertical: 10,
  },
  draftShortcut: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.paleMint,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  draftShortcutText: {
    fontSize: 12,
    fontWeight: "800",
    color: theme.colors.primary,
  },
  draftShortcutAction: {
    fontSize: 12,
    fontWeight: "900",
    color: theme.colors.primary,
  },
  sectionHeading: {
    marginTop: 3,
  },
  bookingCard: {
    marginBottom: 9,
    padding: 13,
  },
  viewDetails: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: theme.colors.border,
  },
  bookingName: {
    fontSize: 15,
    fontWeight: "800",
    color: theme.colors.text,
    flexShrink: 1,
  },
  bookingId: {
    fontSize: 11,
    color: theme.colors.muted,
    marginTop: 10,
  },
  amount: {
    fontSize: 14,
    fontWeight: "900",
    color: theme.colors.primary,
    marginTop: 8,
  },
  pageTitle: {
    fontSize: 25,
    fontWeight: "900",
    color: theme.colors.text,
    marginBottom: 12,
  },
  draftCard: {
    marginTop: 18,
    gap: 12,
  },
  delete: {
    color: "#B84A3F",
    fontSize: 13,
    fontWeight: "800",
    padding: 12,
  },
  empty: {
    marginTop: 20,
    alignItems: "center",
    paddingVertical: 28,
  },
  emptyIcon: {
    fontSize: 30,
    color: theme.colors.primary,
    marginBottom: 8,
  },
  bottom: {
    height: 76,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 6,
    paddingBottom: 5,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    flex: 1,
    minWidth: 0,
  },
  navIcon: {
    fontSize: 24,
    color: theme.colors.muted,
  },
  navLabel: {
    fontSize: 11,
    color: theme.colors.muted,
    fontWeight: "600",
    textAlign: "center",
  },
});