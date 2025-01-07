import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Assurez-vous d'importer l'icône
import ApiUrl from './ApiUrl';
import axios from 'axios';
import COLORS from '../Couleurs/COLORS';

const Droplist = ({ description, setDescription, label, icons, placephold }) => {

  const vehicleCategories = [
    { id: 1, cat: 'Voiture' },
    { id: 2, cat: 'Moto' },
    { id: 3, cat: 'Camion' },
    { id: 4, cat: 'Vélo' }
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    // Remplacez l'appel à getCategorie par le tableau vehicleCategories
    setData(vehicleCategories);
  }, []);

  useEffect(() => {
    getCategorie();
  }, []);
  
  const getCategorie = async () => {
    try {
      const url = ApiUrl({ endpoint: 'gettypeobjet' });
      const response = await axios.get(url);
     // setData(response.data);
    } catch (error) {
      console.error('Erreur lors de la requête à l\'API :', error);
    }
  };

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
              key={cat.id}
              label={cat.cat}
              value={cat.id}
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