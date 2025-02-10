import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZmFtYmExOTg1IiwiYSI6ImNtNDFiNTlnazA5aDAyanIybHM1MmZhdmkifQ.fvPeL-KFlMCVgx08fa1t2w';

const Mapscreen2 = ({ modalVisible, setModalVisible, objectId, nom, dateinitial, datefinal }) => {
  const [coordinates, setCoordinates] = useState([]);
  const webViewRef = useRef(null);

  useEffect(() => {
    const fetchRouteData = async () => {
      const apiUrl = `https://gsh36.net/id20/api/api.php?api=user&key=C73CBF6F154B03D77FBC4C6D39053485&cmd=OBJECT_GET_ROUTE,${objectId},${dateinitial},${datefinal},%2000:00:00,%2000:00,%2000:00:00,1`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const text = await response.text();
       
        const data = JSON.parse(text);

        // Extraire latitude et longitude
        const coords = data.route.map(point => {
          const longitude = parseFloat(point[2]); // 4ème élément pour longitude
          const latitude = parseFloat(point[1]); // 5ème élément pour latitude
          //alert(longitude)
          return { latitude, longitude }; // Retourner un objet avec latitude et longitude
        });

        setCoordinates(coords);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchRouteData();
  }, [objectId, dateinitial, datefinal]);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Mapbox</title>
        <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
        <link href="https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css" rel="stylesheet" />
        <style>
          body { margin: 0; padding: 0; }
          #map { position: absolute; top: 0; bottom: 0; width: 100%; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.js"></script>
        <script>
          mapboxgl.accessToken = '${MAPBOX_ACCESS_TOKEN}';
          const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [${coordinates.length > 0 ? coordinates[0].longitude : 15.2102}, ${coordinates.length > 0 ? coordinates[0].latitude : -4.35178}],
            zoom: 12
          });

          ${coordinates.map(coord => `
            new mapboxgl.Marker()
              .setLngLat([${coord.longitude}, ${coord.latitude}])
              .addTo(map);
          `).join('')}

          window.addEventListener('message', (e) => {
            const data = JSON.parse(e.data);
            if (data.type === 'updatePosition') {
              // Update marker position logic if needed
            }
          });
        </script>
      </body>
    </html>
  `;

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#0e79b6" />
      <View style={styles.container}>
        <Modal visible={modalVisible} animationType="slide" transparent={false}>
          <View style={styles.modalContainer}>
            <WebView
              ref={webViewRef}
              originWhitelist={['*']}
              source={{ html: htmlContent }}
              style={styles.map}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Mapscreen2;