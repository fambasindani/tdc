import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import React, { useState } from 'react';
import COLORS from '../Couleurs/COLORS';
import axios from 'axios';
import Input from '../composant/Inputtext';
import Buttons from '../composant/Bouton';
import Message from '../Message/Boxmessage';
import Loading from '../Message/Loading';
import ApiUrl from '../composant/ApiUrl';

export default function Additinerairesreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [description, setDescription] = useState('');

    const handleCloseModal = () => {
        setShowSuccessModal(false);
    };

    const resetDescription = () => {
        setDescription('');
    };

    const uploadDescription = async () => {
        const url = ApiUrl({ endpoint: 'send_description' });

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
                    const res = await axios.post(url, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });

                    resetDescription();
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
                        <Input icons="pencil" label="Description" placeholder="Votre description" name={description} setname={setDescription} />
                        <Buttons title='Enregistrer' Actionconnection={ActionConnection} onPress={uploadDescription}  />
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