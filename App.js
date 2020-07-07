import React from "react";
import { Video } from "expo-av";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "expo-modal";
import DeviceInfo from "react-native-device-info";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    hasPermission: null,
    camera_type: Camera.Constants.Type.back,
  };

  componentDidMount() {
    this.requestCameraPermission();
  }

  async requestCameraPermission() {
    const { status } = await Camera.requestPermissionsAsync();
    //const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === "granted") {
      console.log("inside request caaaaaaaaa");
      this.setState({ hasPermission: "granted" });
    }
    //this.setState({ hasPermission: status === 'granted' });
    return Promise.resolve();
  }

  render() {
    //Debugging Code for Camera
    /*
    if (this.state.hasPermission === null) {
      return <Text>heyyy</Text>;
    }
    if (this.state.hasPermission === false) {
      return <Text>We have no access</Text>;
    }
    */

    const innerComponent = (
      <View
        style={{
          height: height / 2,
          width: width / 2,
          justifyContent: "center",
          alignItems: "center",
          ref: null,
        }}
      >
        <Camera
          style={{ height: 300 }}
          type={this.state.camera_type}
          ref={(ref) => this.setState({ ref: ref })}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: "flex-end",
                alignItems: "center",
              }}
              onPress={() => {
                this.setState({
                  type:
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                });
              }}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                Flip his
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
        <Text>Hello world</Text>
        <TouchableOpacity onPress={() => Modal.dismissModal()}>
          <Text>close modal</Text>
        </TouchableOpacity>
      </View>
    );

    return Modal.wrapIntoModal(
      <View style={styles.container}>
        <Text>{DeviceInfo.getBrand()}</Text>

        <Video
          source={{
            uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          shouldPlay={true}
          resizeMode="cover"
          style={styles.videoPlayer}
        />
        <TouchableHighlight
          onPress={() => {
            Modal.showModal(innerComponent);
          }}
        >
          <Text> Touch Here </Text>
        </TouchableHighlight>
      </View>,
      styles.modalStyle
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  videoPlayer: {
    position: "relative",
    width: "100%",
    aspectRatio: 3 / 2,
  },
  modalStyle: {
    backgroundColor: "rgba(1,1,56,0.3)",
  },
});
