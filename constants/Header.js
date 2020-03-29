import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Header({ title }) {
  return (
    <View style={styles.header}>
      <Image
        source={require("../assets/images/icon.png")}
        style={styles.headerImage}
      />
      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#071526",
    letterSpacing: 0.8,
    alignContent: "center"
  },
  headerImage: {
    width: 40,
    height: 40,
    marginHorizontal: 10
  }
});
