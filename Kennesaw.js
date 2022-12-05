import React, { Component, useState, useEffect } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";

import MapView, { Callout } from "react-native-maps";
import { Marker } from "react-native-maps";

//Value declarations
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.01;

//let coordinateListK = [];
//remove this
fetch("insert database url/Senior/kenn.txt") // Fetches data from a running database (routes.js)
  .then((response) => response.json()) //
  .then((users) => (coordinateListK = users)); //put the sql query into the array coordinateListK

export default class Kennesaw extends React.Component {
  constructor(props) {
    super(props);
    var ImageUrL =
      "Image URL goes Here";
    console.log(coordinateListK[0].Location_Name);
    const markerinfo = []; //Saves the values from coordinateListK into an array for google maps markers
    for (let i = 0; i < coordinateListK.length; i++) {
      markerinfo.push({
        latitude: coordinateListK[i].Latitude, //coordinateListK must have capital Latitude
        longitude: coordinateListK[i].Longitude, //coordinateListK must have capital Longitude
        id: i,
        title: coordinateListK[i].Location_Name,
        Description: coordinateListK[i].Description,
        ImagesLocation: ImageUrL.concat(i + 1, ".jpg"),
      });
    }

    this.state = {
      markerinfo,
    };
    console.log(coordinateListK[1].Latitude); //debug purposes
    console.log(markerinfo); // prints values of markerinfo, debug purposes
  }

  render() {
    const markers = this.state.markerinfo.map((markerinfo) => (
      <Marker
        coordinate={markerinfo}
        key={markerinfo.id}
        title={markerinfo.title}
        onCalloutPress={() =>
          this.props.navigation.navigate("Dynamicpage", {
            paramT: markerinfo.title,
            paramF: markerinfo.Description,
            imageParams: markerinfo.ImagesLocation,
          })
        }
        // onPress={() => this.props.navigation.goBack()}
      />
    ));

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Marietta Campus</Text>
        <View style={styles.container}>
          <MapView
            initialRegion={{
              //Initial location where google maps will start at
              latitude: 34.04252,
              longitude: -84.58251,
              latitudeDelta: 0.01,
              longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO,
            }}
            ref={(ref) => {
              this.map = ref;
            }}
            style={styles.map}
          >
            {/* creates markers from the markers variables */}
            {markers}

            {/* //Marker with changed attributes like clickable button */}
          </MapView>
        </View>

        {/* //Buttons to change screen  */}
  

        
      </View>
    );
  }
}
//Style and formatting of the page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
