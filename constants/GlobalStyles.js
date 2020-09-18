import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const GlobalStyles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    margin: 20,
    flexDirection: "column",
  },
  titleText: {
    marginTop: 5,
    marginBottom: 3,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "bold",
    color: Colors.navyBlue,
  },

  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.darkGrey,
    left: 15,
    top: 15,
    marginBottom: 40,
  },

  paragraph: {
    marginTop: 4,
    marginBottom: 4,
    lineHeight: 20,
    color: Colors.darkGrey,
  },
  zid: {
    marginTop: 2,
    marginBottom: 5,
    lineHeight: 20,
    fontSize: 16,
    lineHeight: 22,
  },
});
