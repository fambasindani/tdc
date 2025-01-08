import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Messagebox from '../composant/Messagebox';
import Listevehicule from '../composant/Listevehicule'; // Assurez-vous que ce chemin est correct
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import COLORS from '../Couleurs/COLORS'; // Assurez-vous que ce chemin est correct
import Listecours from '../composant/Listecours';

const Listecoursscreen = () => {
  const naviger = useNavigation();
  const [userData, setUserData] = useState([]);
  const [Loading, SetLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [message, Setmessage] = useState('');
  const [modalVisible, SetmodalVisible] = useState(false);
  const [selected, Setselected] = useState(null);

  const courseData = [
    { id: 1, nomChauffeur: 'Jean Dupont', prixCourse: 20000, immatricule: 'ABC123' },
    { id: 2, nomChauffeur: 'Marie Curie', prixCourse: 20000, immatricule: 'DEF456' },
    { id: 3, nomChauffeur: 'Luc Martin', prixCourse: 20000, immatricule: 'GHI789' },
    { id: 4, nomChauffeur: 'Sophie Laurent', prixCourse: 20000, immatricule: 'JKL012' },
    { id: 5, nomChauffeur: 'Paul Petit', prixCourse: 20000, immatricule: 'MNO345' },
    { id: 6, nomChauffeur: 'Paul Petit', prixCourse: 20000, immatricule: 'MNO345' },
    { id: 6, nomChauffeur: 'Paul Petit', prixCourse: 20000, immatricule: 'MNO345' }

  ];

  const additin = () => {
    naviger.navigate("Addcours");
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    SetLoading(true);
    try {
      const newData = courseData; // Utiliser les données des courses
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
    return item.nomChauffeur.toLowerCase().includes(searchText.toLowerCase());
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
    Setmessage(`Voulez-vous supprimer ${item.nomChauffeur} ?`);
  };

  const handupdate = (item) => {
    navigation.navigate('UpdateCourse', { items: item });
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

          <Listecours
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
  complet: {
    backgroundColor: COLORS.blanccasse,
    flex: 1,
  },
  container: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    marginTop: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '95%',
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
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  searchIcon: {
    marginLeft: 8,
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
  addButtonIcon: {
    color: COLORS.white,
  },
});

export default Listecoursscreen;