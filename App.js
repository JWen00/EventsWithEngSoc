import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import SignIn from "./screens/SignIn";

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  
  React.useEffect(() => {
    console.log('rerender')
  }, [])
  
  const login = () => {
    setIsLoggedIn(true);
    console.log('this ran successfully', isLoggedIn)
  }
  return (
    <View style={styles.container}>
      {isLoggedIn ? 
        <NavigationContainer >
          <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
        :
        <SignIn login={() => login()}/>
      }     
      <Text>{isLoggedIn ? console.log('hi') : console.log('bye')}</Text>                         
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
