import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import Colors from "../constants/Colors";
import Icon from "../components/Icon";
import { GlobalStyles } from "../constants/GlobalStyles";

// Expected Props: "percentage" - fill of the animation
export default function EventSummaryCard(props) {
  return (
    <View style={styles.cardContainer}>
      {/* LHS Sign-In'ed */}
      <View style={styles.labelContainer}>
        <Text>Signed In</Text>
        <Icon size={45} focused={Colors.navyBlue} name="md-checkbox-outline" />
      </View>
      {/* MIDDLE Progress Circle */}
      <View style={styles.progressMeter}>
        <AnimatedCircularProgress
          size={80}
          width={10}
          fill={props.percentage}
          tintColor={Colors.successGreen}
          backgroundColor={Colors.dangerRed}
        >
          {(fill) => <Text style={GlobalStyles.titleText}>{fill}%</Text>}
        </AnimatedCircularProgress>
      </View>
      {/* RHS Total Tickets */}
      <View style={styles.labelContainer}>
        <Text>Total Tickets</Text>
        <Icon size={45} focused={Colors.navyBlue} name="md-people" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    marginVertical: 5,
    marginHorizontal: 15,
    height: 120,
    padding: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    elevation: 2,
  },

  progressMeter: {
    padding: 5,
  },

  labelContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});
