import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const Balisescreen = () => {
  const [locationData, setLocationData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://gsh36.net/id20/api/api.php?api=user&key=C73CBF6F154B03D77FBC4C6D39053485&cmd=OBJECT_GET_LOCATIONS,359647090666616');
        setLocationData(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <Text style={styles.errorText}>Erreur: {error.message}</Text>;
  }

  if (!locationData) {
    return <Text style={styles.loadingText}>Chargement...</Text>;
  }

  // Récupérer les valeurs de lat, lng et l'identifiant
  const id = Object.keys(locationData)[0]; // "359647090666616"
  const lat = locationData[id].lat; // "28"
  const lng = locationData[id].lng; // "15"

  return (
    <View style={styles.container}>
      <Text style={styles.text}>ID: {id}</Text>
      <Text style={styles.text}>Latitude: {lat}</Text>
      <Text style={styles.text}>Longitude: {lng}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Couleur de fond, vous pouvez changer selon vos besoins
  },
  text: {
    fontSize: 18,
    margin: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  loadingText: {
    textAlign: 'center',
  },
});

export default Balisescreen;