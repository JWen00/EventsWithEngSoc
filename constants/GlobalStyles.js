import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const GlobalStyles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },

  subtitle: {
    margin: 5,
    marginTop: 20,
    marginLeft: 15,
    fontSize: 20,
    lineHeight: 22,
    fontWeight: "bold",
    color: Colors.navyBlue,
  },

  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: Colors.navyBlue,
    marginTop: 30,
  },

  paragraph: {
    margin: 5,
    fontSize: 15,
    lineHeight: 20,
    color: Colors.navyBlue,
  },
  zid: {
    marginTop: 2,
    marginBottom: 5,
    lineHeight: 20,
    fontSize: 16,
    lineHeight: 22,
  },
});
