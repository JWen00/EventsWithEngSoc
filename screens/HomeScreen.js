import * as React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as WebBrowser from "expo-web-browser";
import { MonoText } from "../components/StyledText";

import { GlobalStyles } from "../constants/GlobalStyle";
export default function HomeScreen() {
  return (
    <View style={GlobalStyles.container}>
      <View style={styles.welcomeContainer}>
        <Text>Hello, and welcome.</Text>
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
