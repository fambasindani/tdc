import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Messagebox from '../composant/Messagebox';
import Listevehicule from '../composant/Listevehicule'; // Assurez-vous que ce chemin est correct
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import COLORS from '../Couleurs/COLORS'; // Assurez-vous que ce chemin est correct

import axios from 'axios';
import ApiUrl from '../composant/ApiUrl';
import ModalPopup from '../composant/ModalPopup';
import ApiUrlbis from '../composant/ApiUrlbis';
import Listefiltrer from '../composant/Listefiltrer';
import FilterScreen from './FilterScreen';
import moment from 'moment';
import CustomModal from '../composant/CustomModal';

const Listefiltrerscreen = ({route}) => {
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
  const [datedebut, setdatedebut] = useState();
  const [customvisible, Setustomvisible] = useState(false);
  const [Somme, setSomme] = useState('');
  const [Sommecdf, setSommecdf] = useState('');

  const { dateDebut, dateFins, Proprietaires } = route.params;

const proprietaires=Proprietaires

const toggleModal = () => {
  Setustomvisible(!customvisible);
}


  const Madate  = (dt) => {

  return dt ? moment(dt).format('YYYY-MM-DD') : null;

  }

  const urlimg = ApiUrlbis({ endpoint: '' });
  //const url = ApiUrl({ endpoint: 'getvehicule' });


 



  const togglepop = () => {
    setVisible(!Visible);
  };






  const handdetails = async () => {
    const url = ApiUrl({ endpoint: 'calculate_minutes' });
    const formData = new FormData();
    formData.append('dateembarquement', Madate(dateDebut));
    formData.append('datearriver', Madate(dateFins));
    formData.append('iduser', proprietaires);

    try {
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        setSomme(response.data.total_minutes)
        setSommecdf(response.data.total_montant)
        toggleModal()
       // alert(response.data.total_minutes);
       // setError(null);
    } catch (err) {
        if (err.response && err.response.data) {
           // setError(err.response.data.error);
        } else {
            //setError('Erreur de connexion');
        }
    }
};






  
  const handdetailss  = (item) => {
    // Logique d'édition ici
    console.log('Confirmé');
    
      setphone("imma : "+item.immatriculation)
      setemail(item.montant +" CDF")
      setnom(item.nom)
      setprenom(item.prenom)
      setmarque(item.marque)
      //setmarque(item.nom)
      setmonimage(`${urlimg}${item.avatar}`);
     // Alert.alert(urlimg+item.avatar)
    //toggleModal();
  };


  const url = ApiUrl({ endpoint: 'getversement' });

  

  const additin = () => {
    naviger.navigate("Addcours", {refreshList});
  };

  useEffect(() => {
   // alert(Madate(dateDebut))
    //alert(proprietaires)
   // Madate(dateFins)
    fetchUserData();
  }, []);

 // const refreshList = () => {
    //fetchUserData(); // Mettre à jour la liste
  
//};
const fetchUserData = async () => {
  SetLoading(true);
  try {
      // Créer une instance de FormData
      const formData = new FormData();

      // Ajouter les données à formData
      formData.append('iduser', proprietaires);  // ID de l'utilisateur
      formData.append('datearriverdebut', Madate(dateDebut)); 
      formData.append('datearriverfin', Madate(dateFins));

      // Envoyer une requête POST avec axios
      const response = await axios.post(url, formData, {
          headers: {
              'Content-Type': 'multipart/form-data', // Utilisez ce type pour FormData
          },
      });

      const newData = response.data; 
      console.log(newData); // Utiliser les données des courses
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
             {/*  <TouchableOpacity style={styles.addButton} onPress={additin}>
           <Icon name="plus" size={20} style={styles.addButtonIcon} />
            </TouchableOpacity> */} 
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

          <Listefiltrer
            mydata={filteredData}
            handDelete={handDelete}
            handleupdate={handleupdate}
            Loading={Loading}
            handdetails={handdetails}
          />
           
           <ModalPopup marque={marque} monimage={monimage} setmonimage={setmonimage} nom={nom} prenom={prenom} phone={phone} email={email} modalVisible={Visible} setModalVisible={setVisible} toggleModal={toggleModal} />
           <CustomModal
                    visible={customvisible}
                    onClose={toggleModal}
                    montant={Somme} // Montant à afficher
                    Resultat="Résultat"
                    somme={Sommecdf}

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

export default Listefiltrerscreen;