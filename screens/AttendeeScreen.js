import React, { Component, useRef } from "react";
import { FlatList, Text, View, StyleSheet, TextInput } from "react-native";

import { GlobalStyles } from "../constants/GlobalStyle";
import AttendeeData from "../testData";
import Icon from "../components/Icon";
import Colors from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

// TODO: When backend is set up, AttendeeData should be fetched every 5(?) seconds or on pull down refresh.

const Card = (props) => {
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
};

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Search",
      data: AttendeeData,
      isFocused: false,
    };
  }

  filter(q) {
    const updatedData = [];
    const query = q.toLowerCase().trim();
    return query;
    // for (let i = 0; i < AttendeeData.length; i++) {
    //   const result = AttendeeData[i].zID.match(query); // match should return a list
    //   if (result != null) {
    //     updatedData.push(result[0]);
    //   }
    // }
    // return updatedData;
  }

  render() {
    return (
      <View>
        <View style={styles.searchBarContent}>
          <View style={styles.searchBarContent}>
            <Icon size={30} name="md-search" />
          </View>
          <TextInput
            style={styles.searchBar}
            onChangeText={(query) => {
              this.setState({
                text: query,
                data: this.filter(query),
              });
            }}
            onFocus={() =>
              this.setState({
                text: "",
                isFocused: true,
                data: AttendeeData,
              })
            }
            onEndEditing={() => this.setState({ isFocused: false })}
            value={this.state.text}
          />
          <View style={styles.searchBarContent}>
            <Icon size={27} name="md-close" />
          </View>
        </View>

        {/* <Text>Searched Item: {this.state.text}</Text>
        <Text>
          Data: {this.state.data == null ? this.state.data : "List is empty"}
        </Text>
        <Text>IsFocused: {this.state.isFocused ? "True" : "False"}</Text> */}

        {/* <View style={styles.attendeeList}>
          <FlatList
            // data={this.isFocused ? AttendeeData : this.state.data}
            data={AttendeeData}
            extraData={this.state.data}
            renderItem={({ item }) => (
              <Card
                zID={item.zID}
                name={item.name}
                paid={item.paid}
                registered={item.registered}
              ></Card>
            )}
          />
        </View> */}
      </View>
    );
  }
}

export default function AttendeeScreen() {
  return (
    <View style={GlobalStyles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar />
      </View>
      <View style={styles.attendeeList}>
        <FlatList
          // data={this.isFocused ? AttendeeData : this.state.data}
          data={AttendeeData}
          renderItem={({ item }) => (
            <Card
              zID={item.zID}
              name={item.name}
              paid={item.paid}
              registered={item.registered}
            ></Card>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    marginVertical: 12,
    marginHorizontal: 10,
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
    height: 35,
    right: 25,
    width: 250,
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
