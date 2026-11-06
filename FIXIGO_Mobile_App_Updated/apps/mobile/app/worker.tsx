
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

import { Action, Card, Pill, ui } from "../src/components/ui";
import { FixigoBanner } from "../src/components/FixigoBanner";
import { ProfileSetup } from "../src/components/ProfileSetup";
import { theme } from "../src/theme";

export default function WorkerScreen() {
  const [tab, setTab] = useState("Overview");
  const [online, setOnline] = useState(true);
  const [accepted, setAccepted] = useState<string[]>([]);

  const nav = ["Overview", "Jobs", "Earnings", "Profile"];

  const jobs = [
    {
      id: "FX-3012",
      name: "Electrical repair",
      place: "Punalur · 2.4 km",
      price: "₹650",
      time: "Today, 2:30 PM",
      tag: "Good match",
    },
    {
      id: "FX-3018",
      name: "Ceiling fan installation",
      place: "Pathanapuram · 5.1 km",
      price: "₹500",
      time: "Today, 5:00 PM",
      tag: "New request",
    },
    {
      id: "FX-3021",
      name: "Switchboard inspection",
      place: "Punalur · 3.8 km",
      price: "₹400",
      time: "Tomorrow, 10:00 AM",
      tag: "Nearby",
    },
  ];

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={ui.page}>
        <FixigoBanner />

        <View style={ui.row}>
          <View>
            <Text style={styles.greeting}>
              Welcome back, Ramesh 👋
            </Text>

            <Text style={ui.subtitle}>
              Your skills. Your schedule. Your work.
            </Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>R</Text>
          </View>
        </View>

        {tab === "Overview" && (
          <>
            <Card style={styles.onlineCard}>
              <View style={ui.row}>
                <View>
                  <Text style={styles.onlineTitle}>
                    You're {online ? "online" : "offline"}
                  </Text>

                  <Text style={styles.onlineCopy}>
                    {online
                      ? "Available for nearby service requests"
                      : "You won't receive new job alerts"}
                  </Text>
                </View>

                <Switch
                  value={online}
                  onValueChange={setOnline}
                  trackColor={{
                    false: "#C8CEC9",
                    true: "#69CDB2",
                  }}
                  thumbColor={
                    online
                      ? theme.colors.primary
                      : "#FFFFFF"
                  }
                />
              </View>
            </Card>

            <View style={styles.stats}>
              <Stat value="12" label="Jobs completed" />
              <Stat value="₹18.4k" label="This month" />
              <Stat value="4.9 ★" label="Your rating" />
            </View>

            <View style={ui.row}>
              <Text style={ui.section}>
                New job opportunities
              </Text>

              <Text
                style={styles.link}
                onPress={() => setTab("Jobs")}
              >
                See all
              </Text>
            </View>

            {jobs.slice(0, 2).map((job) => (
              <JobCard
                key={job.id}
                job={job}
                accepted={accepted.includes(job.id)}
                onAccept={() =>
                  setAccepted((current) => [
                    ...current,
                    job.id,
                  ])
                }
              />
            ))}

            <Text style={ui.section}>
              Your work essentials
            </Text>

            <Card>
              {[
                "Manage skills & service areas",
                "Verification documents",
                "Working hours & availability",
                "Customer feedback",
              ].map((item) => (
                <Text key={item} style={styles.menuItem}>
                  {item}　›
                </Text>
              ))}
            </Card>
          </>
        )}

        {tab === "Jobs" && (
          <>
            <Text style={styles.pageTitle}>
              Job opportunities
            </Text>

            <Text style={ui.subtitle}>
              Requests that match your skills and service area.
            </Text>

            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                accepted={accepted.includes(job.id)}
                onAccept={() =>
                  setAccepted((current) => [
                    ...current,
                    job.id,
                  ])
                }
              />
            ))}
          </>
        )}

        {tab === "Earnings" && (
          <>
            <Text style={styles.pageTitle}>
              Earnings
            </Text>

            <Card style={styles.earnCard}>
              <Text
                style={{
                  color: "#D0E9E1",
                  fontSize: 12,
                }}
              >
                TOTAL EARNINGS · THIS MONTH
              </Text>

              <Text style={styles.earnValue}>
                ₹18,450
              </Text>

              <Pill tone="green">
                ↑ 12.8% from last month
              </Pill>
            </Card>

            <View style={styles.stats}>
              <Stat value="₹4,200" label="This week" />
              <Stat value="₹1,250" label="Pending payout" />
            </View>

            <Card>
              <Text style={styles.cardTitle}>
                Recent transactions
              </Text>

              {[
                "Electrical repair · +₹650",
                "Fan installation · +₹500",
                "Tap repair · +₹850",
              ].map((item) => (
                <Text key={item} style={styles.menuItem}>
                  {item}
                </Text>
              ))}
            </Card>
          </>
        )}

        {tab === "Profile" && (
          <ProfileSetup
            role="provider"
            displayName="Ramesh Kumar"
          />
        )}
      </ScrollView>

      <View style={styles.bottom}>
        {nav.map((name, index) => (
          <Pressable
            key={name}
            onPress={() => setTab(name)}
            style={styles.navItem}
          >
            <Text
              style={[
                styles.navIcon,
                tab === name && styles.navActive,
              ]}
            >
              {["⌂", "▣", "₹", "◉"][index]}
            </Text>

            <Text
              style={[
                styles.navLabel,
                tab === name && styles.navActive,
              ]}
            >
              {name}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <Card style={{ flex: 1, padding: 13 }}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Card>
  );
}

function JobCard({
  job,
  accepted,
  onAccept,
}: {
  job: {
    id: string;
    name: string;
    place: string;
    price: string;
    time: string;
    tag: string;
  };
  accepted: boolean;
  onAccept: () => void;
}) {
  return (
    <Card style={{ marginBottom: 12 }}>
      <View style={ui.row}>
        <Pill>{job.tag}</Pill>
        <Text style={ui.muted}>{job.id}</Text>
      </View>

      <Text style={styles.cardTitle}>
        {job.name}
      </Text>

      <Text style={ui.subtitle}>
        {job.place} · {job.time}
      </Text>

      <View style={ui.divider} />

      <View style={ui.row}>
        <Text style={styles.jobPrice}>
          {job.price}
        </Text>

        <View style={{ width: 135 }}>
          <Action
            title={accepted ? "Accepted ✓" : "View & accept"}
            onPress={
              accepted
                ? () =>
                    Alert.alert(
                      "Job accepted",
                      "This is a local preview state."
                    )
                : onAccept
            }
          />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  greeting: {
    fontSize: 23,
    fontWeight: "900",
    color: theme.colors.text,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: "white",
    fontWeight: "900",
    fontSize: 17,
  },

  onlineCard: {
    backgroundColor: theme.colors.primaryDark,
    marginTop: 22,
    borderWidth: 0,
  },

  onlineTitle: {
    color: "white",
    fontSize: 19,
    fontWeight: "900",
  },

  onlineCopy: {
    color: "#D0E9E1",
    fontSize: 11,
    marginTop: 5,
  },

  stats: {
    flexDirection: "row",
    gap: 8,
    marginVertical: 16,
  },

  statValue: {
    fontSize: 19,
    fontWeight: "900",
    color: theme.colors.primary,
  },

  statLabel: {
    fontSize: 10,
    color: theme.colors.muted,
    marginTop: 5,
  },

  link: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: theme.colors.text,
    marginTop: 12,
  },

  jobPrice: {
    fontSize: 19,
    fontWeight: "900",
    color: theme.colors.primary,
  },

  earnCard: {
    backgroundColor: theme.colors.primaryDark,
    marginTop: 16,
    borderWidth: 0,
  },

  earnValue: {
    fontSize: 36,
    fontWeight: "900",
    color: "white",
    marginVertical: 9,
  },

  menuItem: {
    paddingVertical: 13,
    color: theme.colors.text,
    fontWeight: "600",
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },

  pageTitle: {
    fontSize: 25,
    fontWeight: "900",
    color: theme.colors.text,
    marginBottom: 4,
  },

  bottom: {
    height: 67,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 5,
  },

  navItem: {
    alignItems: "center",
    gap: 3,
    minWidth: 58,
  },

  navIcon: {
    fontSize: 21,
    color: theme.colors.muted,
  },

  navLabel: {
    fontSize: 10,
    color: theme.colors.muted,
    fontWeight: "600",
  },

  navActive: {
    color: theme.colors.primary,
    fontWeight: "900",
  },
});
