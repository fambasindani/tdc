import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';

// Coordonnées des taxis
const locations = [
  { id: 1, title: 'Taxi 1', latitude: -4.29899, longitude: 15.266 },
  { id: 2, title: 'Taxi 2', latitude: -4.442, longitude: 15.297 },
  { id: 3, title: 'Taxi 3', latitude: -4.29999, longitude: 15.312 },
  { id: 4, title: 'Taxi 4', latitude: -4.460, longitude: 15.269 },
  { id: 5, title: 'Taxi 5', latitude: -4.449, longitude: 15.270 },
];

const Carte = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyTaxis, setNearbyTaxis] = useState([]);
  const [mapRef, setMapRef] = useState(null);
  const [showMarker, setShowMarker] = useState(true); // État pour gérer le clignotement du marqueur

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("User Location:", location);
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    getLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      const filteredTaxis = locations.filter(loc => {
        const distance = getDistance(userLocation.latitude, userLocation.longitude, loc.latitude, loc.longitude);
        console.log(`Distance to ${loc.title}: ${distance} meters`);
        return distance < 8000;
      });
      console.log("Filtered Taxis:", filteredTaxis);
      setNearbyTaxis(filteredTaxis);
    }
  }, [userLocation]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMarker(prev => !prev); // Alterne l'état pour faire clignoter le marqueur
    }, 500); // Clignote toutes les 500 ms

    return () => clearInterval(interval); // Nettoyage de l'intervalle
  }, []);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Rayon de la Terre en mètres
    const φ1 = lat1 * Math.PI / 180; // Convertir en radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance en mètres
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
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userLocation ? userLocation.latitude : -4.29841,
          longitude: userLocation ? userLocation.longitude : 15.366,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
        ref={(ref) => setMapRef(ref)}
      >
        {userLocation && showMarker && ( // Marqueur clignotant pour l'utilisateur
          <Marker
            coordinate={userLocation}
            title="Vous êtes ici"
            pinColor="skyblue" // Couleur bleu ciel
          />
        )}

        {nearbyTaxis.map(taxi => (
          <Marker
            key={taxi.id}
            coordinate={{ latitude: taxi.latitude, longitude: taxi.longitude }}
            title={taxi.title}
            pinColor="red"
          />
        ))}

        {/* Ajouter un cercle autour de chaque taxi */}
        {nearbyTaxis.map(taxi => (
          <Circle
            key={`circle-${taxi.id}`}
            center={{ latitude: taxi.latitude, longitude: taxi.longitude }}
            radius={8000} // Rayon pour les taxis
            strokeColor="rgba(255, 0, 0, 0.5)"
            fillColor="rgba(255, 0, 0, 0.2)"
          />
        ))}
      </MapView>

      {userLocation && (
        <TouchableOpacity style={styles.coordinates} onPress={centerMapOnUser}>
          <Text>Latitude: {userLocation.latitude.toFixed(5)}</Text>
          <Text>Longitude: {userLocation.longitude.toFixed(5)}</Text>
        </TouchableOpacity>
      )}
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
  coordinates: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
});

export default Carte;