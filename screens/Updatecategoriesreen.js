import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import React, { useState } from 'react';
import COLORS from '../Couleurs/COLORS';
import axios from 'axios';
import Input from '../composant/Inputtext';
import Buttons from '../composant/Bouton';
import Message from '../Message/Boxmessage';
import Loading from '../Message/Loading';
import ApiUrl from '../composant/ApiUrl';

export default function Updatecategoriesreen({  navigation, route }) {
    const { refreshList, items } = route.params;
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [description, setDescription] = useState(items.description);
    const [idcat, setidcat] = useState(items.id);






    const handleCloseModal = () => {
        setShowSuccessModal(false);
    };

    const resetDescription = () => {
        setDescription('');
    };

    const updatecategorie = async () => {
        const url = ApiUrl({ endpoint: 'update_categorie' });

        setLoading(true);
        setTimeout(async () => {
            try {
                setLoading(false);
                const formData = new FormData();
                formData.append('description', description);

                if (description.trim() === '') {
                    setShowSuccessModal(true);
                    setText("Veuillez insérer une description");
                } else {
                    const res = await axios.put(`${url}/${idcat}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });

                    resetDescription();
                    //setShowSuccessModal(true);
                   // setText(res.data);
                    refreshList(); // Appeler la fonction pour rafraîchir la liste
                   navigation.goBack(); // Retourner au composant Vehicule
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
                        <Input icons="pencil" label="Description" placeholder="Votre description" name={description} setname={setDescription} />
                        <Buttons title='Modifier' Actionconnection={ActionConnection} onPress={updatecategorie}  />
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