import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Platform } from 'react-native';
import COLORS from '../Couleurs/COLORS';
import Icon from 'react-native-vector-icons/FontAwesome';
import Messagebox from '../composant/Messagebox';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Listearret from '../composant/Listearret';


const Listearretscreen = ({ navigation }) => {
  const naviger = useNavigation();
  const [userData, setUserData] = useState([]);
  const [Loading, SetLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [message, Setmessage] = useState('');
  const [modalVisible, SetmodalVisible] = useState(false);
  const [selected, Setselected] = useState(null);

  // Remplace vehiculeItineraire par vehiculeArret
  const vehiculeArret = [
    { id: 1, arret: 'KINTAMBO MAGASIN' },
    { id: 2, arret: 'FULU' },
    { id: 3, arret: 'MASANGA' },
    { id: 4, arret: 'MBILA' },
    { id: 5, arret: 'CITE VERTE' }
  ];

  const additin = async () => {
    naviger.navigate("Addarret");
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    SetLoading(true);
    try {
      const newData = vehiculeArret; // Utiliser les arrêts de véhicule
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
    return item.arret.toLowerCase().includes(searchText.toLowerCase());
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
    Setmessage(`Voulez-vous supprimer ${item.arret} ?`);
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

          <Listearret
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

export default Listearretscreen;