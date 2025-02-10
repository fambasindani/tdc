import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { Asset } from 'expo-asset';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZmFtYmExOTg1IiwiYSI6ImNtNDFiNTlnazA5aDAyanIybHM1MmZhdmkifQ.fvPeL-KFlMCVgx08fa1t2w';
const mapsmoto = Asset.fromModule(require('../assets/mapsmoto.png')).uri; // Convertir l'image en URL

const Mapscreen = ({ modalVisible, setModalVisible, ime, nom }) => {
    const [region, setRegion] = useState({
      latitude: -4.35178,  // Valeur par défaut
      longitude: 15.2102,  // Valeur par défaut markerElement.style.borderRadius = '50%'; // Pour un marqueur circulaire
    });
    const webViewRef = useRef(null);
  
    const fetchData = async (ime) => {
      try {
        const response = await axios.get(`https://gsh36.net/id20/api/api.php?api=user&key=C73CBF6F154B03D77FBC4C6D39053485&cmd=OBJECT_GET_LOCATIONS,${ime}`);
        const data = response.data;
        const id = Object.keys(data)[0];
        if (id) {
          const latitude = data[id].lat;
          const longitude = data[id].lng;
  
          setRegion({ latitude, longitude });
  
          const messageData = {
            type: 'updatePosition',
            latitude,
            longitude,
          };
  
          if (webViewRef.current) {
            webViewRef.current.postMessage(JSON.stringify(messageData));
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
  
    useEffect(() => {
      if (modalVisible) {
        fetchData(ime);
        const intervalId = setInterval(() => fetchData(ime), 5000); // Appelle fetchData toutes les 5 secondes
  
        return () => clearInterval(intervalId); // Nettoyage de l'intervalle à la fermeture du modal
      }
    }, [modalVisible, ime]);
  
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
              center: [${region.longitude}, ${region.latitude}],
              zoom: 12
            });

            const markerElement = document.createElement('div');
            markerElement.style.backgroundImage = 'url(${mapsmoto})'; // Utilisation de l'URL de l'image
            markerElement.style.width = '50px'; // Ajustez la largeur
            markerElement.style.height = '80px'; // Ajustez la hauteur
            markerElement.style.backgroundSize = '100%';
            

            const marker = new mapboxgl.Marker(markerElement)
              .setLngLat([${region.longitude}, ${region.latitude}])
              .setPopup(new mapboxgl.Popup().setText('${nom}'))
              .addTo(map);
  
            const updateMarkerPosition = (lat, lng) => {
              marker.setLngLat([lng, lat]);
              map.setCenter([lng, lat]);
            };
  
            window.addEventListener('message', (e) => {
              const data = JSON.parse(e.data);
              if (data.type === 'updatePosition') {
                updateMarkerPosition(data.latitude, data.longitude);
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
  
  export default Mapscreen;