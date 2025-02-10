import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import React, { useState } from 'react';
import COLORS from '../Couleurs/COLORS';
import axios from 'axios';
import Input from '../composant/Inputtext';
import Buttons from '../composant/Bouton';
import Message from '../Message/Boxmessage';
import Loading from '../Message/Loading';
import ApiUrl from '../composant/ApiUrl';
import Droplist from '../composant/Droplist';
import { useEffect } from 'react';


export default function Addvehiculescreen({ navigation, route }) {
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    
    // Nouveaux états pour les champs
    const [marque, setMarque] = useState('');
    const [immatricule, setImmatricule] = useState('');
    const [numeroChassie, setNumeroChassie] = useState('');
    const [description, setDescription] = useState('');
    const [data, setData] = useState([]);
    const [datacat, setDatacat] = useState([]);
    const [contenu, setcontenu] = useState('');
    const [proprietaire, setproprietaire] = useState('');


    const { refreshList } = route.params;



    useEffect(() => {
      getCategorie();
      getuser();
    }, []);
    
    const getCategorie = async () => {
      try {
       // setcontenu('description')
        const urlget = ApiUrl({ endpoint: 'getcategorie' });
        const response = await axios.get(urlget);
       
        //alert(response.data[0].description)
        setDatacat(response.data);
      } catch (error) {
        console.error('Erreur lors de la requête à l\'API :', error);
      }
    };

    const getuser = async () => {
        try {
          const urlget = ApiUrl({ endpoint: 'get_client' });
          const response = await axios.get(urlget);
          setData(response.data);
        } catch (error) {
          console.error('Erreur lors de la requête à l\'API :', error);
        }
      };







  

    const handleCloseModal = () => {
        setShowSuccessModal(false);
    };

    const resetFields = () => {
        setMarque('');
        setImmatricule('');
        setNumeroChassie('');
        setDescription('')
        setproprietaire('')
    };



    const createvehicule = async () => {
        const url = ApiUrl({ endpoint: 'create_vehicule' });

        setLoading(true);
        setTimeout(async () => {
            try {
                setLoading(false);
                const formData = new FormData();
                formData.append('marque', marque);
                formData.append('immatriculation', immatricule);
                formData.append('num_chassies', numeroChassie);
                formData.append('idcat', description);  //iduser
                formData.append('iduser', proprietaire); 
                
               

                if (!description || !proprietaire || marque.trim() === '' || immatricule.trim() === '' || numeroChassie.trim() === '') {
                    setShowSuccessModal(true);
                    setText("Veuillez remplir tous les champs");
                } else {
                    const res = await axios.post(url, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });

                    resetFields();
                    refreshList()
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

                    <Droplist icons="pencil" contenus="description" identifiant="id" getCategorie={getCategorie} data={datacat} setData={setDatacat} description={description} setDescription={setDescription} label="Catégorie" placephold="Sélectionnez catégorie"/>
                    <Droplist  icons="user" contenus="nom" identifiant="id" getCategorie={getuser} data={data} setData={setData} description={proprietaire} setDescription={setproprietaire} label="Client" placephold="Sélectionnez client"/>
      
                        <Input 
                            icons="car" 
                            label="Marque" 
                            placeholder="Marque" 
                            name={marque} 
                            setname={setMarque} 
                        />
                        <Input 
                            icons="id-card" 
                            label="Immatricule" 
                            placeholder="Immatricule" 
                            name={immatricule} 
                            setname={setImmatricule} 
                        />
                        <Input 
                            icons="key" 
                            label="Identifiant" 
                            placeholder="Identifiant" 
                            name={numeroChassie} 
                            setname={setNumeroChassie} 
                        />
                        <Buttons 
                            title='Ajouter' 
                            Actionconnection={ActionConnection} 
                            onPress={createvehicule}  
                            
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