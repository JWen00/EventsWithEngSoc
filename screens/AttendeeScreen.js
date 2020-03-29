import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { GlobalStyles } from "../constants/GlobalStyle";

export default function HomeScreen() {
  return (
    <View style={GlobalStyles.container}>
      <View style={styles.welcomeContainer}>
        <Text>View the list of attendees and their status here.</Text>
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null
};
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
