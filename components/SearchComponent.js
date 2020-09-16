import React, { useState } from "react";
import { View, StyleSheet, TextInput, Keyboard } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { Chip } from "react-native-paper";

import Icon from "../components/Icon";
import Colors from "../constants/Colors";
import UserCard from "../components/UserCard";

export default function SearchComponent(props) {
  const [isFocused, setFocused] = useState(false);
  const [query, setQuery] = useState("");

  const [tmpList, setTmpList] = useState([]);
  const [list, setList] = useState([]);

  React.useEffect(() => {
    setTmpList(props.list);
    setList(props.list);
  }, [props.list]);

  const [filterPaid, setFilterPaid] = useState(false);
  const [filterCheckedIn, setFilterCheckedIn] = useState(false);

  const updateList = () => {
    const l = list.filter((person) => {
      return person.paid == filterPaid && person.checked_in == filterCheckedIn;
    });
    console.log(l);
    console.log("paid: " + filterPaid);
    console.log("checked_in: " + filterCheckedIn);
    setTmpList(l);
  };
  return (
    <View>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBarContent}>
          <View style={styles.searchBarContent}>
            <Icon size={30} name="md-search" />
          </View>

          <ScrollView style={styles.searchBar}>
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
          </ScrollView>
          <TouchableOpacity
            style={styles.searchBarContent}
            onPress={() => {
              setQuery("");
              setFocused(false);
            }}
          >
            <Icon size={27} name="md-close" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Filters */}
      <View style={styles.filterContainer}>
        <Chip
          selected={filterPaid}
          selectedColor={Colors.navyBlue}
          style={styles.filterContent}
          onPress={() => {
            console.log("initial paid: " + filterPaid);
            setFilterPaid(!filterPaid);
            console.log("!paid: " + filterPaid);

            updateList();
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
            updateList();
          }}
        >
          Checked-In
        </Chip>
      </View>

      {/* Show results of search */}
      {isFocused ? (
        <View style={styles.resultList}>
          {tmpList
            .filter((result) => {
              const q = query.toLowerCase().trim();

              return (
                result.first_name.toLowerCase().includes(q) ||
                result.last_name.toLowerCase().includes(q) ||
                result.zid.includes(q)
              );
            })
            .map((person) => (
              <UserCard
                fname={person.first_name}
                lname={person.last_name}
                zid={person.zid}
                checked_in={person.checked_in}
                paid={person.paid}
                time={person.checked_in_time}
                info={person.information}
              />
            ))}
        </View>
      ) : (
        <View style={styles.resultList}>
          {tmpList.map((person) => (
            <UserCard
              fname={person.first_name}
              lname={person.last_name}
              zid={person.zid}
              checked_in={person.checked_in}
              paid={person.paid}
              time={person.checked_in_time}
              info={person.information}
            />
          ))}
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

  searchBar: {
    marginVertical: 5,
    marginHorizontal: 5,
    color: Colors.grey,
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

  attendeeList: {
    padding: 5,
  },
});
