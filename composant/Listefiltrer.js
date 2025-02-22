import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import COLORS from '../Couleurs/COLORS';
import Listflast from './Listflast';
import Icon from 'react-native-vector-icons/FontAwesome';
//import userImage from '../assets/user.png'; // Assurez-vous que le chemin est correct
import ApiUrlbis from './ApiUrlbis';
import moment from 'moment';
//import moment from 'moment-timezone';

const Listefiltrer = ({ mydata, SetLoading, handDelete, handleupdate,handdetails, Loading, fetchUserData, handleConfirm }) => {
  const [modalVisible, setModalVisible] = useState(false);

  
  const urlimg = ApiUrlbis({ endpoint: '' });
//

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const renderItem = ({ item }) => {
    const formattedDate = moment(item.datearriver).format('YYYY-MM-DD');
  


    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.indexContainer}>
        <Image source={{ uri:`${urlimg}${item.avatar}` }} style={styles.userImage} /> 
         
         {/* <Image source={userImage} style={styles.userImage} />*/}
        </TouchableOpacity>
        <View style={styles.descriptionContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.lastName}>{item.nom}</Text>
            <Text style={styles.firstName}>{item.montanttarif} CDF</Text>
            <Text style={styles.firstName}>{formattedDate}</Text>
            <Text style={styles.firstName}>chargement : {item.diff_depart_embarquement_minutes} minutes</Text>
            <Text style={styles.firstName}>parcours      : {item.diff_arriver_depart_minutes} minutes</Text>
             
          </View>
          <View style={styles.buttonContainer}>
           

          <TouchableOpacity style={styles.iconButtoneye} onPress={() => handdetails(item)} >
            <Image 
                    source={require('../assets/detail.png')} 
                    style={styles.linear} 
                />
                
            </TouchableOpacity>
              {/*
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
*/}
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
     marginLeft:'12%',
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

export default Listefiltrer;