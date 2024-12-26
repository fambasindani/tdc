import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import COLORS from '../Couleurs/COLORS';
import Icon from 'react-native-vector-icons/FontAwesome';
import Messagebox from '../composant/Messagebox';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Listearret from '../composant/Listearret';
import Listevehicule from '../composant/Listevehicule';

const Listevehiculescreen = ({ navigation }) => {
  const naviger = useNavigation();
  const [userData, setUserData] = useState([]);
  const [Loading, SetLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [message, Setmessage] = useState('');
  const [modalVisible, SetmodalVisible] = useState(false);
  const [selected, Setselected] = useState(null);

  // Remplace vehiculeArret par vehicule
  const vehicule = [
    { id: 1, marque: 'Toyota', immatricule: 'ABC123', numeroChassie: 'XYZ456789' },
    { id: 2, marque: 'Honda', immatricule: 'DEF456', numeroChassie: 'ABC123456' },
    { id: 3, marque: 'Nissan', immatricule: 'GHI789', numeroChassie: 'DEF789123' },
    { id: 4, marque: 'Ford', immatricule: 'JKL012', numeroChassie: 'GHI456789' },
    { id: 5, marque: 'Chevrolet', immatricule: 'MNO345', numeroChassie: 'JKL123456' }
  ];

  const additin = () => {
    naviger.navigate("Addvehicule");
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    SetLoading(true);
    try {
      const newData = vehicule; // Utiliser les données des véhicules
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
    return item.marque.toLowerCase().includes(searchText.toLowerCase());
  });

  const clearSearch = () => {
    setSearchText('');
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  const handleConfirms = () => {
    SetmodalVisible(false);
    // Ici, tu peux ajouter la logique de confirmation
  };

  const handleCancel = () => {
    SetmodalVisible(false);
  };

  const handDelete = (item) => {
    setShowSuccessModal(true);
    SetmodalVisible(true);
    Setselected(item);
    Setmessage(`Voulez-vous supprimer ${item.marque} ?`);
  };

  const handupdate = (item) => {
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
            <TouchableOpacity style={styles.addButton} onPress={additin}>
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

          <Listevehicule
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
  addButtonIcon: {
    color: COLORS.white,
  },
  headerContainer: {
    marginTop: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '95%',
  },
  addButton: {
    backgroundColor: COLORS.rouge,
    borderRadius: 10,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.blanccasse,
    borderRadius: 8,
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

export default Listevehiculescreen;