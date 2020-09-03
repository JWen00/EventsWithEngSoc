import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { GlobalStyles } from "../constants/GlobalStyles";
import Icon from "../components/Icon";
import Colors from "../constants/Colors";

// Takes in a dictionary containing information
export default function UserCard(props) {
  const [isExpanded, setExpanded] = useState(false);
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => setExpanded(!isExpanded)}
    >
      <View style={styles.cardContent}>
        {/* Show general details */}
        <View style={styles.cardDetail}>
          {props.data.zID != null && (
            <Text style={GlobalStyles.titleText}>z{props.zID}</Text>
          )}

          <Text style={GlobalStyles.paragraph}>
            {props.data.fname} {props.data.last_name}
          </Text>
        </View>

        {/* Show paid/checked-in */}
        <View style={styles.cardIcon}>
          {props.data.paid == true ? (
            <Icon size={23} focused={Colors.successGreen} name="md-card" />
          ) : (
            <Icon size={23} name="md-card" />
          )}
          {props.data.hasCheckedIn == true ? (
            <Icon size={23} focused={Colors.successGreen} name="md-done-all" />
          ) : (
            <Icon size={23} name="md-done-all" />
          )}
        </View>
      </View>
      <View style={styles.cardContent}>
        {/* When expanded, show details */}
        {isExpanded && (
          <View>
            {props.data.hasCheckedIn && <Text>{props.data.checkInTime}</Text>}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    elevation: 2,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    borderRadius: 10,
    flexDirection: "column",
  },
  cardContent: {
    marginHorizontal: 15,
    marginVertical: 8,
    marginRight: 10,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  cardIcon: {
    flexDirection: "row",
    marginHorizontal: 5,
    marginVertical: 4,
    marginRight: 2,
  },
});
