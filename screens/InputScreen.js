import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { RectButton, ScrollView } from "react-native-gesture-handler";

import { GlobalStyles } from "../constants/GlobalStyle";
export default function InputScreen() {
  return (
    <View style={GlobalStyles.container}>
      <View style={styles.welcomeContainer}>
        <Text>Form Input not quite up and running yet.</Text>
      </View>
    </View>
  );
}

/*
  function handlePress() {
    WebBrowser.openBrowserAsync('LINK');
  }
*/
const styles = StyleSheet.create({
  welcomeContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20
  }
});
