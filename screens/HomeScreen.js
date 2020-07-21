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
import Colors from "../constants/Colors";
import Icon from "../components/Icon";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function HomeScreen() {
  const [openCamera, setCamera] = useState(false);
  const [openPopUp, setPopUp] = useState(false);

  const [name, setName] = useState("");
  const [zID, setzID] = useState("");
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

  const modalSubmitForm = () => {
    alert("Submitting data!");
    setPopUp(false);
    setzID("");
    setName("");
    setIsArmMem(false);
    // TEMPORARY! TODO
  };

  // const modalSubmitForm = async () => {
  //   return (
  //     fetch("localhost:5000/api/v1/submit"),
  //     {
  //       method: "POST",
  //       body: JSON.stringify({
  //         name: name,
  //         zID: zID,
  //         isArcMem: isArcMem,
  //       }),
  //     }
  //   );
  // };

  return (
    <View style={styles.contentContainer}>
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
            setPopUp(!openPopUp);
          }}
        >
          <Icon size={27} focused={Colors.grey} name="md-add" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setCamera(!openCamera);
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
          onRequestClose={() => {
            setPopUp(false);
            setzID("");
            setName("");
            setIsArmMem(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalButton}>
              {zID == "" ? (
                <TouchableOpacity
                  onPress={() => {
                    setPopUp(false);
                    setzID("");
                    setName("");
                    setIsArmMem(false);
                  }}
                >
                  <Icon size={35} focused={Colors.lightGrey} name="md-trash" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    alert("Got the data!");
                    setPopUp(false);
                    setzID("");
                    setName("");
                    setIsArmMem(false);
                  }}
                >
                  <Icon
                    size={35}
                    focused={Colors.lightGrey}
                    name="md-paper-plane"
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.inputContainer}>
              <View>
                <View style={styles.inputContent}>
                  <TextInput
                    placeholder="Full Name"
                    value={name}
                    onChangeText={(n) => {
                      setName(n);
                    }}
                  />
                </View>
                <View style={styles.inputContent}>
                  <TextInput
                    placeholder="zID"
                    value={zID}
                    onChangeText={(id) => {
                      setzID(id);
                    }}
                  />
                </View>

                <View style={styles.inputLabel}>
                  <Text>Are you an arc-member?</Text>
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
  },

  buttonContainer: {
    justifyContent: "space-between",
    position: "absolute",
    bottom: 10,
    right: 10,
  },

  button: {
    width: 60,
    height: 60,
    borderRadius: 100 / 2,
    backgroundColor: Colors.oceanBlue, // Ocean Blue
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 1.0,
    elevation: 5,
    margin: 10,
  },

  modalContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
    top: 220,
    // padding: 5,
    backgroundColor: Colors.white,
    borderRadius: 20,
    shadowColor: "black",
    elevation: 5,
    height: 300,
    paddingBottom: 35,
    paddingTop: 25,
  },
  modalButton: {
    height: 50,
    width: 50,
    borderRadius: 8,
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    // backgroundColor: Colors.primeRed,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  inputLabel: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 14,
    color: Colors.grey,
  },

  inputContainer: {
    width: 270,
  },

  inputContent: {
    // textAlignVertical: "center",
    // width: 165,
    marginBottom: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.veryLightGrey,
    borderRadius: 5,
  },
});
