import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Image} from 'react-native';
import COLORS from '../Couleurs/COLORS';
import Listflast from './Listflast';
import axios from 'axios';


import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Listearret = ({ mydata, SetLoading, handDelete,handupdate, handleupdate, Loading, fetchUserData, handleConfirm }) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Vos fonctions d'écran
const [role, setRole] = useState('');

const retrieveRole = async () => {
  try {
    const storedRole = await AsyncStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }
  } catch (e) {
    console.error('Erreur lors de la récupération du rôle:', e);
  }
};

useEffect(() => {
  retrieveRole();
}, []);


  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };





  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.indexContainer}>
          <View style={styles.numberContainer}>
            <Text style={styles.numberText}>{index + 1}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.descriptionContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.lastName}>{item.description}</Text>
              {/* <Text style={styles.firstName}>{item.prenom}</Text> */}
          </View>
          <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={() => handleupdate(item)}>
            <Image 
                    source={require('../assets/edit.png')} 
                    style={styles.linear} 
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButtonDelete} onPress={() => handDelete(item)} >
            <Image 
                    source={require('../assets/delete.png')} 
                    style={styles.linear} 
                />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Listflast 
        handleConfirm={handleConfirm} 
        SetLoading={SetLoading} 
        Loading={Loading} 
        data={mydata} 
        fetchUserData={fetchUserData} 
        renderItem={({ item, index }) => renderItem({ item, index })} 
      />
      
    </View>
  );
};

const styles = {
  container: {
   // flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 0.4,
    borderBottomColor: COLORS.grey,
  },
  numberContainer: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: COLORS.grey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  descriptionContainer: {
  // flex: 1,
  // margint:20,

 // marginTop: 30,

    width: '85%',
    marginLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
   // alignItems: 'center',
  },
  nameContainer: {
    justifyContent: 'center', // Centers the names vertically
    alignItems: 'center', // Centers the names horizontally
  },
  lastName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  firstName: {
    fontSize: 14,
    color: COLORS.grey,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    backgroundColor:'#404141',
    padding: 8,
    borderRadius: 5,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:5,
    marginLeft:3,
  },
  iconButtonDelete: {
    backgroundColor: '#fc7676',
    padding: 8,
    borderRadius: 5,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:5,
    marginLeft:3,
  },
  linear: {
    width: 22, // Ajustez la largeur selon vos besoins
    height:23, // Ajustez la hauteur selon vos besoins
  },
};

export default Listearret;