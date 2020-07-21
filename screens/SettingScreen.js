import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/GlobalStyles";

function SettingScreen() {
  return (
    <View style={GlobalStyles.container}>
      <Text>
        This will be the admin page to add events and post alerts and updates
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
});

export default SettingScreen;
