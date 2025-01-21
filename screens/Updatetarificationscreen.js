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


export default function Updatetarificationscreen({ navigation, route }) {
    const { refreshList, items } = route.params;
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    
    // Nouveaux états pour les champs
    const [montant, setmontant] = useState(items.montant);
    const [data, setData] = useState([]);
    const [datacat, setDatacat] = useState([]);
    const [contenu, setcontenu] = useState('');
    const [description, setDescription] = useState(items.iditineraire);
    const [idtarif, setidtarif] = useState(items.id);
  


   



    useEffect(() => {
        getitineraire();
     // getuser();
    }, []);
    
   

    const getitineraire = async () => {
        try {
          const urlget = ApiUrl({ endpoint: 'getitineraire' });
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
       
        setmontant('');
        setDescription('')
       // setproprietaire('')
    };



    const updatetarif = async () => {
        const url = ApiUrl({ endpoint: 'update_tarification' });

        setLoading(true);
        setTimeout(async () => {
            try {
                setLoading(false);
                const formData = new FormData();
             
                formData.append('iditineraire', description);  //iduser
                formData.append('montant', montant); 
                
               

                if (!description ||montant.trim() === '') {
                    setShowSuccessModal(true);
                    setText("Veuillez remplir tous les champs");
                } else {
                    const res = await axios.put(`${url}/${idtarif}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });

                    resetFields();
                    refreshList()
                   //setShowSuccessModal(true);
                   // setText(res.data);
                   navigation.goBack()
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

                
                    <Droplist  icons="pencil" contenus="description" identifiant="id" getCategorie={getitineraire} data={data} setData={setData} description={description} setDescription={setDescription} label="Itinéraire" placephold="Sélectionnez itinéraire"/>
      
                        <Input 
                            icons="money" 
                            label="Monatant" 
                            placeholder="Monatant" 
                            name={montant} 
                            setname={setmontant} 
                            numerique="numeric"
                        />

                    
                  
                        <Buttons 
                            title='Modifier' 
                            Actionconnection={ActionConnection} 
                            onPress={updatetarif}  
                            
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