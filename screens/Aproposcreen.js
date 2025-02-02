import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, Animated } from 'react-native';

const Aproposcreen = () => {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000, // Effet de fondu
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity }}>
        <Image source={require('../assets/Likunzi.png')} style={styles.logo} />
        <Text style={styles.title}>Version 0.0.1</Text>
        <Text style={styles.subtitle}>© 2024-2025 / TDTC</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', // Couleur blanc cassé
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 15,
    color: 'white', // Couleur de texte noire
    textAlign: 'center',
    backgroundColor:'gray',
    borderRadius:54
  },
  subtitle: {
    fontSize: 15,
    color: 'gray', // Couleur de texte noire
    textAlign: 'center',
    paddingTop:150,
    borderRadius:50
  },
});

export default Aproposcreen;