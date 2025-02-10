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
import DatePicker from '../composant/DatePicker';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Mapscreen2 from './Mapscreen2';
import moment from 'moment';


export default function Historiquescreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [date, setDate] = useState(new Date());
    const [datefin, setDatefin]=useState(new Date())
    const [data, setdata]=useState([])

    // Nouveaux états pour les champs  
    const [marque, setMarque] = useState('');
    const [immatricule, setImmatricule] = useState('');
    const [numeroChassie, setNumeroChassie] = useState('');
    const [description, setDescription] = useState('');
    const [modalVisiblemap, setModalVisiblemap] = useState(false);



   
  const Madate  = (dt) => {

    return dt ? moment(dt).format('YYYY-MM-DD') : null;
  
    }


    const getvehicule = async () => {
        try {
            const urlget = ApiUrl({ endpoint: 'getvehicule' });
            const response = await axios.get(urlget);
            setdata(response.data);
        } catch (error) {
            console.error('Erreur lors de la requête à l\'API :', error);
        }
    };


    useFocusEffect(
        React.useCallback(() => {
            getvehicule();

            return () => {
                // Optionnel : logique de nettoyage si nécessaire
            };
        }, [])
    );



    const handleCloseModal = () => {
        setShowSuccessModal(false);
    };

    const resetFields = () => {
        setMarque('');
        setImmatricule('');
        setNumeroChassie('');
    };

    const Actionrecherhe = async () => {
       // const url = ApiUrl({ endpoint: 'send_vehicle_data' });
           // alert(description)
        setLoading(true);
        setTimeout(async () => {
            try {
                setLoading(false);
               // const formData = new FormData();
               // formData.append('marque', marque);
                //formData.append('immatricule', immatricule);
                //formData.append('numeroChassie', numeroChassie);

                if(!description) {
                    setShowSuccessModal(true);
                    setText("Veuillez sélectionner le motard.");
                    return;
        
                   }
                   else{

                    setModalVisiblemap(true)


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
                <Mapscreen2
            modalVisible={modalVisiblemap}
            setModalVisible={setModalVisiblemap}
           
            
             objectId={description}
             dateinitial={Madate(date)}
             datefinal={Madate(datefin)}
            nom={description}
          />
                <ScrollView style={styles.scrollview}>
                    <View style={styles.modalContent}>
                        {/*     
                        <DatePicker date={date} setDate={setDate} label="Date de début" />
                        <DatePicker date={date} setDate={setDate} label="Date de Fin" />
                        <Droplist placephold="Sélectionner Immatriculation" icons="directions-car" description={description} setDescription={setDescription} label="Immatriculation" />
                         */}
                        <Droplist icons="car" contenus="numero_chassies" identifiant="numero_chassies" getCategorie={getvehicule} data={data} setData={setdata} description={description} setDescription={setDescription} label="Identifiant" placephold="Sélectionnez identifiant" />
                        <DatePicker date={date} setDate={setDate} label="Date de début" />
                        <DatePicker date={datefin} setDate={setDatefin} label="Date de Fin" />


                        <Buttons
                            title='Recherche'
                            Actionconnection={ActionConnection}
                            onPress={Actionrecherhe}
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