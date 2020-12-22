import React, { useState, useEffect } from "react";
import { View, RefreshControl } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { GlobalStyles } from "../constants/GlobalStyles";
import SearchComponent from "../components/SearchComponent";
import CheckoutModal from "../components/CheckoutModal";
import { connect } from "react-redux";

function AttendeeScreen({showCheckoutModal, setCheckout}) {
  const [refreshing, setRefreshing] = useState(false);
  const [attendeeData, setData] = useState([]);
  const [internalError, setError] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  useEffect(() => {
    refresh();
  }, [])

  const refresh = React.useCallback(() => {
    console.log("Rerendering attendee screen...");
    setRefreshing(true);
    fetch("https://nemesis2.dev.unswengsoc.com/attendees")
      .then((res) => res.json())
      .then((data) => {
        if (internalError) {
          setError(false);
        }
        setData(data);
      })
      .catch((error) => setError(true));

    wait(1500).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={GlobalStyles.contentContainer}>
      {showCheckoutModal && <CheckoutModal />}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      >
        <SearchComponent list={attendeeData} />
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    showCheckoutModal: state.attendee.checkoutModal
  }
}


export default connect(mapStateToProps)(AttendeeScreen);