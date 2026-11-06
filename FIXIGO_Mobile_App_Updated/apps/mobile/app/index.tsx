import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSessionStore } from "../src/store/session";
import { FixigoBanner } from "../src/components/FixigoBanner";
import { Card } from "../src/components/ui";
import { theme } from "../src/theme";

export default function WelcomeScreen() {
  const router = useRouter();
  const setRole = useSessionStore(state => state.setRole);
  const choose = (role: "customer" | "worker") => {
    setRole(role);
    router.push(role === "customer" ? "/customer" : "/worker");
  };
  return <ScrollView contentContainerStyle={styles.page}>
    <FixigoBanner />
    <View style={styles.intro}>
      <Text style={styles.eyebrow}>WELCOME TO FIXIGO</Text>
      <Text style={styles.heading}>How would you like to use FIXIGO?</Text>
      <Text style={styles.copy}>Choose your experience to get started. You can continue as a customer or as a service professional.</Text>
    </View>
    <Card style={styles.choiceCard}>
      <Pressable style={styles.option} onPress={() => choose("customer")}>
        <View style={styles.icon}><Text style={styles.iconText}>⌂</Text></View>
        <View style={{flex:1}}><Text style={styles.optionTitle}>I need a service</Text><Text style={styles.optionSub}>Find skilled professionals for work you need done.</Text></View>
        <Text style={styles.arrow}>›</Text>
      </Pressable>
      <View style={styles.rule}/>
      <Pressable style={styles.option} onPress={() => choose("worker")}>
        <View style={[styles.icon,{backgroundColor:"#FFF4D8"}]}><Text style={[styles.iconText,{color:"#956600"}]}>✦</Text></View>
        <View style={{flex:1}}><Text style={styles.optionTitle}>I provide services</Text><Text style={styles.optionSub}>Find suitable work and manage your professional activity.</Text></View>
        <Text style={styles.arrow}>›</Text>
      </Pressable>
    </Card>
    <Text style={styles.footer}>Right Place. Right Skill. Right Time.</Text>
  </ScrollView>;
}
const styles=StyleSheet.create({
 page:{flexGrow:1,backgroundColor:theme.colors.background,padding:16,paddingTop:48,paddingBottom:30},
 intro:{marginTop:20,marginBottom:20},
 eyebrow:{color:theme.colors.primary,fontSize:10,fontWeight:"900",letterSpacing:1.5,marginBottom:8},
 heading:{fontSize:27,fontWeight:"900",color:theme.colors.text,lineHeight:33,letterSpacing:-.6},
 copy:{fontSize:14,lineHeight:21,color:theme.colors.muted,marginTop:9},
 choiceCard:{paddingVertical:5},
 option:{flexDirection:"row",alignItems:"center",gap:12,paddingVertical:15},
 icon:{width:46,height:46,borderRadius:15,backgroundColor:theme.colors.paleMint,alignItems:"center",justifyContent:"center"},
 iconText:{fontSize:25,color:theme.colors.primary,fontWeight:"800"},
 optionTitle:{fontWeight:"900",color:theme.colors.text,fontSize:15},
 optionSub:{fontSize:11,lineHeight:16,color:theme.colors.muted,marginTop:4},
 arrow:{fontSize:28,color:theme.colors.primary},
 rule:{height:1,backgroundColor:theme.colors.border},
 footer:{textAlign:"center",fontWeight:"800",color:theme.colors.primary,fontSize:12,marginTop:24}
});
