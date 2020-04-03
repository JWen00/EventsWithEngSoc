import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet
} from "react-native";
import { GlobalStyles } from "../constants/GlobalStyle";

export default function AttendeeScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  });
  return (
    <View style={GlobalStyles.container}>
      <View style={styles.welcomeContainer}>
        <Text>View the list of attendees and their status here.</Text>
      </View>
      <View style={styles.attendeeList}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text>
                {item.title}, {item.completed}
              </Text>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20
  },
  attendeeList: {
    flex: 1,
    padding: 24
  }
});
