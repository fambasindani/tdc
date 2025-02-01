import { View, Text, StyleSheet, StatusBar, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import COLORS from '../Couleurs/COLORS';
import axios from 'axios';
import Input from '../composant/Inputtext';
import Buttons from '../composant/Bouton';
import Message from '../Message/Boxmessage';
import Loading from '../Message/Loading';
import ApiUrl from '../composant/ApiUrl';
import Droplist from '../composant/Droplist';
import DatePicker from '../composant/DatePicker';
import CustomModal from '../composant/CustomModal';
import CheckComposant from './CheckComposant';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import moment from 'moment';


export default function FilterScreen({ navigation}) {
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [date, setDate] = useState(new Date());
    const [datefin, setDatefin] = useState(new Date());

    // Nouveaux états pour les champs  
    const [marque, setMarque] = useState('');
    const [immatricule, setImmatricule] = useState('');
    const [numeroChassie, setNumeroChassie] = useState('');
    const [description, setDescription] = useState('');
    const [data, setdata] = useState([]);

    const [proprietaire, setproprietaire] = useState('');
    const [customvisible, Setustomvisible] = useState(false);



    const [totalChecked, setTotalChecked] = useState(false);
    const [riderChecked, setRiderChecked] = useState(false);
    const [mySumChecked, setMySumChecked] = useState(false);

    const toggleModal = () => {
        Setustomvisible(!customvisible);
    }

    const handleCloseModal = () => {
        setShowSuccessModal(false);
    };

    const resetFields = () => {
        setMarque('');
        setImmatricule('');
        setNumeroChassie('');
    };

    const uploadDatass = async () => {
        toggleModal()
    }

    const getuser = async () => {
        try {
            const urlget = ApiUrl({ endpoint: 'getusermotard' });
            const response = await axios.get(urlget);
            setdata(response.data);
        } catch (error) {
            console.error('Erreur lors de la requête à l\'API :', error);
        }
    };


    useFocusEffect(
        React.useCallback(() => {
            getuser();

            return () => {
                // Optionnel : logique de nettoyage si nécessaire
            };
        }, [])
    );

    const naviger = useNavigation()

    const formatDate = (dateString) => {
        // Convertir la chaîne de date en objet moment  calculate_total_montant
      
        const  date= moment(dateString);
        return date.format('YYYY-MM-DD');
    }

    
  const Madate  = (dt) => {

    return dt ? moment(dt).format('YYYY-MM-DD') : null;
  
    }


    
  const Actionsomme = async () => {
    const url = ApiUrl({ endpoint: 'calculate_total_montant' });
    const formData = new FormData();
    formData.append('dateembarquement', Madate(date));
    formData.append('datearriver', Madate(datefin));
   

    try {
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        setShowSuccessModal(true);
 
        const intervalle =`Du ${formatDate(date)} au ${formatDate(datefin)}` ;
        const Somme = `Somme : ${response.data.total_montant} CDF`
        setText(`${intervalle}\n\n${Somme}`);
        
       // alert(response.data.total_montant);
       // setError(null);
    } catch (err) {
        if (err.response && err.response.data) {
           // setError(err.response.data.error);
        } else {
            //setError('Erreur de connexion');
        }
    }
};




    const uploadData = async() => {
       // let message = '1000';
        if (totalChecked) {
       
            //alert('Vous avez sélectionné Toute somme.');
            await Actionsomme()
        }
     
        
        else if (mySumChecked) {
           if(!proprietaire) {
            setShowSuccessModal(true);
            setText("Veuillez sélectionner le motard.");
            return;

           }
            naviger.navigate('Listefiltre',{ dateDebut: date, dateFins:datefin, Proprietaires:proprietaire });
        } else {
           // alert('Aucune option sélectionnée.') ;
            setShowSuccessModal(true);
            setText('Aucune option sélectionnée.');
         
        }
       // Alert.alert('Sélection', message);
        // <Button title="Valider" onPress={handleSubmit} />
    };

    const uploadDatas = async () => {
        const url = ApiUrl({ endpoint: 'send_vehicle_data' });

        setLoading(true);
        setTimeout(async () => {
            try {
                setLoading(false);
                const formData = new FormData();
                formData.append('marque', marque);
                formData.append('immatricule', immatricule);
                formData.append('numeroChassie', numeroChassie);

                if (marque.trim() === '' || immatricule.trim() === '' || numeroChassie.trim() === '') {
                    setShowSuccessModal(true);
                    setText("Veuillez remplir tous les champs");
                } else {
                    const res = await axios.post(url, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });

                    resetFields();
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
                <CheckComposant totalChecked={totalChecked} setMySumChecked={setMySumChecked} mySumChecked={mySumChecked} setRiderChecked={setRiderChecked} setTotalChecked={setTotalChecked} riderChecked={riderChecked} />
                <Loading visible={loading} />
                <Message handleCloseModal={handleCloseModal} text={text} showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal} />

                <ScrollView style={styles.scrollview}>
                    <View style={styles.modalContent}>
                        <Droplist icons="user" contenus="nom" identifiant="id" getCategorie={getuser} data={data} setData={setdata} description={proprietaire} setDescription={setproprietaire} label="Motard" placephold="Sélectionnez motard" />
                        <DatePicker date={date} setDate={setDate} label="Date de début" />
                        <DatePicker date={datefin} setDate={setDatefin} label="Date de Fin" />
                        {/*   <Droplist placephold="Sélectionner Immatriculation" icons="directions-car" description={description} setDescription={setDescription} label="Vehicule" />
                        <Droplist placephold="Sélectionner motard" icons="person" description={description} setDescription={setDescription} label="Motard" />*/}





                        <Buttons
                            title='Recherche'
                            Actionconnection={ActionConnection}
                            onPress={uploadData}
                        />
                    </View>
                </ScrollView>
                <CustomModal
                    visible={customvisible}
                    onClose={toggleModal}
                    montant={100} // Montant à afficher
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.blanccasse,
    },
    container: {
        // paddingTop: 80,
        // alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    scrollview: {
        width: '100%',
    },
});