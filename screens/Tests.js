import React, { useEffect, useState} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StatusBar } from 'expo-status-bar';


const locations = [
  { id: 1, title: 'Taxi 1', latitude: -4.29899, longitude: 15.316 },
  { id: 2, title: 'Taxi 2', latitude: -4.442, longitude: 15.297 },
  { id: 3, title: 'Taxi 3', latitude: -4.29999, longitude: 15.312 },
  { id: 4, title: 'Taxi 4', latitude: -4.460, longitude: 15.269 },
  { id: 5, title: 'Taxi 5', latitude: -4.449, longitude: 15.270 },
];

const Test = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [animation] = useState(new Animated.Value(1));

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("User Location:", location.coords);
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      startAnimation();
    };

    getLocation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1.5, // Taille maximale
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 1, // Taille normale
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const centerMapOnUser = () => {
    if (userLocation && mapRef) {
      mapRef.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }, 1000);
    }
  };

  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="#0e79b6" />
    <View style={styles.container}>
      {userLocation ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          showsUserLocation={true}
          ref={setMapRef}
        >
          <Marker
            coordinate={userLocation}
            title="Vous êtes ici"
            pinColor="skyblue"
          >
            <Animated.View style={{ transform: [{ scale: animation }] }}>
              <Icon name="my-location" size={30} color="blue" />
            </Animated.View>
          </Marker>

          {locations.map(loc => (
            <Marker
              key={loc.id}
              coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
              title={loc.title}
            >
              <Icon name="local-taxi" size={30} color="red" />
            </Marker>
          ))}
        </MapView>
      ) : (
        <Text>Chargement de la localisation...</Text>
      )}

      {userLocation && (
        <TouchableOpacity style={styles.coordinates} onPress={centerMapOnUser}>
          <Text>Latitude: {userLocation.latitude.toFixed(5)}</Text>
          <Text>Longitude: {userLocation.longitude.toFixed(5)}</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.centerButton} onPress={centerMapOnUser}>
        <Icon name="my-location" size={30} color="white" />
      </TouchableOpacity>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  coordinates: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
  centerButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 50,
    elevation: 5,
  },
});

export default Test;