import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, Keyboard } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";

import { GlobalStyles } from "../constants/GlobalStyles";
import AttendeeData from "../testData";
import Icon from "../components/Icon";
import Colors from "../constants/Colors";

function Card(props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.cardDetail}>
          <Text style={GlobalStyles.titleText}>{props.zID}</Text>
          <Text style={GlobalStyles.paragraph}>{props.name}</Text>
        </View>
        <View style={styles.cardIcon}>
          {props.paid == "Yes" ? (
            <Icon size={23} focused={Colors.successGreen} name="md-card" />
          ) : (
            <Icon size={23} name="md-card" />
          )}
          {props.registered == "Yes" ? (
            <Icon size={23} focused={Colors.successGreen} name="md-done-all" />
          ) : (
            <Icon size={23} name="md-done-all" />
          )}
        </View>
      </View>
    </View>
  );
}

const attendees = AttendeeData;
export default class AttendeeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      query: "Search",
      isFocused: false,
    };
  }

  handleOnCardPress() {
    //TODO
  }

  renderSearchBar() {
    return (
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBarContent}>
          <View style={styles.searchBarContent}>
            <Icon size={30} name="md-search" />
          </View>

          <ScrollView style={styles.searchBar}>
            <TextInput
              onChangeText={(query) => {
                this.setState({
                  query: query,
                });
              }}
              onFocus={() =>
                this.setState({
                  query: "",
                  isFocused: true,
                })
              }
              onEndEditing={() =>
                this.setState({
                  isFocused: false,
                })
              }
              value={this.state.query}
            />
          </ScrollView>
          <TouchableOpacity
            style={styles.searchBarContent}
            onPress={() => {
              this.setState({
                query: "",
                isFocused: false,
              });
              Keyboard.dismiss();
            }}
          >
            <Icon size={27} name="md-close" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderSearchResult() {
    const query = this.state.query.toLowerCase().trim();
    return (
      <View style={styles.attendeeList}>
        {attendees
          .filter((attendee) => attendee.zID.includes(query))
          .map((filteredAttendee) => (
            <Card
              zID={filteredAttendee.zID}
              name={filteredAttendee.name}
              paid={filteredAttendee.paid}
              registered={filteredAttendee.registered}
            />
          ))}
      </View>
    );
  }

  renderEntireList() {
    return (
      <ScrollView style={styles.attendeeList}>
        {attendees.map((attendee, index) => (
          <Card
            zID={attendee.zID}
            name={attendee.name}
            paid={attendee.paid}
            registered={attendee.registered}
          />
        ))}
      </ScrollView>
    );
  }

  render() {
    return (
      <View style={GlobalStyles.contentContainer}>
        {this.renderSearchBar()}
        {this.state.isFocused
          ? this.renderSearchResult()
          : this.renderEntireList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBarContainer: {
    textAlignVertical: "center",
  },
  searchBarContent: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: Colors.veryLightGrey,
    flexDirection: "row",
    padding: 5,
    borderRadius: 35,
  },
  searchBarIcon: {
    top: 10,
    width: 10,
    backgroundColor: Colors.navyBlue,
  },

  searchBar: {
    marginVertical: 5,
    marginHorizontal: 5,
    color: Colors.grey,
  },
  attendeeList: {
    flex: 1,
    padding: 5,
  },
  card: {
    elevation: 2,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    borderRadius: 10,
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
