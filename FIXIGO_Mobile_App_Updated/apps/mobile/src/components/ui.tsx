import React from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { theme } from "../theme";

export function Brand({ light = false }: { light?: boolean }) {
  return <View style={styles.brandRow}><View style={styles.mark}><View style={styles.markLine} /><View style={[styles.markLine, { width: 19 }]} /><View style={[styles.markLine, { width: 14 }]} /></View><Text style={[styles.brand, light && { color: "#FFFFFF" }]}>FIXIGO</Text></View>;
}
export function Pill({ children, tone = "mint" }: { children: React.ReactNode; tone?: "mint" | "gold" | "red" | "green" | "neutral" }) {
  const map = { mint: [theme.colors.paleMint, theme.colors.primary], gold: [theme.colors.paleGold, "#956600"], red: [theme.colors.paleRed, theme.colors.red], green: ["#E8F8ED", "#168447"], neutral: ["#F1F2EF", theme.colors.muted] } as const;
  return <View style={[styles.pill, { backgroundColor: map[tone][0] }]}><Text style={{ color: map[tone][1], fontSize: 12, fontWeight: "700" }}>{children}</Text></View>;
}
export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) { return <View style={[styles.card, style]}>{children}</View>; }
export function Action({ title, onPress, secondary = false }: { title: string; onPress?: () => void; secondary?: boolean }) {
  return <Pressable onPress={onPress} style={[styles.action, secondary && styles.actionSecondary]}><Text style={[styles.actionText, secondary && { color: theme.colors.text }]}>{title}</Text></Pressable>;
}
export const ui = StyleSheet.create({
  page: { flexGrow: 1, backgroundColor: theme.colors.background, padding: 20, paddingTop: 54, paddingBottom: 34 },
  title: { color: theme.colors.text, fontSize: 27, fontWeight: "800", letterSpacing: -0.5 },
  subtitle: { color: theme.colors.muted, fontSize: 15, lineHeight: 22, marginTop: 7 },
  section: { color: theme.colors.text, fontSize: 18, fontWeight: "800", marginBottom: 13 },
  eyebrow: { color: theme.colors.primary, fontSize: 11, fontWeight: "800", letterSpacing: 1.4, marginBottom: 8 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  muted: { color: theme.colors.muted, fontSize: 12 },
  divider: { height: 1, backgroundColor: theme.colors.border, marginVertical: 12 }
});
const styles = StyleSheet.create({
  brandRow: { flexDirection: "row", alignItems: "center", gap: 9 }, mark: { gap: 3 }, markLine: { width: 24, height: 5, borderRadius: 5, backgroundColor: theme.colors.primary }, brand: { color: theme.colors.primaryDark, fontSize: 21, fontWeight: "900", letterSpacing: 1.1 },
  card: { backgroundColor: theme.colors.surface, borderRadius: 18, padding: 16, borderWidth: 1, borderColor: "#EEEAE1", shadowColor: "#29443D", shadowOpacity: 0.045, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  pill: { alignSelf: "flex-start", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 7 },
  action: { backgroundColor: theme.colors.primary, paddingVertical: 14, paddingHorizontal: 16, borderRadius: 13, alignItems: "center", justifyContent: "center" }, actionSecondary: { backgroundColor: "#F1EEE6", borderWidth: 1, borderColor: theme.colors.border }, actionText: { color: "#FFFFFF", fontWeight: "800", fontSize: 14 }
});
