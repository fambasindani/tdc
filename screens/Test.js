import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { Asset } from 'expo-asset'; // Importer Asset pour gérer les images
import Icon from 'react-native-vector-icons/MaterialIcons'; // Garde l'icône de localisation
import { StatusBar } from 'expo-status-bar';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZmFtYmExOTg1IiwiYSI6ImNtNDFiNTlnazA5aDAyanIybHM1MmZhdmkifQ.fvPeL-KFlMCVgx08fa1t2w'; // Votre clé d'accès API
const mapsmoto = Asset.fromModule(require('../assets/mapsmotosmall.png')).uri; // Charger l'image de la moto
const mapsuser = Asset.fromModule(require('../assets/mapsusersmall.png')).uri; // Charger l'image de l'utilisateur

const locations = [
  { id: 1, title: 'Moto 1', latitude: -4.29899, longitude: 15.316 },
  { id: 2, title: 'Moto 2', latitude: -4.442, longitude: 15.297 },
  { id: 3, title: 'Moto 3', latitude: -4.29999, longitude: 15.312 },
  { id: 4, title: 'Moto 4', latitude: -4.460, longitude: 15.269 },
  { id: 5, title: 'Moto 5', latitude: -4.449, longitude: 15.270 },
];

const Test = () => {
  const [userLocation, setUserLocation] = useState(null);
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

  const generateHtmlContent = () => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Map</title>
          <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
          <script src="https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.js"></script>
          <link href="https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css" rel="stylesheet" />
          <style>
            body { margin: 0; padding: 0; }
            #map { position: absolute; top: 0; bottom: 0; width: 100%; }
          </style>
        </head>
        <body>
          <div id="map"></div>
          <script>
            mapboxgl.accessToken = '${MAPBOX_ACCESS_TOKEN}';
            const map = new mapboxgl.Map({
              container: 'map',
              style: 'mapbox://styles/mapbox/streets-v11',
              center: [${userLocation?.longitude || 15.2102}, ${userLocation?.latitude || -4.35178}],
              zoom: 12
            });

            // Marqueur pour l'utilisateur
            const userMarkerElement = document.createElement('div');
            userMarkerElement.style.backgroundImage = 'url(${mapsuser})'; // Utiliser l'URL de l'image de l'utilisateur
            userMarkerElement.style.width = '50px'; // Ajustez la largeur
            userMarkerElement.style.height = '80px'; // Ajustez la hauteur
            userMarkerElement.style.backgroundSize = '100%';

            const userMarker = new mapboxgl.Marker(userMarkerElement)
              .setLngLat([${userLocation?.longitude || 15.2102}, ${userLocation?.latitude || -4.35178}])
              .setPopup(new mapboxgl.Popup().setText('Vous êtes ici'))
              .addTo(map);

            const locations = ${JSON.stringify(locations)};
            const markerImage = '${mapsmoto}'; // Utiliser l'URL de l'image de la moto
            
            locations.forEach(loc => {
              const markerElement = document.createElement('div');
              markerElement.style.backgroundImage = 'url(' + markerImage + ')';
              markerElement.style.width = '50px'; // Ajustez la largeur
              markerElement.style.height = '80px'; // Ajustez la hauteur
              markerElement.style.backgroundSize = '100%';
             
              new mapboxgl.Marker(markerElement)
                .setLngLat([loc.longitude, loc.latitude])
                .setPopup(new mapboxgl.Popup().setText(loc.title))
                .addTo(map);
            });
          </script>
        </body>
      </html>
    `;
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#0e79b6" />
      <View style={styles.container}>
        {userLocation ? (
          <WebView
            originWhitelist={['*']}
            source={{ html: generateHtmlContent() }}
            style={styles.map}
            javaScriptEnabled={true}
          />
        ) : (
          <Text>Chargement de la localisation...</Text>
        )}

        {userLocation && (
          <TouchableOpacity style={styles.coordinates}>
            <Text>Latitude: {userLocation.latitude.toFixed(5)}</Text>
            <Text>Longitude: {userLocation.longitude.toFixed(5)}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.centerButton}>
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