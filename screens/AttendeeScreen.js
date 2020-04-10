import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet
} from "react-native";
import { GlobalStyles } from "../constants/GlobalStyle";
import AttendeeData from "../testData";
import Icon from "../components/Icon";
import Colors from "../constants/Colors";

const Card = (props) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={GlobalStyles.titleText}>{props.zID}</Text>
        <View style={styles.cardIcon}>
            {props.paid == 'Yes' ? <Icon size={23} focused={Colors.successGreen} name="md-card" /> : <Icon size={23} name="md-card" />}
            {props.registered == 'Yes' ? <Icon size={23} focused={Colors.successGreen} name="md-done-all"/> : <Icon size={23} name="md-done-all"/>}
        </View>
      </View>
    </View>
  );
}

export default function AttendeeScreen() {

  return (
    <View style={GlobalStyles.container}>
      <View style={styles.welcomeContainer}>
        <Text>Search Bar</Text>
      </View>
      <View style={styles.attendeeList}>
          <FlatList
            data={AttendeeData}
            renderItem={({ item }) => (
                <Card zID={item.zID} paid={item.paid} registered={item.registered}></Card>
            )}
          />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 5
  },
  attendeeList: {
    flex: 1,
    padding: 5
  },   
  card: {
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  cardContent: {
    marginHorizontal: 15,
    marginVertical: 12,
    marginRight: 10,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row', 
    // backgroundColor: 'red',
  }, 
  cardIcon: { 
    // backgroundColor: 'green',
    flexDirection: 'row',
    marginHorizontal: 5,
    marginVertical: 4, 
    marginRight: 2

  }
});
