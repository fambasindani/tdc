import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Platform } from 'react-native';
import COLORS from '../Couleurs/COLORS';
import Icon from 'react-native-vector-icons/FontAwesome';
import Messagebox from '../composant/Messagebox';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import ApiUrl from '../composant/ApiUrl';
import axios from 'axios';
import Listetarification from '../composant/Listetarification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Message from '../Message/Boxmessage';

const Listetarificationscreen = ({ navigation }) => {
  const naviger = useNavigation();
  const [userData, setUserData] = useState([]);
  const [Loading, SetLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [message, Setmessage] = useState('');
  const [modalVisible, SetmodalVisible] = useState(false);
  const [selected, Setselected] = useState(null);



  
    //message de notification
    const [text, settext] = useState('');
    const [showSuccesspopModal, setshowSuccesspopModal] = useState(false);
  
  
    const closeSuccessModal = () => {
      setshowSuccesspopModal(false);
    };
  



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


  useFocusEffect(
        React.useCallback(() => {
          fetchUserData();

            return () => {
                // Optionnel : logique de nettoyage si nécessaire
            };
        }, [])
    );

useEffect(() => {
  retrieveRole();
}, []);

  const url = ApiUrl({ endpoint: 'gettarification' });

  const additin = async () => {
    naviger.navigate("Addtarification", {refreshList});
  }

  useEffect(() => {
    //fetchUserData();
  }, []);

  const refreshList = () => {
    fetchUserData(); // Mettre à jour la liste
};

  const fetchUserData = async () => {
    SetLoading(true);
    try {
      const response = await axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
      const newData = response.data; // Utiliser les itinéraires de véhicule
      setUserData(newData);
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur:', error);
    } finally {
      SetLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredData = userData.filter((item) => {
    return item.description.toLowerCase().includes(searchText.toLowerCase());
  });

  const clearSearch = () => {
    setSearchText('');
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };



  const handleCancel = async () => {
    SetmodalVisible(false);
  };

  const handDelete = async (item) => {
    setShowSuccessModal(true);
    SetmodalVisible(true);
    Setselected(item);
    Setmessage(`Voulez-vous supprimer Itinéraire ${item.description} ?`);
  };

  const handleConfirms = async () => {
    SetmodalVisible(false);
    const item = selected
    //setshowSuccesspopModal(true);
    //settext(item.id);
     await deletarif(item)

    //alert(item.id)


    // Ici, tu peux ajouter la logique de confirmation
  };

  
  const deletarif = async (item) => {
    const urldelete = ApiUrl({ endpoint: 'delete_tarification/' });


    try {
      const response = await axios.delete(`${urldelete}${item.id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      fetchUserData()
      setshowSuccesspopModal(true);
      settext(response.data);
      console.log(response.data)
      //setUserData(newData);
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur:', error);
    } finally {
      //SetLoading(false);
    }
  };

  const handleupdate = async (item) => {
    naviger.navigate('Updatetarification', { items: item, refreshList });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#0e79b6" />
      <View style={styles.complet}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Recherche..."
                placeholderTextColor="#999"
                value={searchText}
                onChangeText={handleSearch}
              />
              {searchText !== '' && (
                <TouchableOpacity onPress={clearSearch}>
                  <Icon name="close" size={20} color="#999" style={styles.searchIcon} />
                </TouchableOpacity>
              )}
              {searchText === '' && (
                <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
              )}
            </View>
            {(role === 'admin'||role === 'super user') && (
            <TouchableOpacity style={styles.addButton} onPress={additin}>
              <Icon name="plus" size={20} style={styles.addButtonIcon} />
            </TouchableOpacity>
            )}
          </View>

          <Messagebox
            message={message}
            handleConfirm={handleConfirms}
            handleCancel={handleCancel}
            modalVisible={modalVisible}
            handleCloseModal={handleCloseModal}
            showSuccessModal={showSuccessModal}
            setShowSuccessModal={setShowSuccessModal}
          />

            <Message
            handleCloseModal={closeSuccessModal}
            text={text}
            showSuccessModal={showSuccesspopModal}
            setShowSuccessModal={setshowSuccesspopModal}
          />

          <Listetarification
            mydata={filteredData}
            handDelete={handDelete}
            handleupdate={handleupdate}
            Loading={Loading}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  addButtonIcon: {
    color: COLORS.white,
  },
  headerContainer: {
    marginTop: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom:20,
    borderBottomWidth: 0.4,
    borderBottomColor: COLORS.grey,
    height: 40,
    width: '95%',
  },
  addButton: {
    backgroundColor: COLORS.rouge,
    borderRadius: 50,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e2edf3',
    borderRadius: 53,
    paddingHorizontal: 12,
    flex: 1,
    marginRight: 5,
  },
  complet: {
    backgroundColor: COLORS.blanccasse,
    flex: 1,
  },
  container: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  searchIcon: {
    marginLeft: 8,
  },
});

export default Listetarificationscreen;