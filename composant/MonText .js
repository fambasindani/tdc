import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import COLORS from '../Couleurs/COLORS';

const MonText = ({label, desisnation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.name}>{desisnation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingBottom:10,
    backgroundColor: COLORS.blanccasse,
    borderRadius: 10,
    // Suppression des propriétés d'ombre
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    elevation: 0, // Pour Android, suppression de l'ombre
    alignSelf: 'flex-start', // Aligner le conteneur à gauche
  },
  label: {
    fontSize: 17,
   // fontWeight: 'bold',
    color: '#a4a4a4',
    marginBottom: 5,
  },
  name: {
    fontSize: 17,
    fontWeight: '',
    color: 'black',
    marginBottom: 8,
  },
});

export default MonText;