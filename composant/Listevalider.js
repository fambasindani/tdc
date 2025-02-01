import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import COLORS from '../Couleurs/COLORS';
import Listflast from './Listflast';
import Icon from 'react-native-vector-icons/FontAwesome';
import userImage from '../assets/user.png'; // Assurez-vous que le chemin est correct
import moment from 'moment';
import ApiUrl from './ApiUrl';
import axios from 'axios';
import ApiUrlbis from './ApiUrlbis';

const Listevalider = ({ mydata, SetLoading,getcompter, setcourseid, handDelete, embarquer, depart, arriver, compter, handupdate, Loading, fetchUserData, handleConfirm }) => {
 
  const [moncompeur, setmoncompeur] = useState(0);
  const [tourCounts, setTourCounts] = useState({}); // Pour stocker les comptes de tours
    const gettdates = () => {
      return moment().format('YYYY-MM-DD')
  
    }
  
  const getcompters = async (id) => {
    const url = ApiUrl({ endpoint: 'comptertour' });

    try {
      const formData = new FormData();
      formData.append('datearriver', gettdates()); // Assurez-vous que gettdates() est défini
      formData.append('idcourse', id);

      const res = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return res.data.count; // Retourne le count
    } catch (error) {
      console.error('Erreur:', error);
      return 0; // Retourne 0 en cas d'erreur
    }
  };

  useEffect(() => {
    const fetchCounts = async () => {
      const counts = {};
      for (const item of mydata) {
        counts[item.id] = await getcompters(item.id);
      }
      setTourCounts(counts);
    };

    fetchCounts();
  }, [mydata]); // Ajoutez mydata comme dépendance




  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const renderItem = ({ item }) => {
    const count = tourCounts[item.id] || 0; // Utiliser le compte ici
    const urlimg = ApiUrlbis({ endpoint: '' });
    
  
  
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.indexContainer}>
         <Image source={{ uri:`${urlimg}${item.avatar}` }} style={styles.userImage} /> 
                 
        </TouchableOpacity>
        <View style={styles.descriptionContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.lastName}>{item.nom}</Text>
            <Text style={styles.firstName}>{item.immatriculation}</Text>
            <Text style={styles.firstName}>{count} tours</Text>
          </View>
          <View style={styles.buttonContainer}>
        
            <TouchableOpacity style={styles.iconEmbarque} onPress={() => embarquer(item)}>
            <Image 
                    source={require('../assets/charge.png')} 
                    style={styles.linear} 
                />
                <Text style={styles.Name}> Charge</Text>
            </TouchableOpacity>
                        <TouchableOpacity style={styles.iconDepart} onPress={() => depart(item)}>
            <Image 
                    source={require('../assets/up.png')} 
                    style={styles.linear} 
                />
                <Text style={styles.Name}> Départ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconArriver} onPress={() => arriver(item)} >
            <Image 
                    source={require('../assets/down.png')} 
                    style={styles.linear} 
                />
                <Text style={styles.Name}> Arriver</Text>
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
    paddingVertical: 14, // Ajustez selon vos besoins
    paddingHorizontal: 16, // Pour l'espace latéral
    borderBottomWidth: 0.4,
    marginLeft: 1,
    borderBottomColor: COLORS.grey,
   // marginTop: 10,
    //margin: 10,
  },
  linear: {
    width: 23.7, // Ajustez la largeur selon vos besoins
    height:24, // Ajustez la hauteur selon vos besoins
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
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameContainer: {
    justifyContent: 'center', 
    marginLeft:1,
  },
  lastName: {
    fontSize: 16,
    fontWeight: 'bold',
    
  },
  firstName: {
    fontSize: 14,
    color: COLORS.grey,
    alignItems: 'center',
    marginLeft:1,
  },
  Name: {
    fontSize: 8,
    color:'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconEmbarque: {
    backgroundColor:'#286a90',
    padding: 8,
    borderRadius: 2,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:5,
    marginLeft:3,
  },
  iconDepart: {
    backgroundColor: '#599b12',
    padding: 8,
    borderRadius: 2,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:5,
    marginLeft:3,
  },
  iconArriver: {
    backgroundColor: '#d2533a',
    padding: 8,
    borderRadius: 2,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:5,
    marginLeft:3,
  },
};

export default Listevalider;