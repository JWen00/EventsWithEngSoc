import * as React from "react";
import { View, Modal, Text, Button, StyleSheet, Alert } from "react-native";
import { connect } from "react-redux";
import { setCheckout, setCheckoutModal } from "../actions/attendeeActions";
import Colors from "../constants/Colors";

function CheckoutModal({showCheckoutModal, setCheckout, closeModal, toCheckout}) {
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
    const response = await fetch("https://nemesis2.dev.unswengsoc.com/checkout", requestOptions);
    const message = await response.json();
    const successMessage = message.code == 200 ? "Success" : "Something went wrong"; 
    const reason = message.response == "OK" ? "User has been successfully checked out" : message.response;
    return Alert.alert(
      successMessage,
      reason,
      [
        { text: "OK", 
          onPress: () => {
            closeModal();
            setCheckout("");
        }
      }
      ],
      { cancelable: false }
    );
  };
  return (
    <Modal
       animationType="slide"
       transparent={true}
       visible={showCheckoutModal}
       onRequestClose={() => {
          setCheckout("");
          closeModal();
       }}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.confirmationText}>Are you sure you want to checkout this attendee?</Text>
        <View style={styles.buttonContainer}>
          <Button style={styles.modalButton} onPress={checkoutAlert} title={"Yes"}/>
          <Button style={styles.modalButton} onPress={() => {
            setCheckout("");
            closeModal();
          }} title={"No"}/>
        </View>
      </View>
    </Modal> 
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

const mapStateToProps = (state) => {
  return {
    showCheckoutModal: state.attendee.checkoutModal,
    toCheckout: state.attendee.toCheckout
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(setCheckoutModal(false)),
    setCheckout: (zid) => dispatch(setCheckout(zid)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutModal);