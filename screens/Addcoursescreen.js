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


export default function Addcoursescreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [date, setDate] = useState(new Date());

    // Nouveaux états pour les champs
    const [marque, setMarque] = useState('');
    const [immatricule, setImmatricule] = useState('');
    const [numeroChassie, setNumeroChassie] = useState('');
    const [description, setDescription] = useState('');

    const handleCloseModal = () => {
        setShowSuccessModal(false);
    };

    const resetFields = () => {
        setMarque('');
        setImmatricule('');
        setNumeroChassie('');
    };

    const uploadData = async () => {
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
                <Loading visible={loading} />
                <Message handleCloseModal={handleCloseModal} text={text} showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal} />

                <ScrollView style={styles.scrollview}>
                    <View style={styles.modalContent}>

                        <Droplist placephold="Sélectionner motard" icons="person" description={description} setDescription={setDescription} label="Motard" />
                        <Droplist placephold="Sélectionner vehicule" icons="directions-car" description={description} setDescription={setDescription} label="Vehicule" />
                        <Droplist placephold="Sélectionner montant" icons="person" description={description} setDescription={setDescription} label="Montant" />
                        <Droplist placephold="Sélectionner itinéraire" icons="map" description={description} setDescription={setDescription} label="Itinéraire" />
                        <DatePicker date={date} setDate={setDate} label="Date" />
                        
                 



                        <Buttons
                            title='Enregistrer'
                            Actionconnection={ActionConnection}
                            onPress={uploadData}
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