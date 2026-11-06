
import React from "react";
import {
  Image,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";

export function FixigoBanner() {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={require("../../assets/images/fixigo-banner.png")}
        style={{
          width,
          height: width / 3.75,
        }}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    margin: 0,
    padding: 0,
  },
});
