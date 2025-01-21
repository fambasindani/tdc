import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Platform } from 'react-native';
import COLORS from '../Couleurs/COLORS';
import Icon from 'react-native-vector-icons/FontAwesome';
import Messagebox from '../composant/Messagebox';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Listecat from '../composant/Listecat';
import ApiUrl from '../composant/ApiUrl';
import axios from 'axios';





const url = ApiUrl({ endpoint: 'getcategorie' });

const Listecatscreen = ({ navigation }) => {
  const naviger=useNavigation()
  const [userData, setUserData] = useState([]);
  const [Loading, SetLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [message, Setmessage] = useState('');
  const [modalVisible, SetmodalVisible] = useState(false);
  const [selected, Setselected] = useState(null);





  

  const addcat = async () => {
    
    //naviger.navigate("Additineraire");
    naviger.navigate('addcat', { refreshList })
  }

  

  useEffect(() => {
    fetchUserData();
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
      const newData = response.data; // Utiliser les catégories de véhicule
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

  const handleConfirms = async () => {
    SetmodalVisible(false);
    // Ici, tu peux ajouter la logique de confirmation
  };

  const handleCancel = async () => {
    SetmodalVisible(false);
  };

  const handDelete = async (item) => {
    setShowSuccessModal(true);
    SetmodalVisible(true);
    Setselected(item);//${item.nom}
    Setmessage(`Voulez-vous supprimer ?`);
  };

  const handlupdate = async (item) => {
    naviger.navigate('Updatecategorie', { items: item, refreshList });
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
            <TouchableOpacity style={styles.addButton} onPress={() => addcat()}>
              <Icon name="plus" size={20} style={styles.addButtonIcon} />
            </TouchableOpacity>
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

          <Listecat
            mydata={filteredData}
            handDelete={handDelete}
          
            Loading={Loading}
            handlupdate={handlupdate}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({


  addButtonIcon:{
    color:COLORS.white

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
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: Platform.OS === 'android' ? 4 : 0,
  },

  container: {
    //marginTop: 20,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.grey,
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
  item: {
    backgroundColor: COLORS.blue,
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 24,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  selectedItem: {
    backgroundColor: COLORS.red,
  },
  itemText: {
    color: COLORS.beige,
    fontSize: 16,
    fontWeight: 'bold',
  },

  selectedItem: {
    backgroundColor: COLORS.red,
  },

  amis: {

    backgroundColor: COLORS.blue,
  },

  selectedAmis: {

    backgroundColor: COLORS.red,
  },

});
export default Listecatscreen;