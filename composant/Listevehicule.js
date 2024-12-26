import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import COLORS from '../Couleurs/COLORS';
import Listflast from './Listflast';


import Icon from 'react-native-vector-icons/FontAwesome';

const Listevehicule = ({ mydata, SetLoading, handDelete,handupdate, Loading, fetchUserData, handleConfirm }) => {
  const [modalVisible, setModalVisible] = useState(false);


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
            <Text style={styles.lastName}>{item.marque}</Text>
             <Text style={styles.firstName}>{item.immatricule}</Text> 
              {/* <Text style={styles.firstName}>{item.prenom}</Text> */}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={() => handupdate(item)}>
              <Icon name="pencil" size={18} color={COLORS.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButtonDelete} onPress={() => handDelete(item)} >
              <Icon name="trash" size={18} color={COLORS.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButtoneye} onPress={() => handDelete(item)} >
              <Icon name="eye" size={18} color={COLORS.white} />
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
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
  },
  numberContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.grey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    color: COLORS.white,
    fontSize: 20,
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
    backgroundColor: COLORS.blue,
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonDelete: {
    backgroundColor: COLORS.red,
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtoneye: {
    backgroundColor: COLORS.black,
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default Listevehicule;