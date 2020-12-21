import React from 'react'
import { View, Text, StyleSheet, Image, Button } from "react-native";
import Colors from "../constants/Colors";
import { connect } from "react-redux";
import { login } from "../actions/signinActions"

function SignIn({ login }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/images/icon.png")}
          style={styles.headerImage}
        />
        <View>
          <Text style={styles.headerText}>Events with EngSoc</Text>
        </View>
      </View>
      <Button
        title="Login with Google"
        onPress={() => login()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  headerImage: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: Colors.navyBlue,
    letterSpacing: 0.8,
    alignContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(login())
  }
}

export default connect(null, mapDispatchToProps)(SignIn);