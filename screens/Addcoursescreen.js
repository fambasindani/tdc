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


export default function Addcoursescreen({ navigation, route }) {

    const { refreshList } = route.params;


    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [date, setDate] = useState(new Date());

    // Nouveaux états pour les champs
    const [marque, setMarque] = useState('');
    const [immatricule, setImmatricule] = useState('');
    const [numeroChassie, setNumeroChassie] = useState('');
    const [description, setDescription] = useState('');


     const [data, setData] = useState([]);
     const [datacat, setDatacat] = useState([]);
     const [contenu, setcontenu] = useState('');
     const [proprietaire, setproprietaire] = useState('');
     const [dataitineraire, setdataitineraire] = useState([]);
     const [montant, setmontant] = useState('');  //itineraire
     const [itineraires, setitineraire] = useState('');  
     const [iditin, setiditin] = useState(''); 

    
    useEffect(() => {
        getvehicule();
        getuser();
        getitineraire();
      }, []);


      const handleItineraireSelect = (id) => {
        setitineraire(id);
        const selectedItineraire = dataitineraire.find(itineraire => itineraire.id === id);
        if (selectedItineraire) {
            setmontant(selectedItineraire.montant); // Met à jour l'état avec le montant de l'itinéraire sélectionné
            setiditin(selectedItineraire.iditineraire)
        } else {
            setmontant('');
            setiditin('')
        }
    };


      const getitineraire = async () => {
        try {
         // setcontenu('description')
          const urlget = ApiUrl({ endpoint: 'gettarification' });
          const response = await axios.get(urlget);
         
          //alert(response.data[0].description)
          setdataitineraire(response.data);
        } catch (error) {
          console.error('Erreur lors de la requête à l\'API :', error);
        }
      };
      
      const getvehicule = async () => {
        try {
         // setcontenu('description')
          const urlget = ApiUrl({ endpoint: 'getvehicule' });
          const response = await axios.get(urlget);
         
          //alert(response.data[0].description)
          setDatacat(response.data);
        } catch (error) {
          console.error('Erreur lors de la requête à l\'API :', error);
        }
      };
  
      const getuser = async () => {
          try {
            const urlget = ApiUrl({ endpoint: 'getusermotard' });
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
        setproprietaire('');
        setDescription('');
        setiditin('');
        setmontant('')
    };
    const formatDate = () => {
        const isoString = date.toISOString(); // Ex: "2023-03-04T00:00:00.000Z"
        return isoString.split('T')[0]; // Extrait "2023-03-04"
    };

    const createcourse = async () => {
        const url = ApiUrl({ endpoint: 'create_course' });

        setLoading(true);
    
        setTimeout(async () => {
            try {
                setLoading(false);
                const formData = new FormData();
                formData.append('iduser', proprietaire);
                formData.append('idvehicule', description);
                formData.append('idtarification', iditin);
                formData.append('datecourse', formatDate());
                formData.append('montant', montant);

                if (!proprietaire|| !description || !iditin || montant.trim() === '' ) {
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
                    refreshList()
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


                    <Droplist  icons="user" contenus="nom" identifiant="id" getCategorie={getuser} data={data} setData={setData} description={proprietaire} setDescription={setproprietaire} label="Motard" placephold="Sélectionnez motard"/>
                   
                    <Droplist icons="car" contenus="immatriculation" identifiant="id" getCategorie={getvehicule} data={datacat} setData={setDatacat} description={description} setDescription={setDescription} label="Immatriculation" placephold="Sélectionnez Immatriculation"/>
                    <Droplist icons="map" contenus="description" identifiant="id" getCategorie={getitineraire} data={dataitineraire} setData={setdataitineraire} description={itineraires} setDescription={handleItineraireSelect} label="Itinéraire" placephold="Sélectionnez Itinéraire"/>
                    <Input icons="money" editables={false} label="Montant" placeholder="Votre description" name={montant.toString()} setname={setDescription} />

                         {/*   <Droplist placephold="Sélectionner motard" icons="person" description={description} setDescription={setDescription} label="Motard" />
                        <Droplist placephold="Sélectionner vehicule" icons="directions-car" description={description} setDescription={setDescription} label="Vehicule" />
                        <Droplist placephold="Sélectionner montant" icons="person" description={description} setDescription={setDescription} label="Montant" />
                        <Droplist placephold="Sélectionner itinéraire" icons="map" description={description} setDescription={setDescription} label="Itinéraire" /> */} 
                        <DatePicker date={date} setDate={setDate} label="Date" />
                        
                 



                        <Buttons
                            title='Enregistrer'
                            Actionconnection={ActionConnection}
                            onPress={createcourse}
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