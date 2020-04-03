import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Modal,
  FlatList
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { GlobalStyles } from "../constants/GlobalStyle";
import TabBarIcon from "../components/TabBarIcon";

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={GlobalStyles.container}>
      {/* Main Content */}
      <View style={GlobalStyles.contentContainer}>
        <Text>Hello, and welcome.</Text>
      </View>

      {/* Add Attendee Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <TabBarIcon size={45} name="md-add" />
      </TouchableOpacity>

      {/* Modal For Adding Attendee */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPressOut={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ScrollView
            directionalLockEnabled={true}
            contentContainerStyle={styles.modalContent}
          >
            <TouchableWithoutFeedback>
              <View style={styles.modalContent2}>
                <Text style={GlobalStyles.paragraph}>
                  Hi! Sign someone in here! Currently Making Options for you C:
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
/*
// TO IMPORT: import * as WebBrowser from "expo-web-browser";
  function handlePress() {
    WebBrowser.openBrowserAsync('LINK');
  }
*/
const styles = StyleSheet.create({
  addButton: {
    width: 70,
    height: 70,
    bottom: 30,
    right: 30,
    borderRadius: 100 / 2,
    backgroundColor: "#1B324F", // Ocean Blue
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1.0,
    elevation: 5
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    top: 250,
    shadowColor: "black",
    elevation: 5
  },
  modalContent: {
    paddingVertical: 20
    // backgroundColor: "purple"
  }
});
