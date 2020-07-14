import React from "react";
import { StyleSheet } from "react-native";
import Icon from "./Icon";
import Colors from "../constants/Colors";

export default function functional_button(props) {
  return (
    <TouchableOpacity styles={styles.button} onPress={props.onPress}>
      <Icon size={27} focused={Colors.grey} name={props.icon} />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    width: 70,
    height: 70,
    borderRadius: 100 / 2,
    backgroundColor: Colors.oceanBlue, // Ocean Blue
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 1.0,
    elevation: 5,
    margin: 20,
  },
});
