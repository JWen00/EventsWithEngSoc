import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNavigator from "./navigation/BottomTabNavigator";
import useLinking from "./navigation/UseLinking";

const Stack = createStackNavigator();

export default function App(props) {
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  return (
    <View style={styles.container}>
      <NavigationContainer ref={containerRef}>
        <Stack.Navigator>
          <Stack.Screen name="Root" component={BottomTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
