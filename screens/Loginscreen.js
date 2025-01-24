import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import COLORS from '../Couleurs/COLORS';
import axios from 'axios';
import Input from '../composant/Inputtext';
import PasswordInput from '../composant/Password';
import Boutons from '../composant/Boutons';
import Message from '../Message/Boxmessage';
import Loading from '../Message/Loading';
import ApiUrl from '../composant/ApiUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StatusBar } from 'expo-status-bar';

export default function Loginscreen({ navigation,setIsLoggedIn  }) {
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');   
    const [iduser, setiduser] = useState('');


    

    // <Localisation  iduser={iduser}   />
    const handleCloseModal = () => {
        setShowSuccessModal(false);
    };

    const annuler = () => {
        setEmail('');
        setPassword('');
    };


    //

    const Actionlogins = async () => {
        navigation.navigate('Test');

    }






    const Actionlogin = async () => {
        const url = ApiUrl({ endpoint: 'login' });
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            if (email.trim() === '') {
                setShowSuccessModal(true);
                setText("Veuillez inserer l'email");
                setLoading(false);
                return;
            } else if (!email.match(/\S+@\S+\.\S+/)) {
                setShowSuccessModal(true);
                setText('Email incorrect');
                setLoading(false);
                return;
            } else if (password.trim() === '') {
                setShowSuccessModal(true);
                setText('Veuillez saisir le Password');
                setLoading(false);
                return;
            }

            const res = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.data === "password") {
                setShowSuccessModal(true);
                setText("Password ou Email incorrect");
            } else {
                 const id = res.data.user.id.toString();
                 const role = res.data.user.role.toString();
                //const role = res.data.user.role.toString();
                //const name = res.data.user.nom.toString();
                await AsyncStorage.setItem('key', id);
                await AsyncStorage.setItem('monid', id);
                await AsyncStorage.setItem('role', role);
              
                setiduser(id)
                navigation.navigate('Test');
                //alert(res.data.user.role)
               
               
            }
        } catch (error) {
            console.error('Erreur:', error);
            setShowSuccessModal(true);
            setText(error);
        } finally {
            setLoading(false);
        }
    };

    const Actionpassword = () => {
        navigation.navigate('Passwordscreen');
    };

    const Actioninscription = () => {
        navigation.navigate('Inscription');
    };

    return (
        <>
    <StatusBar barStyle="dark-content" backgroundColor="#f0f2f5"/>
        <View style={styles.container}>
            <Loading visible={loading} />
            <Message 
                handleCloseModal={handleCloseModal} 
                text={text} 
                showSuccessModal={showSuccessModal} 
                setShowSuccessModal={setShowSuccessModal} 
            />
            <ScrollView style={styles.scrollview}>
                <Image 
                    source={require('../assets/Likunzi.png')} 
                    style={styles.notificationImage} 
                />
     
                
                <View style={styles.modalContent}>
                    <Input icons="envelope" label="Email" placeholder="Votre e-mail" name={email} setname={setEmail} />
                    <PasswordInput password={password} setPassword={setPassword} label="Password" />
                    <Boutons title='Se connecter' onPress={Actionlogin} Actionpassword={Actionpassword} Actioninscription={Actioninscription} />
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
        paddingTop:30,
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    scrollview: {
        width: '100%',
    },
    notificationImage: {
        width: 79, // Ajustez la largeur selon vos besoins
        height: 99, // Ajustez la hauteur selon vos besoins
        alignSelf: 'center', // Centre l'image horizontalement
        marginBottom: 20, // Ajoute un peu d'espace sous l'image
    },
});