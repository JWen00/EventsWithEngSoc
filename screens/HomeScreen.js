import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native";
import NfcManager, { NfcTech } from "react-native-nfc-manager";

import Icon from "../components/Icon";
import { GlobalStyles } from "../constants/GlobalStyle";
import Colors from "../constants/Colors";
import { TextInput } from "react-native-gesture-handler";

/* 
TODO: Upgrade the form to formik and add error checking.
*/

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      zIDInput: "",
      nameInput: "",
      inputReady: false,
    };
  }

  render() {
    return (
      <View style={GlobalStyles.contentContainer}>
        <Text>Hello, enable NFC to scan ID cards</Text>
        <View style={styles.addButton}>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                modalVisible: true,
              });
            }}
          >
            <Icon size={45} focused={Colors.white} name="md-add" />
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({
              modalVisible: false,
            });
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalButton}>
              {this.state.inputReady == true ? (
                <TouchableOpacity onPress={submitInput()}>
                  <Icon size={27} focused={Colors.grey} name="md-paper-plane" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      zIDInput: "",
                      nameInput: "",
                      inputReady: false,
                      modalVisible: false,
                    });
                  }}
                >
                  <Icon size={27} focused={Colors.grey} name="md-trash" />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputLabel}>
                <Text>zID</Text>
              </View>
              <View style={styles.inputContent}>
                <TextInput
                  onChangeText={(zID) => {
                    this.setState({
                      zIDInput: zID,
                    });
                  }}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputLabel}>
                <Text>Full Name</Text>
              </View>
              <View style={styles.inputContent}>
                <TextInput
                  onChangeText={(name) => {
                    this.setState({
                      nameInput: name,
                    });
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addButton: {
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
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    position: "relative",
    top: 220,
    padding: 5,
    backgroundColor: Colors.white,
    borderRadius: 20,
    shadowColor: "black",
    elevation: 5,
    paddingBottom: 35,
    paddingTop: 25,
  },
  modalButton: {
    height: 50,
    width: 50,
    borderRadius: 8,
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  inputLabel: {
    textAlign: "right",
    fontSize: 14,
    color: Colors.grey,
  },

  inputContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 250,
    padding: 3,
    margin: 10,
    height: 40,
  },

  inputContent: {
    textAlignVertical: "center",
    width: 165,
    borderBottomColor: Colors.lightGrey,
    borderWidth: 1,
    borderColor: Colors.white,
  },
});
