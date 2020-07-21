import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icon from "../components/Icon";
import HomeScreen from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingScreen";
import AttendeesScreen from "../screens/AttendeeScreen";
import Header from "../components/Header";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

function BottomTabNavigator({ navigation, route }) {
  // navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  navigation.setOptions({
    headerTitle: () => <Header title={getHeaderTitle(route)} />,
  });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Attendees"
        component={AttendeesScreen}
        options={{
          title: "View Attendees",
          tabBarIcon: ({ focused }) => <Icon size={30} name="md-list-box" />,
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => <Icon size={30} name="md-home" />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          title: "View Settings",
          tabBarIcon: ({ focused }) => <Icon size={30} name="md-options" />,
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
    case "Settings":
      return "Settings";
    case "Attendees":
      return "Attendee List";
  }
}

export default BottomTabNavigator;
