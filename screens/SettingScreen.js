import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/GlobalStyles";

function SettingScreen() {
  return (
    <View style={GlobalStyles.container}>
      <Text style={styles.farewellText}>
        Hello fellow EngSoc members! We hope 'Events with EngSoc' will be able to
        assist you guys make future EngSoc events more efficient and manageable. 
      </Text>  
      <Text style={styles.farewellText}>
        Our team had several ideas which we unfortunately ran out of time to add. Perhaps future IT could look to implement 
        being able to switch between events (so that events happening simultaneously can be handled),
        NFC implementation (think this is only possible on Android), checking in people who randomly rock up and haven't pre-registered
        or even making this an app all UNSW societies can use.
      </Text>
      <Text style={styles.farewellText}>
        A huge thank you to my team (Jennifer
        and Smit) who helped me all year to make this possible. 
        We hope you enjoy using the app :)
      </Text>
      <Text style={styles.farewellText}>
          - Richard, Jennifer, Smit (EngSoc IT 2020) 
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
  farewellText: {
    margin: 10,
  }
});

export default SettingScreen;
