import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements'
import { Circle, Polyline,  } from 'react-native-maps';
import { Context as TrackContext } from '../context/TrackContext'
import MapView from 'react-native-maps';

const TrackDetailScreen = ({ navigation }) => {
  const { state } = useContext(TrackContext)
  const _id = navigation.getParam('_id')

  const track = state.find(t => t._id === _id)
  const initialCoords = track.locations[0].coords

  return (
    <>
      <Text h2 style={styles.trackName}>{track.name}</Text>
      <MapView
        style={styles.map}
        initialRegion={{ 
          ...initialCoords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
        followsUserLocation
      >
        <Circle
        center={initialCoords}
        radius={30}
        strokeColor="rgba(0, 158, 0, 1.0)"
        fillColor="rgba(0,158,0,0.3)"
        />
        <Polyline coordinates={track.locations.map((loc) => loc.coords)}/>
      </MapView>
    </>
  ) 
};

const styles = StyleSheet.create({
  map: {
    height: 300
  },
  trackName: {
    marginLeft:10,
    marginBottom: 5
  }
});

export default TrackDetailScreen;
