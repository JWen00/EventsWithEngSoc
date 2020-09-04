import React, { useState } from "react";
import { View, RefreshControl } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { GlobalStyles } from "../constants/GlobalStyles";
import SearchComponent from "../components/SearchComponent";

export default function AttendeeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [attendeeData, setData] = useState([]);
  const [internalError, setError] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const refresh = React.useCallback(() => {
    console.log("Refreshing for attendee screen");
    setRefreshing(true);
    fetch("https://nemesis2.dev.unswengsoc.com/attendees")
      .then((res) => res.json())
      .then((data) => {
        if (internalError) {
          setError(false);
        }
        setData(data);
        console.log("Got Data!");
      })
      .catch((error) => setError(true));

    wait(3000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={GlobalStyles.contentContainer}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh()} />
        }
      >
        <SearchComponent list={attendeeData} />
      </ScrollView>
    </View>
  );
}
