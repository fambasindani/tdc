import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
//import Icon from 'react-native-vector-icons/MaterialIcons'; // Assurez-vous d'importer l'icône
import ApiUrl from './ApiUrl';
import axios from 'axios';
import COLORS from '../Couleurs/COLORS';

const Droplist = ({ description, contenus, identifiant, setDescription, label, data, setData, icons, placephold, getCategorie }) => {



  return (
    <View style={styles.container}> 
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerWrapper}>
        <Icon name={icons} size={20} style={styles.icon} />
        <Picker
          selectedValue={description}
          onValueChange={(itemValue) => setDescription(itemValue)}
          style={styles.picker}
          mode="dropdown"
        >
          <Picker.Item    style={styles.textpicker} label={placephold} value="" />
          {data.map((cat) => (
            <Picker.Item
              key={cat[identifiant]}
              label={cat[contenus]}
              value={cat[identifiant]}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 15,
   // backgroundColor: 'white',
  },
  label: {
    color: COLORS.black,
    marginBottom: 5,
    fontSize: 16,
    marginLeft:20,
  },
  pickerWrapper: {
    
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    height:50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8, // Appliquez le borderRadius ici
    overflow: 'hidden', // Assurez-vous que le contenu respecte le borderRadius
    alignSelf: 'center', // Centrez le conteneur
  },
  icon: {
    color: COLORS.grey,
    marginLeft: 10, // Espace entre l'icône et le Picker
  },
  picker: {
    height: 50,
    flex: 1, // Permet au Picker de prendre le reste de l'espace
    backgroundColor: 'white',

  },
  textpicker:{
    color:COLORS.grey,
    
  }
});

export default Droplist;