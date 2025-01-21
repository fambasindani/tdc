import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Messagebox from '../composant/Messagebox';
import Listevehicule from '../composant/Listevehicule'; // Assurez-vous que ce chemin est correct
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import COLORS from '../Couleurs/COLORS'; // Assurez-vous que ce chemin est correct
import Listecours from '../composant/Listecours';
import Listevalider from '../composant/Listevalider';
import axios from 'axios';
import ApiUrl from '../composant/ApiUrl';
import moment from 'moment'
import Message from '../Message/Boxmessage';
import Loading from '../Message/Loading';

const Listevaliderscreen = () => {
  const naviger = useNavigation();
  const [userData, setUserData] = useState([]);
  const [Loadings, SetLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [message, Setmessage] = useState('');
  const [modalVisible, SetmodalVisible] = useState(false);
  const [selected, Setselected] = useState(null);
  const [compter, setcompter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');//setvoirModal
  const [SuccessModal, setSuccessModal] = useState(false);
  const [voirModal, setvoirModal] = useState(false);
  const [VisibleModal, setVisibleModal] = useState(false);
  const [showSuccessModalArriver, setShowSuccessModalArriver] = useState(false);
  const [modalVisibleArriver, SetmodalVisibleArriver] = useState(false);
  const [courseid, setcourseid] = useState('');


  const gettdate = () => {
    return moment().format('YYYY-MM-DD HH:mm:ss')

  }

  
  const gettdates = () => {
    return moment().format('YYYY-MM-DD')

  }
  
  

  


  const CloseModal = () => {
    setSuccessModal(false);
  };


  const url = ApiUrl({ endpoint: 'getcourseid/' });


  const additin = () => {
    naviger.navigate("Addcours");
  };

 
 
 

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();

      return () => {
        // Optionnel : logique de nettoyage si nécessaire
      };
    }, [])
  );

  const fetchUserData = async () => {
    SetLoading(true);
    try {
      const response = await axios.get(`${url}${gettdates()}`, {
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

  const FermerModal = () => {
    setvoirModal(false);
  };





  const embarquer = (item) => {

    setShowSuccessModal(true);
    SetmodalVisible(true);
    Setselected(item);
    Setmessage(`êtes-vous sûr de vouloir embarquer la moto de  ${item.nom} ?`);
  };

  const createembarquement = async (item) => {
    //alert(gettdate())
    const url = ApiUrl({ endpoint: 'embarquement' });
    setLoading(true);
    setTimeout(async () => {
      try {
        setLoading(false);
        const formData = new FormData();
        formData.append('dateembarquement', gettdate());
        formData.append('idcourse', item.id);
        formData.append('iduser', item.iduser);

        // if (description.trim() === '') {
        // setShowSuccessModal(true);
        // setText("Veuillez insérer une description");
        // } else {

        const res = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        // alert(res.data)
        // refreshList()
        // resetDescription();
        setSuccessModal(true);
        setText(res.data);
        // }
      } catch (error) {
        console.error('Erreur:', error);
        setSuccessModal(true);
        setText('Erreur');
      }
    }, 3000);


  }

  const actionembarquement = async () => {
    // alert(getcurrentdate())

    // SetmodalVisible(false);
    SetmodalVisible(false)
    const item = selected
    await createembarquement(item)
    // Ici, tu peux ajouter la logique de confirmation

  };



  const depart = (item) => {
    setvoirModal(true);
    setVisibleModal(true);
    Setselected(item);
    Setmessage(`êtes-vous sûr de depart de la moto de  ${item.nom} ?`);
  };

  const createdepart = async (item) => {
    const url = ApiUrl({ endpoint: 'depart' });
    setLoading(true);
    setTimeout(async () => {
      try {
        setLoading(false);
        const formData = new FormData();
        formData.append('datedepart', gettdate());
        formData.append('idcourse', item.id);
       // formData.append('iduser', item.iduser);

    

        const res = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
     
      
        setSuccessModal(true);
        setText(res.data);
        // }
      } catch (error) {
        console.error('Erreur:', error);
        setSuccessModal(true);
        setText('Erreur');
      }
    }, 3000);


  }




  


  const actiondepart = async () => {
    // alert(getcurrentdate())

    //SetmodalVisible(false);
    setVisibleModal(false)
    const item = selected
    await createdepart(item)
    // Ici, tu peux ajouter la logique de confirmation  comptertour

  };
  const Fermer = () => {
    setVisibleModal(false);
  };

  


  
  
  const arriver = (item) => {
    setShowSuccessModalArriver(true);
    SetmodalVisibleArriver(true);
    //setVisibleModal(true);
    Setselected(item);
    Setmessage(`êtes-vous sûr de l'arriver de la moto de  ${item.nom} ?`);
  };

  const createarriver = async (item) => {
     const url = ApiUrl({ endpoint: 'arriver' });
    setLoading(true);
    setTimeout(async () => {
      try {
        setLoading(false);
        const formData = new FormData();
        formData.append('datearriver', gettdate());
        formData.append('idcourse', item.id);
       // formData.append('iduser', item.iduser);

    

        const res = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        //comptertour();
        fetchUserData();
      
        setSuccessModal(true);
        setText(res.data);
        // }
      } catch (error) {
        console.error('Erreur:', error);
        setSuccessModal(true);
        setText('Erreur');
      }
    }, 3000);


  }

  const actionarriver = async () => {
    

    SetmodalVisibleArriver(false);
    //setVisibleModal(false)
    const item = selected
    await createarriver(item)
    // Ici, tu peux ajouter la logique de confirmation

  };
  const Annuler = () => {
    SetmodalVisibleArriver(false);
  };
  const FermerModalArriver = () => {
    setShowSuccessModalArriver(false);
  };









  const handleCancel = () => {
    SetmodalVisible(false);
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


          </View>
          <Loading visible={loading} />
          <Message handleCloseModal={CloseModal} text={text} showSuccessModal={SuccessModal} setShowSuccessModal={setSuccessModal} />

          <Messagebox
            message={message}
            handleConfirm={actionembarquement}
            handleCancel={handleCancel}
            modalVisible={modalVisible}
            handleCloseModal={handleCloseModal}
            showSuccessModal={showSuccessModal}
            setShowSuccessModal={setShowSuccessModal}
          />
          <Messagebox
            message={message}
            handleConfirm={actiondepart}
            handleCancel={Fermer}
            modalVisible={VisibleModal}
            handleCloseModal={FermerModal}
            showSuccessModal={showSuccessModal}
            setShowSuccessModal={setvoirModal}
          />

          <Messagebox
            message={message}
            handleConfirm={actionarriver}
            handleCancel={Annuler}
            modalVisible={modalVisibleArriver}
            handleCloseModal={FermerModalArriver}
            showSuccessModal={showSuccessModal}
            setShowSuccessModal={setShowSuccessModalArriver}
          />


          <Loading visible={loading} />

          <Listevalider
            mydata={filteredData}
            embarquer={embarquer}
            depart={depart}
            arriver={arriver}
          
            Loading={Loadings}
          
           
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

export default Listevaliderscreen;