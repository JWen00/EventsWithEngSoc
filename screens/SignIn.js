import React from 'react'
import { View, Text, StyleSheet, Image, Button } from "react-native";
import * as Google from "expo-google-app-auth";
import Colors from "../constants/Colors";
import Icon from '../components/Icon';

export default function SignIn({ login }) {
  const [token, setToken] = React.useState();
  const config = {
    iosClientId: '974954981551-citqv0p5j18ug0fk0uc0ki6p5adf3is3.apps.googleusercontent.com',
    androidClientId: '974954981551-0l4cp333kfbsooqgcvk9jjsg19ovj4ic.apps.googleusercontent.com',
    androidStandaloneAppClientId: '974954981551-jcneghk2q4b9656usi3v0rk6ebrjnbhv.apps.googleusercontent.com',
    iosStandaloneAppClientId: "974954981551-lofkso32ge67nkbhsvnuqs2l0uf5bv8n.apps.googleusercontent.com"
  }

  const googleSignIn = async () => {
    try {
      const result = await Google.logInAsync({
        ...config,
        scopes: ["profile", "email"]
      });
      if (result.type === "success") {
        console.log('@@@@@', result.user.givenName);
        login();
        return result.accessToken;
      } else {
        // await Google.logOutAsync({
        //   ...config,
        //   accessToken: token
        // });
        console.log('small broke!!!!', result)
        return {'cancelled': true};
      }
    } catch (e) {
      console.log(e, 'big broke!!!!!!')
    }
  };

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
        onPress={() => googleSignIn()}
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
    // width: "100%",
    // height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20
  },
});
