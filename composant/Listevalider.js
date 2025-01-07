import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import COLORS from '../Couleurs/COLORS';
import Listflast from './Listflast';
import Icon from 'react-native-vector-icons/FontAwesome';
import userImage from '../assets/user.png'; // Assurez-vous que le chemin est correct

const Listevalider = ({ mydata, SetLoading, handDelete, handupdate, Loading, fetchUserData, handleConfirm }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.indexContainer}>
          <Image source={userImage} style={styles.userImage} />
        </TouchableOpacity>
        <View style={styles.descriptionContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.lastName}>{item.nomChauffeur}</Text>
            <Text style={styles.firstName}>{item.tour} tours</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={() => handupdate(item)}>
             
             {/* Icône de validation */}
              <Text style={styles.iconButtonText}> <Icon name="check" size={18} color={COLORS.white} />  Valider</Text> {/* Texte "Valider" */}
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
    paddingBottom: 52, 
    // flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 25, // Ajustez selon vos besoins
    paddingHorizontal: 16, // Pour l'espace latéral
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
   // marginTop: 10,
    //margin: 10,
  },
  indexContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    width: 60,
    height: 60,
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
    alignItems: 'center',
    marginLeft:20,
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
    backgroundColor: COLORS.blue,
    padding: 7,
    borderRadius: 8,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  iconButtonText: {
    color: COLORS.white,
    marginLeft: 5, // Espace entre l'icône et le texte
    fontSize: 16,
    
  }
};

export default Listevalider;