import React, { Component, useState } from "react";
import { View, StyleSheet, TextInput, Keyboard } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { Chip } from "react-native-paper";

import { GlobalStyles } from "../constants/GlobalStyles";
import Icon from "../components/Icon";
import Colors from "../constants/Colors";
import UserCard from "../components/UserCard";

export default function SearchComponent(props) {
  const [isFocused, setFocused] = useState(false);
  const [query, setQuery] = useState("");

  const [tmpList, setTmpList] = useState(props.list);
  const [list, setList] = useState(props.list);

  const [filterPaid, setFilterPaid] = useState(false);
  const [filterCheckedIn, setFilterCheckedIn] = useState(false);
  return (
    <View>
      {/* Search Bar */}
      <View style={styles.searchBarContent}>
        <View style={styles.searchBarContent}>
          <Icon size={30} name="md-search" />
        </View>
        <View style={styles.searchBar}>
          <TextInput
            onChangeText={(q) => {
              setQuery(q);
            }}
            onFocus={() => {
              setQuery("");
              setFocused(true);
            }}
            onEndEditing={() => {
              setFocused(false);
            }}
            value={query}
          />
        </View>
        <TouchableOpacity
          style={styles.searchBarContent}
          onPress={() => {
            setQuery("");
            setFocused(false);
            Keyboard.dismiss();
          }}
        >
          <Icon size={27} name="md-close" />
        </TouchableOpacity>
      </View>

      {/* Search Filters */}
      <View style={styles.filterContainer}>
        <Chip
          selected={filterPaid}
          selectedColor={Colors.navyBlue}
          style={styles.filterContent}
          onPress={() => {
            setFilterPaid(!filterPaid);
            setTmpList(
              list.filter((person) => {
                person.paid == filterPaid && person.checked_in == filterPaid;
              })
            );
          }}
        >
          Paid
        </Chip>
        <Chip
          selected={filterCheckedIn}
          selectedColor={Colors.navyBlue}
          style={styles.filterContent}
          onPress={() => {
            setFilterCheckedIn(!filterCheckedIn);
            setTmpList(
              list.filter((person) => {
                person.paid == filterPaid &&
                  person.checked_in == filterCheckedIn;
              })
            );
          }}
        >
          Checked-In
        </Chip>
      </View>

      {/* Show results of search */}
      {isFocused ? (
        <View style={styles.resultList}>
          {tmpList
            .filter((result) => result.zid.includes(query.toLowerCase().trim()))
            .map((person) => (
              <UserCard data={person} />
            ))}
        </View>
      ) : (
        <View style={styles.resultList}>
          {tmpList.map((person) => {
            <UserCard data={person} />;
          })}
        </View>
      )}
    </View>
  );
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
