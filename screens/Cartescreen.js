import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const locations = [
  { id: 1, title: 'Lieu 1', latitude: -4.441, longitude: 15.266 },
  { id: 2, title: 'Lieu 2', latitude: -4.442, longitude: 15.267 },
  { id: 3, title: 'Lieu 3', latitude: -4.443, longitude: 15.268 },
  { id: 4, title: 'Lieu 4', latitude: -4.444, longitude: 15.269 },
  { id: 5, title: 'Lieu 5', latitude: -4.445, longitude: 15.270 },
];

const Carte = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      // Demande de permission pour accéder à la localisation
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error("Permission to access location was denied");
        return;
      }

      // Obtention de la localisation actuelle
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userLocation ? userLocation.latitude : -4.441,
          longitude: userLocation ? userLocation.longitude : 15.266,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
      >
        {locations.map(loc => (
          <Marker
            key={loc.id}
            coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
            title={loc.title}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default Carte;