import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  CheckBox,
  TextInput,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { GlobalStyles } from "../constants/GlobalStyles";
import { ScrollView } from "react-native-gesture-handler";

import Colors from "../constants/Colors";
import Icon from "../components/Icon";
import EventSummaryCard from "../components/EventSummaryCard";
import UserCard from "../components/UserCard";

export default function HomeScreen() {
  const [openCamera, setCamera] = useState(false);
  const [openModal, setModal] = useState(false);

  const [name, setName] = useState("");
  const [zID, setzID] = useState("");
  const [isArcMem, setIsArmMem] = useState(false);

  const [internalError, setError] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
  }, []);

  // const modalSubmitForm = () => {
  //   fetch("https://nemesis2.dev.unswengsoc.com/checkin", {
  //     zid: zID,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (internalError) {
  //         setError(false);
  //       }
  //     })
  //     .catch((err) => {
  //       setError(true);
  //     });

  //   setModal(false);
  //   setzID("");
  //   setName("");
  //   setIsArmMem(false);
  // };

  // const wait = (timeout) => {
  //   return new Promise((resolve) => {
  //     setTimeout(resolve, timeout);
  //   });
  // };

  const [recentSignIns, setSignIns] = useState([]);
  const [statPercentage, setStatPercentage] = useState(75);
  // const refreshData = React.useCallback(() => { 
  //   setRefreshing(true);
  //   fetch("https://nemesis2.dev.unswengsoc.com/attendees", {
  //     num_specified: 5,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (internalError) {
  //         setError(false);
  //       }
  //       setSignIns(response);
  //     })
  //     .catch((err) => {
  //       setError(true);
  //     });
  //     fetch("https://nemesis2.dev.unswengsoc.com/signedinpercentage")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (internalError) {
  //         setError(false);
  //       }
  //       setStatPercentage(data.signedinpercentage);
  //     })
  //     .catch((err) => {
  //       setError(true);
  //     });

  //   wait(1500).then(() => setRefreshing(false));
  // }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={refreshData} />
      }
    >
      {/* View when camera is open */}
      {openCamera && (
        <BarCodeScanner
          onBarCodeScanned={({ type, data }) => {
            setCamera(false);
            setModal(true);
            setzID(data);
          }}
          style={styles.cameraStyle}
        />
      )}

      {/* View when camera is NOT open*/}
      {!openCamera && (
        <View>
         {/* Cards showing recent sign-ins */}
           <Text style={styles.headerText}>Recent Sign ins</Text>
           {people.map((person) => { 
             <UserCard data={person} />; 
           })}
              <EventSummaryCard percentage={statPercentage} /> 

          {/* Card to add a new sign-in */}
          <TouchableOpacity
            style={styles.addSignInContainer}
            onPress={() => {
              setModal(true);
            }}
          >
            <Icon size={35} focused={Colors.darkGrey} name="md-add" />
            <Text style={styles.addInputText}>Add Manually</Text>
          </TouchableOpacity>
         </View>
        )}


      {/* Open Modal when button has been pressed */}
      {openModal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={openModal}
          onRequestClose={() => {
            setModal(false);
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
                    setModal(false);
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
                    setModal(false);
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

      {/* Camera Button (Always in view) */}
      <View style={styles.cameraButton}>
        <TouchableOpacity
          onPress={() => {
            setCamera(!openCamera);
          }}
        >
          <Icon size={27} focused={Colors.grey} name="md-camera" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    margin: 20,
  },
  cameraStyle: {
    ...StyleSheet.absoluteFill,
  },

  cameraButton: {
    justifyContent: "space-between",
    position: "absolute",
    bottom: 20,
    right: 15,
    width: 60,
    height: 60,
    borderRadius: 100 / 2,
    backgroundColor: Colors.oceanBlue,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 1.0,
    elevation: 5,
  },

  addSignInContainer: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    margin: 5,
    height: 80,
    display: "flex",
    alignItems: "center",
    padding: 5,
    flexDirection: "row",
    justifyContent: "center",
  },

  addInputText: {
    fontWeight: "bold",
    color: Colors.darkGrey,
    fontSize: 20,
    margin: 7,
  },

  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.darkGrey,
    left: 15,
    top: 15,
    marginBottom: 40,
  },

  modalContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
    top: 220,
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
    borderColor: Colors.veryLightGrey,
    borderRadius: 5,
  },
});
