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
import SignInRow from "../components/SignInRow";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import { GlobalStyles } from "../constants/GlobalStyles";
import { AnimatedCircularProgress } from "react-native-circular-progress";

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
      <Icon size={35} focused={Colors.white} name="md-add" />
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
      {!openCamera && (
        <>
          <View style={styles.card}>
            <View style={styles.miniStat}>
              <MaterialCommunityIcons
                name="account-check"
                size={50}
                color="black"
              />
              <View style={styles.miniStatText}>
                <Text style={GlobalStyles.titleText}>Sign ins</Text>
                <Text>93</Text>
              </View>
            </View>
            <View style={styles.progressMeter}>
              <AnimatedCircularProgress
                size={75}
                width={10}
                fill={77}
                tintColor="#22b34e"
                onAnimationComplete={() => console.log("onAnimationComplete")}
                backgroundColor="#cc2d2d"
              >
                {(fill) => <Text style={GlobalStyles.titleText}>{fill}%</Text>}
              </AnimatedCircularProgress>
              <View></View>
            </View>
            <View style={styles.miniStat}>
              <View style={styles.miniStatText}>
                <Text style={GlobalStyles.titleText}>Tickets</Text>
                <Text>121</Text>
              </View>
              <Entypo name="ticket" size={50} color="black" />
            </View>
          </View>
          <View style={styles.signIns}>
            <Text style={styles.signInText}>Recent Sign ins</Text>
            <View style={styles.rowContainer}>
              <SignInRow />
              <SignInRow />
              <SignInRow />
              <SignInRow />
              <SignInRow />
            </View>
          </View>
        </>
      )}

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
            style={styles.cameraStyle}
          />
        )}
      </View>

      <View style={styles.buttonContainerLeft}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setPopUp(!openPopUp);
          }}
        >
          <Icon size={27} focused={Colors.grey} name="md-add" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainerRight}>
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
  cameraStyle: {
    ...StyleSheet.absoluteFill,
  },

  buttonContainerLeft: {
    justifyContent: "space-between",
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  buttonContainerRight: {
    justifyContent: "space-between",
    position: "absolute",
    bottom: 10,
    right: 10,
  },

  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    height: 100,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  miniStat: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  miniStatText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
  signIns: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    height: 420,
    margin: 10,
    // display: "flex",
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-evenly",
  },

  signInText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    left: 15,
    top: 15,
    marginBottom: 40,
  },

  rowContainer: {
    display: "flex",
  },
  signInRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },

  signInIcon: {
    display: "flex",
    flexDirection: "row",
  },
  personIcon: {
    //marginBottom: 10,
    bottom: 3,
  },
  personDetails: {
    marginLeft: 10,
  },
  timeStamp: {
    marginBottom: 20,
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
    borderWidth: 2,
    borderColor: Colors.oceanBlue,
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
