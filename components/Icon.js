import * as React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Icon(props) {
  return (
    <Ionicons
      name={props.name}
      size={props.size}
      style={{ marginBottom: -3, marginHorizontal: 5 }}
      color={props.focused ? props.focused : "#ccc"} // Default Grey
    />
  );
}
