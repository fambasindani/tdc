import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Messagebox from '../composant/Messagebox';
import Listevehicule from '../composant/Listevehicule'; // Assurez-vous que ce chemin est correct
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import COLORS from '../Couleurs/COLORS'; // Assurez-vous que ce chemin est correct
import Listecours from '../composant/Listecours';
import axios from 'axios';
import ApiUrl from '../composant/ApiUrl';
import ModalPopup from '../composant/ModalPopup';
import ApiUrlbis from '../composant/ApiUrlbis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Message from '../Message/Boxmessage';

const Listecoursscreen = () => {
  const naviger = useNavigation();
  const [userData, setUserData] = useState([]);
  const [Loading, SetLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [message, Setmessage] = useState('');
  const [modalVisible, SetmodalVisible] = useState(false);
  const [selected, Setselected] = useState(null);




  const [Visible, setVisible] = useState(false);
  const [phone, setphone] = useState(null);
  const [email, setemail] = useState(null);
  const [nom, setnom] = useState(null);
  const [prenom, setprenom] = useState(null);
  const [confirmation, setconfirmation] = useState('');
  const [monimage, setmonimage] = useState();
  const [marque, setmarque] = useState();




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

  useEffect(() => {
    retrieveRole();
  }, []);



  const urlimg = ApiUrlbis({ endpoint: '' });
  //const url = ApiUrl({ endpoint: 'getvehicule' });






  const toggleModal = () => {
    setVisible(!Visible);
  };
  const handdetails = (item) => {
    // Logique d'édition ici
    console.log('Confirmé');

    setphone("Itin. : " + item.description)
    setemail(item.montant + " CDF")
    setnom(item.nom)
    setprenom(item.prenom)
    setmarque(item.marque)
    //setmarque(item.nom)
    setmonimage(`${urlimg}${item.avatar}`);
    // Alert.alert(urlimg+item.avatar)
    toggleModal();
  };


  const url = ApiUrl({ endpoint: 'getcourses' });



  const additin = () => {
    naviger.navigate("Addcours", { refreshList });
  };

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
      const newData = response.data; // Utiliser les données des courses
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
    return item.nom.toLowerCase().includes(searchText.toLowerCase());
  });

  const clearSearch = () => {
    setSearchText('');
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };



  const handleCancel = () => {
    SetmodalVisible(false);
  };

  const handDelete = (item) => {
    setShowSuccessModal(true);
    SetmodalVisible(true);
    Setselected(item);
    Setmessage(`Voulez-vous supprimer ${item.nom} ?`);
  };


  const handleConfirms = async () => {
    SetmodalVisible(false);
    const item = selected
    //setshowSuccesspopModal(true);
    //settext(item.id);
     await delecourse(item)

    //alert(item.id)


    // Ici, tu peux ajouter la logique de confirmation
  };



  const delecourse = async (item) => {
    const urldelete = ApiUrl({ endpoint: 'delete_course/' });


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









  const handleupdate = (item) => {
    naviger.navigate('Updatecours', { items: item, refreshList });
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

          <Message
            handleCloseModal={closeSuccessModal}
            text={text}
            showSuccessModal={showSuccesspopModal}
            setShowSuccessModal={setshowSuccesspopModal}
          />

          <Listecours
            mydata={filteredData}
            handDelete={handDelete}
            handleupdate={handleupdate}
            Loading={Loading}
            handdetails={handdetails}
          />
          <ModalPopup marque={marque} monimage={monimage} setmonimage={setmonimage} nom={nom} prenom={prenom} phone={phone} email={email} modalVisible={Visible} setModalVisible={setVisible} toggleModal={toggleModal} />

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
    marginTop: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 20,
    borderBottomWidth: 0.4,
    borderBottomColor: COLORS.grey,
    height: 40,
    width: '95%',
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
    borderRadius: 50,
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