
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
import { Action, Card, Pill } from "./ui";
import { theme } from "../theme";

type Role = "customer" | "provider";

type ProfileData = {
  fullName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  address: string;
  city: string;
  district: string;
  pinCode: string;
  occupation: string;
  organization: string;
  designation: string;
  employmentType: string;
  experience: string;
  skills: string;
  serviceArea: string;
  qualifications: string;
  identityDocument: string;
  identityImage: string;
  certificateImage: string;
};

const occupations = [
  "Student",
  "Self-employed",
  "Business owner",
  "Salaried employee",
  "Government employee",
  "Private-sector employee",
  "Employer",
  "Freelancer",
  "Homemaker",
  "Retired",
  "Unemployed",
  "Other",
];

const employmentTypes = [
  "Independent",
  "Employed",
  "Business owner",
  "Contract-based",
];

const emptyProfile: ProfileData = {
  fullName: "",
  phone: "",
  email: "",
  dateOfBirth: "",
  address: "",
  city: "",
  district: "",
  pinCode: "",
  occupation: "",
  organization: "",
  designation: "",
  employmentType: "",
  experience: "",
  skills: "",
  serviceArea: "",
  qualifications: "",
  identityDocument: "",
  identityImage: "",
  certificateImage: "",
};

export function ProfileSetup({
  role,
  displayName,
}: {
  role: Role;
  displayName?: string;
}) {
  const storageKey = `fixigo.profile.${role}.v1`;

  const [data, setData] = useState<ProfileData>({
    ...emptyProfile,
    fullName: displayName ?? "",
  });

  const [loaded, setLoaded] = useState(false);

  const [reviewStatus, setReviewStatus] = useState<
    "not_submitted" | "pending"
  >("not_submitted");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const raw = await SecureStore.getItemAsync(storageKey);

        if (raw && active) {
          const saved = JSON.parse(raw);

          setData({
            ...emptyProfile,
            ...saved.data,
          });

          setReviewStatus(
            saved.reviewStatus === "pending"
              ? "pending"
              : "not_submitted"
          );
        }
      } catch {
        // Keep the editable blank profile if local data cannot be read.
      } finally {
        if (active) setLoaded(true);
      }
    })();

    return () => {
      active = false;
    };
  }, [storageKey]);

  const update = (key: keyof ProfileData, value: string) => {
    setData((current) => ({
      ...current,
      [key]: value,
    }));

    if (reviewStatus === "pending") {
      setReviewStatus("not_submitted");
    }
  };

  const provider = role === "provider";

  const required = provider
    ? [
        data.fullName,
        data.phone,
        data.email,
        data.address,
        data.city,
        data.pinCode,
        data.occupation,
        data.designation,
        data.experience,
        data.skills,
        data.serviceArea,
      ]
    : [
        data.fullName,
        data.phone,
        data.email,
        data.address,
        data.city,
        data.pinCode,
        data.occupation,
      ];

  const completed = required.filter(
    (value) => value.trim().length > 0
  ).length;

  const progress = Math.round(
    (completed / required.length) * 100
  );

  const pickImage = async (
    target: "identityImage" | "certificateImage"
  ) => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission needed",
        "Allow photo-library access to select a document image."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 0.85,
    });

    if (!result.canceled && result.assets[0]) {
      update(target, result.assets[0].uri);
    }
  };

  const save = async (submitForReview: boolean) => {
    const missing = required.some(
      (value) => !value.trim()
    );

    if (missing) {
      Alert.alert(
        "Complete the required details",
        "Fill in all fields marked required before saving or submitting."
      );
      return;
    }

    if (submitForReview && !data.identityImage) {
      Alert.alert(
        "Identity document required",
        "Select a clear image of an accepted identity document before submitting."
      );
      return;
    }

    setSaving(true);

    const nextStatus = submitForReview
      ? "pending"
      : reviewStatus;

    try {
      await SecureStore.setItemAsync(
        storageKey,
        JSON.stringify({
          data,
          reviewStatus: nextStatus,
          updatedAt: new Date().toISOString(),
        })
      );

      setReviewStatus(nextStatus);

      Alert.alert(
        "Profile saved",
        submitForReview
          ? "Your details and selected document are saved on this device. Server upload and admin verification must be connected before this can be treated as an official verification submission."
          : "Your profile details have been saved on this device. You can return to complete verification later."
      );
    } catch {
      Alert.alert(
        "Unable to save",
        "Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (!loaded) {
    return (
      <Text style={styles.loading}>
        Loading your profile…
      </Text>
    );
  }

  return (
    <View style={styles.wrap}>
      <Text style={styles.heading}>
        {provider
          ? "Professional profile setup"
          : "Complete your profile"}
      </Text>

      <Text style={styles.intro}>
        {provider
          ? "Build a credible professional profile so customers can understand your skills, experience and verification status."
          : "Add your details so FIXIGO can keep your account and service requests accurate."}
      </Text>

      <Card style={styles.progressCard}>
        <View style={styles.rowBetween}>
          <Text style={styles.progressTitle}>
            Profile completion
          </Text>

          <Text style={styles.progressValue}>
            {progress}%
          </Text>
        </View>

        <View style={styles.track}>
          <View
            style={[
              styles.fill,
              { width: `${progress}%` },
            ]}
          />
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.hint}>
            {completed} of {required.length} required details completed
          </Text>

          <Pill tone={progress === 100 ? "green" : "gold"}>
            {progress === 100
              ? "Details complete"
              : "In progress"}
          </Pill>
        </View>
      </Card>

      <Text style={styles.section}>
        01 · Personal information
      </Text>

      <Card>
        <Field
          label="Full legal name *"
          value={data.fullName}
          onChange={(v) => update("fullName", v)}
          placeholder="Enter your name"
        />

        <Field
          label="Mobile number *"
          value={data.phone}
          onChange={(v) => update("phone", v)}
          placeholder="10-digit mobile number"
          keyboard="phone-pad"
        />

        <Field
          label="Email address *"
          value={data.email}
          onChange={(v) => update("email", v)}
          placeholder="name@example.com"
          keyboard="email-address"
        />

        <Field
          label="Date of birth"
          value={data.dateOfBirth}
          onChange={(v) => update("dateOfBirth", v)}
          placeholder="DD/MM/YYYY"
        />
      </Card>

      <Text style={styles.section}>
        02 · Address details
      </Text>

      <Card>
        <Field
          label="Residential address *"
          value={data.address}
          onChange={(v) => update("address", v)}
          placeholder="House / building, street"
          multiline
        />

        <Field
          label="City / Town *"
          value={data.city}
          onChange={(v) => update("city", v)}
          placeholder="Your city or town"
        />

        <Field
          label="District"
          value={data.district}
          onChange={(v) => update("district", v)}
          placeholder="District"
        />

        <Field
          label="PIN code *"
          value={data.pinCode}
          onChange={(v) => update("pinCode", v)}
          placeholder="6-digit PIN code"
          keyboard="number-pad"
        />
      </Card>

      <Text style={styles.section}>
        03 · Occupation & employment
      </Text>

      <Card>
        <Text style={styles.label}>
          Current occupation *
        </Text>

        <View style={styles.chips}>
          {occupations.map((item) => (
            <Choice
              key={item}
              label={item}
              selected={data.occupation === item}
              onPress={() => update("occupation", item)}
            />
          ))}
        </View>

        <Field
          label={
            provider
              ? "Professional title / trade *"
              : "Job title / profession"
          }
          value={data.designation}
          onChange={(v) => update("designation", v)}
          placeholder={
            provider
              ? "e.g. Electrician, Plumber"
              : "e.g. Teacher, Engineer"
          }
        />

        <Field
          label="Company / business / institution"
          value={data.organization}
          onChange={(v) => update("organization", v)}
          placeholder="Organization name (if applicable)"
        />

        {provider && (
          <>
            <Text style={styles.label}>
              Work arrangement
            </Text>

            <View style={styles.chips}>
              {employmentTypes.map((item) => (
                <Choice
                  key={item}
                  label={item}
                  selected={data.employmentType === item}
                  onPress={() =>
                    update("employmentType", item)
                  }
                />
              ))}
            </View>
          </>
        )}
      </Card>

      {provider && (
        <>
          <Text style={styles.section}>
            04 · Professional experience
          </Text>

          <Card>
            <Field
              label="Years of experience *"
              value={data.experience}
              onChange={(v) => update("experience", v)}
              placeholder="e.g. 4 years"
            />

            <Field
              label="Skills & specializations *"
              value={data.skills}
              onChange={(v) => update("skills", v)}
              placeholder="Separate skills with commas"
              multiline
            />

            <Field
              label="Service areas *"
              value={data.serviceArea}
              onChange={(v) => update("serviceArea", v)}
              placeholder="Areas / towns you serve"
              multiline
            />

            <Field
              label="Qualifications & certifications"
              value={data.qualifications}
              onChange={(v) => update("qualifications", v)}
              placeholder="ITI, diploma, licenses, training"
              multiline
            />
          </Card>
        </>
      )}

      <Text style={styles.section}>
        {provider ? "05" : "04"} · Identity & verification
      </Text>

      <Card>
        <View style={styles.statusRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardHeading}>
              Identity verification
            </Text>

            <Text style={styles.hint}>
              Your documents are private and should only be reviewed by authorized FIXIGO staff.
            </Text>
          </View>

          <Pill
            tone={
              reviewStatus === "pending"
                ? "gold"
                : "neutral"
            }
          >
            {reviewStatus === "pending"
              ? "Pending"
              : "Not submitted"}
          </Pill>
        </View>

        <Text style={styles.label}>
          Identity document type
        </Text>

        <View style={styles.chips}>
          {[
            "Aadhaar",
            "Driving licence",
            "Passport",
            "Voter ID",
            "Other",
          ].map((item) => (
            <Choice
              key={item}
              label={item}
              selected={data.identityDocument === item}
              onPress={() =>
                update("identityDocument", item)
              }
            />
          ))}
        </View>

        <UploadRow
          title="Identity document image *"
          uri={data.identityImage}
          onPress={() => pickImage("identityImage")}
        />

        {provider && (
          <UploadRow
            title="Qualification / certificate image"
            uri={data.certificateImage}
            onPress={() => pickImage("certificateImage")}
          />
        )}

        <Text style={styles.disclaimer}>
          Selecting an image only attaches it locally in this prototype. Secure server upload, OTP checks, document review and badge approval are not connected yet.
        </Text>
      </Card>

      {provider && (
        <Card style={styles.publicCard}>
          <Text style={styles.cardHeading}>
            What customers will see
          </Text>

          <Text style={styles.hint}>
            Your public profile can show your name, professional title, approved skills, experience, service areas, completed FIXIGO jobs and reviews. Identity documents, phone, email and residential address remain private.
          </Text>

          <View style={styles.rowBetween}>
            <Text style={styles.hint}>
              Identity badge
            </Text>
            <Pill tone="neutral">Not verified</Pill>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.hint}>
              Professional badge
            </Text>
            <Pill tone="neutral">Not verified</Pill>
          </View>
        </Card>
      )}

      <Action
        title={saving ? "Saving…" : "Save profile details"}
        onPress={() => save(false)}
      />

      <View style={{ height: 10 }} />

      <Pressable
        style={styles.submitButton}
        onPress={() => save(true)}
        disabled={saving}
      >
        <Text style={styles.submitText}>
          Submit identity for verification
        </Text>
      </Pressable>

      <Text style={styles.footerNote}>
        A verification badge will only appear after FIXIGO's backend checks and an authorized review approve the submission. Filling this form does not grant a verified badge.
      </Text>
    </View>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  multiline,
  keyboard,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  multiline?: boolean;
  keyboard?:
    | "default"
    | "phone-pad"
    | "email-address"
    | "number-pad";
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#89958F"
        multiline={multiline}
        keyboardType={keyboard ?? "default"}
        autoCapitalize={
          keyboard === "email-address"
            ? "none"
            : "sentences"
        }
        style={[
          styles.input,
          multiline && styles.multiline,
        ]}
      />
    </View>
  );
}

function Choice({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.choice,
        selected && styles.choiceSelected,
      ]}
    >
      <Text
        style={[
          styles.choiceText,
          selected && styles.choiceTextSelected,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function UploadRow({
  title,
  uri,
  onPress,
}: {
  title: string;
  uri: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.uploadRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{title}</Text>

        <Text style={styles.hint}>
          {uri
            ? "Image selected on this device"
            : "Choose a clear photo of the document"}
        </Text>
      </View>

      <Pressable
        onPress={onPress}
        style={styles.uploadButton}
      >
        <Text style={styles.uploadButtonText}>
          {uri ? "Change" : "Choose image"}
        </Text>
      </Pressable>

      {uri ? (
        <Image
          source={{ uri }}
          style={styles.thumbnail}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 12,
    paddingBottom: 26,
  },

  loading: {
    padding: 20,
    color: theme.colors.muted,
  },

  heading: {
    fontSize: 24,
    fontWeight: "900",
    color: theme.colors.text,
  },

  intro: {
    fontSize: 14,
    lineHeight: 21,
    color: theme.colors.muted,
    marginBottom: 4,
  },

  progressCard: {
    gap: 10,
  },

  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },

  progressTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: theme.colors.text,
  },

  progressValue: {
    fontSize: 17,
    fontWeight: "900",
    color: theme.colors.primary,
  },

  track: {
    height: 8,
    borderRadius: 8,
    backgroundColor: "#E9EDE9",
    overflow: "hidden",
  },

  fill: {
    height: 8,
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
  },

  hint: {
    color: theme.colors.muted,
    fontSize: 12,
    lineHeight: 18,
    flexShrink: 1,
  },

  section: {
    fontSize: 15,
    fontWeight: "900",
    color: theme.colors.primary,
    marginTop: 8,
  },

  field: {
    marginBottom: 13,
  },

  label: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 7,
  },

  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    backgroundColor: "#FFFEFC",
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 14,
    color: theme.colors.text,
  },

  multiline: {
    minHeight: 82,
    textAlignVertical: "top",
  },

  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 14,
  },

  choice: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 9,
    backgroundColor: "#fff",
  },

  choiceSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.paleMint,
  },

  choiceText: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: "700",
  },

  choiceTextSelected: {
    color: theme.colors.primaryDark,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },

  cardHeading: {
    fontSize: 15,
    fontWeight: "900",
    color: theme.colors.text,
    marginBottom: 5,
  },

  uploadRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: theme.colors.border,
  },

  uploadButton: {
    backgroundColor: theme.colors.paleMint,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  uploadButtonText: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: "900",
  },

  thumbnail: {
    width: 42,
    height: 42,
    borderRadius: 8,
  },

  disclaimer: {
    fontSize: 11,
    lineHeight: 17,
    color: "#956600",
    backgroundColor: "#FFF6E3",
    borderRadius: 10,
    padding: 11,
    marginTop: 8,
  },

  publicCard: {
    gap: 12,
  },

  submitButton: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
  },

  submitText: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: "900",
  },

  footerNote: {
    fontSize: 11,
    lineHeight: 17,
    color: theme.colors.muted,
    textAlign: "center",
    paddingHorizontal: 5,
  },
});
