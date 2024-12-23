import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Platform } from 'react-native';
import COLORS from '../Couleurs/COLORS';
import Icon from 'react-native-vector-icons/FontAwesome';
import Messagebox from '../composant/Messagebox';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Listecat from '../composant/Listecat';

const Listecatscreen = ({ navigation }) => {
  const naviger=useNavigation()
  const [userData, setUserData] = useState([]);
  const [Loading, SetLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [message, Setmessage] = useState('');
  const [modalVisible, SetmodalVisible] = useState(false);
  const [selected, Setselected] = useState(null);

  const vehicleCategories = [
    { id: 1, cat: 'Voiture' },
    { id: 2, cat: 'Moto' },
    { id: 3, cat: 'Camion' },
    { id: 4, cat: 'Vélo' }
  ];

  const addcat = async () => {
    
    naviger.navigate("Additineraire");
  }

  

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    SetLoading(true);
    try {
      const newData = vehicleCategories; // Utiliser les catégories de véhicule
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
    return item.cat.toLowerCase().includes(searchText.toLowerCase());
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
    Setselected(item);
    Setmessage(`Voulez-vous supprimer ${item.cat} ?`);
  };

  const handupdate = async (item) => {
    navigation.navigate('Updateuserscreen', { items: item });
  };

  return (
    <>
     <StatusBar barStyle="dark-content" backgroundColor="#007BFF" />
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
            handUpdate={handupdate}
            Loading={Loading}
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
    //flex:1,
    marginTop: 70,
    flexDirection: 'row',
    alignItems: 'center', // Center items vertically
    justifyContent: 'flex-start', // Align items to the start
    width: '95%', // Set width to accommodate both items
  },

  addButton: {
    backgroundColor: COLORS.rouge,
    borderRadius: 10,
    height: 40, // Match height with TextInput
    width: 40, // Fixed width for the button
    justifyContent: 'center', // Center icon vertically
    alignItems: 'center', // Center icon horizontally
    marginLeft: 5, // Optional margin for spacing
  },
 




  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.blanccasse,
    borderRadius: 8,
    paddingHorizontal: 12,
   // marginBottom: 10,
    flex: 1, // Allow this container to take remaining space
    marginRight: 5, // Add margin to the right to space the button
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