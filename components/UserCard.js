import React, { useState } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";

import { GlobalStyles } from "../constants/GlobalStyles";
import Icon from "../components/Icon";
import Colors from "../constants/Colors";

// Takes in [fname, lname, checked_in, paid, time]
export default function UserCard(props) {
  const [isExpanded, setExpanded] = useState(false);
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => setExpanded(!isExpanded)}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardDetail}>
          <Text>
            <Text style={GlobalStyles.titleText}>
              {props.fname} {props.last_name}
            </Text>
            {props.zid != null && (
              <Text style={GlobalStyles.zid}>(z{props.zid})</Text>
            )}
          </Text>
        </View>

        {/* Show paid/checked-in */}
        <View style={styles.cardIcon}>
          {props.paid == true ? (
            <Icon size={23} focused={Colors.successGreen} name="md-card" />
          ) : (
            <Icon size={23} name="md-card" />
          )}
          {props.checked_in == true ? (
            <Icon size={23} focused={Colors.successGreen} name="md-done-all" />
          ) : (
            <Icon size={23} name="md-done-all" />
          )}
        </View>
      </View>
      <View style={styles.cardContent}>
        {/* When expanded, show details */}
        {isExpanded && (
          <View style={styles.additionalContent}>
            <View style={styles.additionalText}>
              {props.checked_in && (
                <Text style={GlobalStyles.paragraph}>{props.time}</Text>
              )}
              <Text style={GlobalStyles.paragraph}>
                Additional Message: {props.info}
              </Text>
            </View>
            {props.checked_in && (<TouchableWithoutFeedback onPress={() => {
                props.checkoutUser(props.zid);
                props.setConfirmation(true);
              }}>
                <Icon size={36} focused={Colors.dangerRed} name="md-log-out" />
            </TouchableWithoutFeedback>)}
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
    marginVertical: 5,
    marginHorizontal: 15,
    borderRadius: 10,
    flexDirection: "column",
  },
  cardContent: {
    marginHorizontal: 15,
    marginVertical: 5,
    marginRight: 10,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 5,
  },
  cardIcon: {
    flexDirection: "row",
    marginHorizontal: 5,
    marginVertical: 4,
    marginRight: 2,
  },
  additionalContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  additionalText: {
    marginRight: 30
  },
  undoButton: {
    height: 200,
    width: 200,
  }
});
