import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import InputScreen from "../screens/InputScreen";
import AttendeesScreen from "../screens/AttendeeScreen";
import Header from "../constants/Header";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator({ navigation, route }) {
  // navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  navigation.setOptions({ headerTitle: () => <Header title={getHeaderTitle(route)}/> });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-home" />
          )
        }}
      />
      <BottomTab.Screen
        name="Input"
        component={InputScreen}
        options={{
          title: "Enter zID",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-add" />
          )
        }}
      />
      <BottomTab.Screen
        name="Attendees"
        component={AttendeesScreen}
        options={{
          title: "View Attendees",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-list-box" />
          )
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return "Home";
    case "Input":
      return "Manual Input";
    case "Attendees":
      return "Attendee List";
  }
}
