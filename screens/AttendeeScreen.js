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
        <View styles="styles.searchBarContent">
          <Icon size={18} focused={Colors.successGreen} name="md-search" />
          style={styles.searchBar}
          onChangeText=
          {(query) => {
            this.setState({
              text: query,
              data: this.filter(query),
            });
          }}
          onFocus=
          {() =>
            this.setState({
              text: "",
              isFocused: true,
              data: AttendeeData,
            })
          }
          onEndEditing={() => this.setState({ isFocused: false })}
          value={this.state.text}
          />
          <Icon size={15} focused={Colors.successGreen} name="md-close" />
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
    marginVertical: 10,
    marginHorizontal: 10,
  },
  searchBarContent: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  searchBar: {
    padding: 10,
    paddingLeft: 15,
    height: 45,
    borderRadius: 20,
    backgroundColor: Colors.veryLightGrey,
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
