import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "../navigation/BottomTabNavigator";
import SignIn from "../screens/SignIn";
import { connect } from "react-redux";

const Stack = createStackNavigator();

function InitialScreen({isLoggedIn, isLoading}) {
  return (
        <View style={styles.container}>
         {isLoggedIn ?
            <NavigationContainer >
              <Stack.Navigator>
                <Stack.Screen name="Root" component={BottomTabNavigator} />
              </Stack.Navigator>
            </NavigationContainer>
            :
            <SignIn/> 
          }   
          {isLoading && <ActivityIndicator style={styles.spinner} size="large" color="#071526" />}
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  spinner: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
});

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.signin.isLoggedIn,
    isLoading: state.signin.loading
  }
}

export default connect(mapStateToProps)(InitialScreen)