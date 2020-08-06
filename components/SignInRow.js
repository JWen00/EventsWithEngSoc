import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  CheckBox,
  TextInput,
} from "react-native";
import { GlobalStyles } from "../constants/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";

// Link for all the icons availabel: https://icons.expo.fyi/

export default function SignInRow(props) {
  return (
    <View style={styles.signInRow}>
      <View style={styles.signInIcon}>
        <Ionicons
          name="md-contact"
          size={50}
          color="black"
          style={styles.personIcon}
          style={styles.personIcon}
        />
        <View style={styles.personDetails}>
          <Text style={GlobalStyles.titleText}>z5345678</Text>
          <Text style={GlobalStyles.paragraph}>David Gong</Text>
        </View>
      </View>
      <Text style={styles.timeStamp}>19:56pm</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  signInRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },

  signInIcon: {
    display: "flex",
    flexDirection: "row",
  },
  personIcon: {
    //marginBottom: 10,
    bottom: 3,
  },
  personDetails: {
    marginLeft: 10,
  },
  timeStamp: {
    marginBottom: 21,
  },
});
