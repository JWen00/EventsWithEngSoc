import { StyleSheet } from "react-native";

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  contentContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20
  },

  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333"
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20
  }
});
