import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import COLORS from '../Couleurs/COLORS';
import axios from 'axios';
import Input from '../composant/Inputtext';
import Buttons from '../composant/Bouton';
import Message from '../Message/Boxmessage';
import Loading from '../Message/Loading';
import ApiUrl from '../composant/ApiUrl';
import Droplist from '../composant/Droplist';
import DatePicker from '../composant/DatePicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';


export default function Justificationscreen({ navigation, route }) {
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [date, setDate] = useState(new Date());

    // Nouveaux états pour les champs 
    const [marque, setMarque] = useState('');
    const [immatricule, setImmatricule] = useState('');
    const [numeroChassie, setNumeroChassie] = useState('');
    const [description, setDescription] = useState('');
    const [Just, SetJust] = useState([]);
    const [datadescription, setdatadescription] = useState();


    const { refreshList } = route.params;

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












   const formatDate = (madate) => {
        return moment(madate).format('YYYY-MM-DD HH:mm:ss');
    };  
       
// Vos fonctions d'écran
const [monid, setmonid] = useState('');

const retrieveuser = async () => {
  try {
    const iduser = await AsyncStorage.getItem('monid');
    
    if (iduser) {
        setmonid(iduser);
    
    }
  } catch (e) {
    console.error('Erreur lors de la récupération du rôle:', e);
  }
};

useEffect(() => {
  retrieveuser();
  retrieveRole();
}, []);


    const handleCloseModal = () => {
        setShowSuccessModal(false);
    };

    const resetFields = () => {
        setMarque('');
        setImmatricule('');
        setNumeroChassie('');
    };

    
    useEffect(() => {
        getjustification();
    }, []);


    const getjustification = async () => {
        try {
         // setcontenu('description')getjustificationid
       
           
         
          const urlget = ApiUrl({ endpoint: 'gettypejust' });
          const response = await axios.get(urlget);
          setdatadescription(response.data[0].idtype)
          SetJust(response.data);
        } catch (error) {
          console.error('Erreur lors de la requête à l\'API :', error);
        }
      };

    const createjustification = async () => {
        
       // alert(datadescription)
        const url = ApiUrl({ endpoint: 'create_justification' });
   // alert(formatDate(date)+"   "+monid+"  "+description)
        setLoading(true);
        setTimeout(async () => {
            try {
                setLoading(false);
                const formData = new FormData();
                formData.append('iduser', monid);
                formData.append('datej', formatDate(date));
                formData.append('idj', description);

                if (!description)  {
                    setShowSuccessModal(true);

                    setText("Veuillez sélectionner la justification");
                } else {
                    const res = await axios.post(url, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    //alert('gggggggggggg')

                    refreshList();
                    setShowSuccessModal(true);
                    setText(res.data);
                }
            } catch (error) {
                console.error('Erreur:', error);
                setShowSuccessModal(true);
                setText('Erreur');
            }
        }, 5000);
    };

    const ActionConnection = () => {
        navigation.navigate('Login');
    };

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#0e79b6" />

            <View style={styles.container}>
                <Loading visible={loading} />
                <Message handleCloseModal={handleCloseModal} text={text} showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal} />

                <ScrollView style={styles.scrollview}>
                    <View style={styles.modalContent}>
                        

                        <Droplist  icons="user" contenus="description" identifiant="id" getCategorie={getjustification} data={Just} setData={SetJust} description={description} setDescription={setDescription} label="Justification" placephold="Sélectionner Justification"/>
                   




                        <Buttons
                            title='Enregistrer'
                            Actionconnection={ActionConnection}
                            onPress={createjustification}
                        />
                    </View>
                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.blanccasse,
    },
    container: {
        paddingTop: 80,
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    scrollview: {
        width: '100%',
    },
});