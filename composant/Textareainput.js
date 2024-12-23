import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../Couleurs/COLORS';

const Textareainput = ({ name, setname, icons, placeholder, label, type }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <Icon name={icons} size={17} color="#888" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          keyboardType={type}
          value={name}
          onChangeText={setname}
          multiline
          textAlignVertical="top" // Alignement du texte en haut
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Alignement au début pour que le texte commence en haut
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    marginHorizontal: 20,
  },
  inputIcon: {
    marginRight: 8,
    alignSelf: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    maxHeight: 120, // Hauteur maximale augmentée
    minHeight: 80, // Hauteur minimale pour afficher 3-4 lignes
    paddingVertical: 10, // Ajout de padding vertical pour plus d'espace
  },
  label: {
    color: COLORS.black,
    marginLeft: 24,
    marginBottom: 5,
    fontSize: 16,
  },
});

export default Textareainput;