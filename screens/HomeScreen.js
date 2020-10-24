import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  CheckBox,
  TextInput,
  RefreshControl,
  Image,
  Button,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import { GlobalStyles } from "../constants/GlobalStyles";
import { ScrollView } from "react-native-gesture-handler";
import Draggable from "react-native-draggable";

import UserCard from "../components/UserCard";
import Colors from "../constants/Colors";
import Icon from "../components/Icon";
import { ProgressBar } from "react-native-paper";
// import graphic_vector_image from "../assets/images/home_vg.png";

export default function HomeScreen() {
  const [openCamera, setCamera] = useState(false);
  const [openManualModal, setManualModal] = useState(false);
  const [openAutoModal, setAutoModal] = useState(false);

  const [name, setName] = useState("");
  const [zID, setzID] = useState("");
  const [isArcMem, setIsArmMem] = useState(false);

  const [internalError, setError] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);

  useEffect(() => {
    async () => {
      const { status } = await Camera.requestPermissionsAsync();
    };
    refreshData();
  }, []);

  const closeAlert = () => {
    setAutoModal(false);
    setzID("");
    setName("");
    setIsArmMem(false);
  };

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const [recentSignIns, setSignIns] = useState([]);
  const [statPercentage, setStatPercentage] = useState(75);

  const refreshData = React.useCallback(() => {
    console.log("Refreshing for home screen");
    setRefreshing(true);
    fetch("https://nemesis2.dev.unswengsoc.com/recentattendees")
      .then((res) => res.json())
      .then((data) => {
        if (internalError) {
          setError(false);
        }
        setSignIns(data);
      })
      .catch((error) => console.log(error));

    fetch("https://nemesis2.dev.unswengsoc.com/signedinpercentage")
      .then((res) => res.json())
      .then((data) => {
        setStatPercentage(data.signedinpercentage);
      })
      .catch((error) => setError(true));

    wait(1500).then(() => setRefreshing(false));
  }, []);

  async function createTwoButtonAlert () {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ zid: zID.toString() });
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const response = await fetch("https://nemesis2.dev.unswengsoc.com/checkin", requestOptions);
    const message = await response.json();
    const successMessage = message.code == 200 ? "Successful Scan!" : "Something went wrong"; 
    const reason = message.response == "OK" ? "User has been successfully checked in" : message.response;
    return Alert.alert(
      successMessage,
      reason,
      [
        {
          text: "Cancel",
          onPress: () => {
            closeAlert();
            console.log("Cancel Pressed");
          },
          style: "cancel"
        },
        { text: "OK", 
          onPress: () => {
            closeAlert();
            console.log("Ok Pressed");
        }
      }
      ],
      { cancelable: false }
    );
  }
    

  return (
    <>
      {/* View when camera is open */}
      {openCamera && (
        <>
          <Camera
            style={styles.cameraStyle}
            type={Camera.Constants.Type.back}
            onBarCodeScanned={(event) => {
              setCamera(false);
              setAutoModal(true);
              console.log(event.data);
              setzID(event.data.slice(2, 9));
            }}
          ></Camera>
          <TouchableOpacity
            style={styles.cameraButtonClose}
            onPress={() => {
              setCamera(!openCamera);
            }}
          >
            <Icon size={40} focused={Colors.navyBlue} name="md-close" />
          </TouchableOpacity>
        </>
      )}

      {/* View when camera is NOT open*/}
      {!openCamera && (
        <>
          {/* Camera Button */}
          {/* <Draggable x={200} y={500}> */}
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={() => {
              setCamera(!openCamera);
            }}
          >
            <Icon size={27} focused={Colors.white} name="md-camera" />
          </TouchableOpacity>
          {/* </Draggable> */}
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={refreshData}
              />
            }
            style={GlobalStyles.contentContainer}
          >
            <View>
              {/* Cards showing recent sign-ins */}
              <View style={styles.titleContainer}>
                <Text style={GlobalStyles.title}>October Ball</Text>
                <Text style={GlobalStyles.paragraph}> 23rd October 2020 </Text>
              </View>
              <View style={styles.dashboard}>
                <View style={styles.LeftContainer}>
                  <View style={styles.labelContainer}>
                    <Icon
                      size={27}
                      focused={Colors.navyBlue}
                      name="md-people"
                    />
                    <Text style={styles.labelText}>
                      Attendence {statPercentage}%
                    </Text>
                  </View>
                  <ProgressBar
                    progress={statPercentage / 100}
                    color={Colors.successGreen}
                    style={styles.progressBar}
                  />
                </View>
                <View style={styles.RightContainer}>
                  <View style={styles.RightContainerChild}>
                    <Icon size={30} focused={Colors.primeRed} name="md-alert" />
                    <Text style={GlobalStyles.paragraph}>40 not signed in</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.RightContainerChild}
                    onPress={() => {
                      setManualModal(true);
                    }}
                  >
                    <Icon size={32} focused={Colors.navyBlue} name="md-add" />
                    <Text style={styles.addInputText}> Add Manually</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={GlobalStyles.subtitle}>Recent Sign ins</Text>
              {recentSignIns.map((person) => (
                <UserCard
                  fname={person.first_name}
                  lname={person.last_name}
                  zid={person.zid}
                  checked_in={person.checked_in}
                  paid={person.paid}
                  time={person.checked_in_time}
                  info={person.information}
                />
              ))}

              {/* Card to add a new sign-in */}
            </View>
          </ScrollView>
        </>
      )}

      {/* Open Modal when button has been pressed */}
      {openManualModal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={openManualModal}
          onRequestClose={() => {
            setManualModal(false);
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
                    setManualModal(false);
                    setzID("");
                    setName("");
                    setIsArmMem(false);
                  }}
                >
                  <Icon size={35} focused={Colors.darkGrey} name="md-trash" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    modalSubmitForm();
                    setManualModal(false);
                    setzID("");
                    setName("");
                    setIsArmMem(false);
                  }}
                >
                  <Icon
                    size={35}
                    focused={Colors.darkGrey}
                    name="md-paper-plane"
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.inputContainer}>
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
        </Modal>
      )}

      {/* Open Modal when button has been pressed */}
      {openAutoModal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={openAutoModal}
          onRequestClose={() => {
            setAutoModal(false);
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
                    setAutoModal(false);
                    setzID("");
                    setName("");
                    setIsArmMem(false);
                  }}
                >
                  <Icon size={35} focused={Colors.darkGrey} name="md-trash" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={createTwoButtonAlert}
                >
                  <Icon
                    size={35}
                    focused={Colors.darkGrey}
                    name="md-paper-plane"
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputContent}>
                <TextInput
                  placeholder="zID"
                  value={zID}
                  onChangeText={(id) => {
                    setzID(id);
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginVertical: 5,
    marginHorizontal: 5,
    padding: 5,
  },

  dashboard: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: 10,
  },
  LeftContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    display: "flex",
    padding: 15,
    elevation: 2,
    margin: 5,
  },
  progressBar: {
    flex: 1,
    marginHorizontal: 5,
    marginTop: 2,
  },
  cameraStyle: {
    ...StyleSheet.absoluteFill,
  },

  RightContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },

  RightContainerChild: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    elevation: 2,
    margin: 5,
    flex: 1,
    flexDirection: "row",
    // justifyContent: "space-evenly",
    alignContent: "center",
  },

  labelContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  labelText: {
    fontWeight: "bold",
    color: Colors.navyBlue,
    fontSize: 12,
  },
  cameraStyle: {
    ...StyleSheet.absoluteFillObject,
  },

  cameraButton: {
    width: 70,
    height: 70,
    borderRadius: 100 / 2,
    backgroundColor: Colors.oceanBlue,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 1.0,
    elevation: 50,
    zIndex: 1,
    position: "absolute",
    bottom: 20,
    right: 30,
  },
  cameraButtonClose: {
    width: 70,
    height: 70,
    position: "absolute",
    bottom: 20,
    right: 30,
    borderRadius: 100 / 2,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 1.0,
    elevation: 50,
    zIndex: 1,
  },

  addInputText: {
    fontWeight: "bold",
    color: Colors.navyBlue,
    fontSize: 15,
  },

  modalContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
    top: 220,
    backgroundColor: Colors.white,
    borderRadius: 20,
    shadowColor: "black",
    elevation: 200,
    height: 300,
    paddingBottom: 35,
    paddingTop: 25,
    borderWidth: 1,
    borderColor: Colors.veryLightGrey,
    backfaceVisibility: "hidden",
  },

  modalButton: {
    borderWidth: 1,
    borderColor: Colors.darkGrey,
    borderRadius: 15,
    height: 60,
    width: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    marginBottom: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: 5,
  },

  image: {
    height: 100,
    width: 200,
  },
});
