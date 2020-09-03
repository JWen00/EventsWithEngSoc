import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Keyboard,
  RefreshControl,
} from "react-native";
import {
  TouchableOpacity,
  ScrollView,
  Directions,
} from "react-native-gesture-handler";
import { Chip } from "react-native-paper";

import { GlobalStyles } from "../constants/GlobalStyles";
import Icon from "../components/Icon";
import Colors from "../constants/Colors";
import UserCard from "../components/UserCard";

export default class AttendeeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      query: "Search",
      isFocused: false,
      attendeeData: [],
      attendeeTemp: [],
      filterCheckedIn: false,
      filterPaid: false,
      refreshing: false,
    };
  }

  // Grab the data
  componentDidMount() {
    this.refreshData();
  }

  refreshData() {
    fetch("https://nemesis2.dev.unswengsoc.com/attendees")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          attendeeData: responseJson,
          attendeeTemp: responseJson,
          refreshing: false,
        });
      })
      .catch((error) => console.log(error));
  }

  renderSearchBar() {
    return (
      <View style={styles.searchBarContent}>
        {/* Search Icon */}
        <View style={styles.searchBarContent}>
          <Icon size={30} name="md-search" />
        </View>

        {/* Search Functionality  */}
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

        {/* X Icon: Deletes input */}
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
    );
  }

  renderSearchResult() {
    const query = this.state.query.toLowerCase().trim();
    return (
      <View style={styles.attendeeList}>
        {this.state.attendeeTemp
          .filter((attendee) => attendee.zid.includes(query))
          .map((f_attendee) => (
            <UserCard data={f_attendee} />
          ))}
      </View>
    );
  }

  renderEntireList() {
    return (
      <View style={styles.attendeeList}>
        {this.state.attendeeTemp.map((attendee, index) => (
          <UserCard data={attendee} />
        ))}
      </View>
    );
  }

  renderSwitches() {
    return (
      <View style={styles.filterContainer}>
        <Chip
          selected={this.state.filterPaid}
          selectedColor={Colors.navyBlue}
          style={styles.filterContent}
          onPress={() => {
            this.setState({
              filterPaid: !this.state.filterPaid,
              attendeeTemp: this.state.attendeeData.filter((attendee) => {
                console.log(attendee);
                attendee.paid == this.state.filterPaid &&
                  attendee.checked_in == this.state.filterCheckedIn;
              }),
            });
          }}
        >
          Paid
        </Chip>
        <Chip
          selected={this.state.filterCheckedIn}
          selectedColor={Colors.navyBlue}
          style={styles.filterContent}
          onPress={() => {
            this.setState({
              filterCheckedIn: !this.state.filterCheckedIn,
              attendeeTemp: this.state.attendeeData.filter((attendee) => {
                attendee.paid == this.state.filterPaid &&
                  attendee.checked_in == this.state.filterCheckedIn;
              }),
            });
          }}
        >
          Checked-In
        </Chip>
      </View>
    );
  }

  render() {
    return (
      <View style={GlobalStyles.contentContainer}>
        <View style={styles.searchBarContainer}>{this.renderSearchBar()}</View>
        {this.renderSwitches()}
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.refreshData()}
            />
          }
        >
          {this.state.isFocused
            ? this.renderSearchResult()
            : this.renderEntireList()}
        </ScrollView>
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

  filterContainer: {
    height: 50,
    padding: 5,
    flexDirection: "row",
  },

  filterContent: {
    padding: 2,
    margin: 2,
    width: 130,
    justifyContent: "center",
  },

  searchBar: {
    marginVertical: 5,
    marginHorizontal: 5,
    color: Colors.grey,
  },
  attendeeList: {
    padding: 5,
  },
});
