import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const GlobalStyles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    margin: 20,
    flexDirection: "column",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  paragraph: {
    marginTop: 2,
    marginBottom: 5,
    lineHeight: 20,
    color: Colors.darkGrey,
  },
});
