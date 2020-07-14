import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  CheckBox,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import GlobalStyles from "./constants/GlobalStyles";
import Colors from "./constants/Colors";
import Icon from "./components/Icon";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function App() {
  const [openCamera, setCamera] = useState(false);
  const [openPopUp, setPopUp] = useState(false);

  const [name, setName] = useState(" ");
  const [zID, setzID] = useState(" ");
  const [isArcMem, setIsArmMem] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
    })();
  }, []);

  const openModalButton = () => (
    <TouchableOpacity
      onPress={() => {
        this.setState({
          modalVisible: true,
        });
      }}
    >
      <Icon size={45} focused={Colors.white} name="md-add" />
    </TouchableOpacity>
  );

  const modalResetForm = () => {
    setPopUp(false);
    setzID("");
    setName("");
    setIsArmMem(false);
  };

  const resetFormButton = () => (
    <TouchableOpacity onPress={modalResetForm()}>
      <Icon size={27} focused={Colors.grey} name="md-trash" />
    </TouchableOpacity>
  );

  const submitFormButton = () => (
    <TouchableOpacity onPress={modalSubmitForm()}>
      <Icon size={27} focused={Colors.grey} name="md-paper-plane" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.contentContainer}>
      <Text>HEWLENRLWKENRLWKENRLWEKNRLWKENRLWKENRWLKENLRKWENK</Text>
      {/* Open the camera when button has been pressed */}
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        {openCamera && (
          <BarCodeScanner
            onBarCodeScanned={({ type, data }) => {
              setCamera(false);
              setPopUp(true);
              setzID(data);
            }}
            style={StyleSheet.absoluteFillObject}
          />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setPopUp(true);
          }}
        >
          <Icon size={27} focused={Colors.grey} name="md-add" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setCamera(true);
          }}
        >
          <Icon size={27} focused={Colors.grey} name="md-camera" />
        </TouchableOpacity>
      </View>

      {/* Open Modal when button has been pressed */}
      {openPopUp && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={openPopUp}
          onRequestClose={() => modalResetForm()}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalButton}>
              {zID == "" ? resetFormButton : submitFormButton}
            </View>
            <View style={styles.inputContainer}>
              <View>
                <View style={styles.inputLabel}>
                  <Text>Full Name</Text>
                </View>
                <View style={styles.inputContent}>
                  <TextInput
                    value={name}
                    onChangeText={(n) => {
                      setName(n);
                    }}
                  />
                </View>

                <View style={styles.inputLabel}>
                  <Text>zID</Text>
                </View>
                <View style={styles.inputContent}>
                  <TextInput
                    value={zID}
                    onChangeText={(id) => {
                      setzID(id);
                    }}
                  />
                </View>

                <View style={styles.inputLabel}>
                  <Text>Are you an arc-member?</Text>
                </View>
                <View style={styles.inputContent}>
                  <CheckBox
                    value={isArcMem}
                    onValueChange={(isChecked) => {
                      setIsArmMem(isChecked);
                    }}
                  ></CheckBox>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },

  buttonContainer: {
    justifyContent: "space-between",
    backgroundColor: Colors.navyBlue,
    position: "absolute",
    bottom: 0,
    right: 0,
  },

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
