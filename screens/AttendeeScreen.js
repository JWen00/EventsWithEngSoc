import React, { useState, useEffect } from "react";
import { View, RefreshControl, Modal, Text, StyleSheet, Button, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { GlobalStyles } from "../constants/GlobalStyles";
import SearchComponent from "../components/SearchComponent";
import Colors from "../constants/Colors";


export default function AttendeeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [attendeeData, setData] = useState([]);
  const [internalError, setError] = useState(false);
  const [openConfirmation, setConfirmation] = useState(false);
  const [toCheckout, setToCheckout] = useState("");

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const refresh = useEffect(() => {
    console.log("Rerendering attendee screen...");
    setRefreshing(true);
    fetch("https://nemesis2.dev.unswengsoc.com/attendees")
      .then((res) => res.json())
      .then((data) => {
        if (internalError) {
          setError(false);
        }
        setData(data);
      })
      .catch((error) => setError(true));

    wait(1500).then(() => setRefreshing(false));
  }, []);

  async function checkoutAlert() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ zid: toCheckout.toString() });
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const closeAlert = () => {
      setConfirmation(false);
      setToCheckout("");
    };

    const response = await fetch("https://nemesis2.dev.unswengsoc.com/checkout", requestOptions);
    const message = await response.json();
    const successMessage = message.code == 200 ? "Success" : "Something went wrong"; 
    const reason = message.response == "OK" ? "User has been successfully checked out" : message.response;
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
  };

  return (
    <View style={GlobalStyles.contentContainer}>
      {openConfirmation && (<Modal
          animationType="slide"
          transparent={true}
          visible={openConfirmation}
          onRequestClose={() => {
            setConfirmation(false);
          }}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.confirmationText}>Are you sure you want to checkout this attendee?</Text>
            <View style={styles.buttonContainer}>
              <Button style={styles.modalButton} onPress={checkoutAlert} title={"Yes"}/>
              <Button style={styles.modalButton} onPress={() => setConfirmation(false)} title={"No"}/>
            </View>
          </View>
        </Modal>)}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      >
        <SearchComponent list={attendeeData} checkoutUser={setToCheckout} setConfirmation={setConfirmation}/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
    top: 220,
    backgroundColor: Colors.white,
    borderRadius: 20,
    shadowColor: "black",
    elevation: 200,
    height: 150,
    paddingBottom: 35,
    paddingTop: 25,
    borderWidth: 1,
    borderColor: Colors.veryLightGrey,
    backfaceVisibility: "hidden",
  },

  buttonContainer: {
    height: 60,
    width: 120,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  modalButton: {
    borderWidth: 1,
    borderColor: Colors.darkGrey,
    borderRadius: 15,
  },

  confirmationText: {
    fontSize: 20,
    textAlign: 'center'
  }

});
