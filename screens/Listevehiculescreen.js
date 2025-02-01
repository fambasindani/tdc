import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import COLORS from '../Couleurs/COLORS';
import Icon from 'react-native-vector-icons/FontAwesome';
import Messagebox from '../composant/Messagebox';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Listearret from '../composant/Listearret';
import Listevehicule from '../composant/Listevehicule';
import axios from 'axios';
import ApiUrl from '../composant/ApiUrl';
import ModalPopup from '../composant/ModalPopup';
import ApiUrlbis from '../composant/ApiUrlbis';
import Message from '../Message/Boxmessage';

const Listevehiculescreen = ({ navigation }) => {
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
//const [isModalVisible, setisModalVisible] = useState(false);




  const urlimg = ApiUrlbis({ endpoint: '' });
  const url = ApiUrl({ endpoint: 'getvehicule' });


  const additin = () => {
    //naviger.navigate("Addvehicule");
    naviger.navigate('Addvehicule', { refreshList })
  };



  const toggleModal = () => {
    setVisible(!Visible);
  };
  const handdetails = (item) => {
    // Logique d'édition ici
    console.log('Confirmé');

    setphone(item.telephone)
    setemail(item.email)
    setnom(item.nom)
    setprenom(item.prenom)
    setmarque(item.marque)
    setmonimage(`${urlimg}${item.avatar}`);
    // Alert.alert(urlimg+item.avatar)
    toggleModal();
  };

  const refreshList = () => {
    fetchUserData(); // Mettre à jour la liste
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    SetLoading(true);
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const newData = response.data; // Utiliser les données des véhicules
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

  const handleConfirms = async () => {
    SetmodalVisible(false);
    const item = selected
    await delevehicule(item)
   
    //alert(item.id)


    // Ici, tu peux ajouter la logique de confirmation
  };



  const delevehicule = async (item) => {
    const urldelete = ApiUrl({ endpoint: 'delete_vehicule/' });


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
    naviger.navigate('Updatevehicule', { items: item, refreshList });
    //alert('update')
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


          <Listevehicule
            mydata={filteredData}
            handDelete={handDelete}
            handupdates={handupdate}
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
  addButtonIcon: {
    color: COLORS.white,
  },
  headerContainer: {
    marginTop: 70,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '95%',
    borderBottomWidth: 0.4,
    borderBottomColor: COLORS.grey,
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
    color: '#525659',
  },
  searchIcon: {
    marginLeft: 8,
  },
});

export default Listevehiculescreen;