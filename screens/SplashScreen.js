import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, Animated } from 'react-native';
import Loginscreen from './Loginscreen'; // Assurez-vous que le composant Login est dans le même répertoire ou ajustez le chemin
//import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
   
  const [isLoading, setIsLoading] = useState(true);
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 955, // Fade in effect
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 955); // 3 secondes

    return () => clearTimeout(timer); // Nettoyage du timer
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Animated.View style={{ opacity }}>
          <Image source={require('../assets/Likunzi.png')} style={styles.logo} />
 
        </Animated.View>
      </View>
    );
  }

  return    <Loginscreen/>; // Affiche le composant Login après 3 secondes
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Une belle couleur de fond
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: 'gray', // Couleur de texte blanche
    textAlign: 'center',
  },
});

export default SplashScreen;