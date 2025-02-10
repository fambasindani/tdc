import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import COLORS from '../Couleurs/COLORS';
import Listflast from './Listflast';
import Icon from 'react-native-vector-icons/FontAwesome';
//import userImage from '../assets/user.png'; // Assurez-vous que le chemin est correct
import ApiUrlbis from './ApiUrlbis';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Listemaps = ({ mydata, SetLoading, handDelete, handleupdate,handdetails, Loading, fetchUserData, handleConfirm }) => {
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


  
  const urlimg = ApiUrlbis({ endpoint: '' });
//

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const renderItem = ({ item }) => {
    const formattedDate = moment(item.datecourse).format('YYYY-MM-DD');
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.indexContainer}>
        <Image source={{ uri:`${urlimg}${item.avatar}` }} style={styles.userImage} /> 
         
         {/* <Image source={userImage} style={styles.userImage} />*/}
        </TouchableOpacity>
        <View style={styles.descriptionContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.lastName}>{item.nom}</Text>
            <Text style={styles.firstName}>{item.immatriculation}</Text>
            <Text style={styles.firstName}>{formattedDate}</Text>
             
          </View>
          <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.iconButtoneye} onPress={() => handdetails(item)} >
            <Image 
                    source={require('../assets/detail.png')} 
                    style={styles.linear} 
                />
                
            </TouchableOpacity>
          
            <TouchableOpacity style={styles.iconButton} onPress={() => handleupdate(item)}>
            <Image 
                    source={require('../assets/mapss.png')} 
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
        renderItem={({ item }) => renderItem({ item })} 
      />
    </View>
  );
};

const styles = {
  container: {
    paddingTop:12, 
    paddingBottom: 70, 
    // flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 17, // Ajustez selon vos besoins
    paddingHorizontal: 16, // Pour l'espace latéral
    borderBottomWidth: 0.4,
    borderBottomColor: COLORS.grey,
   // marginTop: 10,
    //margin: 10,
  },
  linear: {
    width: 22, // Ajustez la largeur selon vos besoins
    height:23, // Ajustez la hauteur selon vos besoins
  },
  indexContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 20,
    //marginRight:20,
  },
  descriptionContainer: {
    //flex:1,
    width: '85%',
    marginLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameContainer: {
    justifyContent: 'center',
     marginLeft:5,
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
    backgroundColor:'#286a90',
    padding: 8,
    borderRadius: 5,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:5,
    marginLeft:3,
  },
  iconButtonDelete: {
    backgroundColor: '#286a90',
    padding: 8,
    borderRadius: 5,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:5,
    marginLeft:3,
  },
  iconButtoneye: {
    flexDirection: 'row',
    backgroundColor:'#286a90',
    padding: 8,
    borderRadius: 5,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:5,
    marginLeft:3,
  },
};

export default Listemaps;