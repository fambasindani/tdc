import { View, Image, Text, StyleSheet, Alert, SafeAreaView ,ScrollView, StatusBar, Button} from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../Couleurs/COLORS';

import axios from 'axios'

import Input from '../composant/Inputtext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PasswordInput from '../composant/Password';
import Buttons from '../composant/Bouton';
import Message from '../Message/Boxmessage';
import Loading from '../Message/Loading';
import ApiUrl from '../composant/ApiUrl';
import Boutons from '../composant/Boutons';




export default function Passwordscreen({ navigation }) {
    const [loading, setLoading] = useState(false)
    const [text, setText] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [email, setemail] = useState('');
 
 
 
  









    const handleCloseModal = () => {
        setShowSuccessModal(false);
      };


      const annuler =  () => {

        setemail('')
     
   

      

      }





      const sendEmail = async () => {
      //  alert('ggggggggggg')
        const url = ApiUrl({ endpoint: 'send_email' });
        setLoading(true);
       // setLoading(true);
      
        try {
          // Vérification de l'email avant d'envoyer la requête
          if (email.trim() === '') {
           
            setShowSuccessModal(true);
            setText("Veuillez insérer l'email");
            setLoading(false);
            return; // Sortir de la fonction si l'email est vide
          }
      
          if (!email.match(/\S+@\S+\.\S+/)) {
            setShowSuccessModal(true);
            setText('Email incorrect');
            setLoading(false);
            return; // Sortir de la fonction si l'email est incorrect
          }
      
          // Préparation des données à envoyer
          const formData = new FormData();
          formData.append('email', email);
      
          // Envoi de la requête
          const res = await axios.post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      
          // Actions après la réussite de l'envoi
          annuler();
          setShowSuccessModal(true);
          setText(res.data);
          // navigation.navigate('MonMenu');
      
        } catch (error) {
          console.error('Erreur:', error);
          setShowSuccessModal(true);
          setText('Erreur');
        } finally {
          setLoading(false); // Toujours arrêter le chargement à la fin
        }
      };
  
  const Actionconnection = () => {

    navigation.navigate('Login');
  }


  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="#f0f2f5"/>

    <View style={styles.container} >
      <Loading  visible={loading}/>
    
      <Message 
                handleCloseModal={handleCloseModal} 
                text={text} 
                showSuccessModal={showSuccessModal} 
                setShowSuccessModal={setShowSuccessModal} 
            />
     
     
      <ScrollView style={styles.scrollview}>
       
     


        <Text style={{ color: COLORS.black, fontSize: 25,marginBottom: 20 , fontWeight: 'bold', textAlign:'center' }}>Trouvez votre compte </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginBottom: 20 , textAlign:'center' }}>Entrez votre e-mail</Text>
        <View style={styles.modalContent}>
       
      
       
        <Input icons="envelope" label="Email" placeholder="Votre e-mail" name={email} setname={setemail}/>
       
        <Buttons title='Continuer' Actionconnection={Actionconnection}  onPress={sendEmail} connexion="Retour à login "/> 
    
        
        
        
        
        
        


        
        </View>
      </ScrollView>
    </View>
    </>
  )
}



const styles = StyleSheet.create({

  modalContent: {
    
     flex: 1,
     justifyContent: 'center',
      alignItems: 'center',
    backgroundColor: COLORS.blanccasse,
   // padding: 20,
     
    
  },

    container: {
   
      paddingTop:80,
   
     alignItems: 'center',
     width:'100%',
     height:'100%',
    // backgroundColor:'white'
  
    },
    scrollview: {
    width:'100%'
     // paddingTop:80,

    // alignItems: 'center',
   
    },



    contairebuttona:{
        marginTop:20,
        backgroundColor: COLORS.grey,
         marginBottom: 10,

    },

    contairebuttonen:{
        marginTop:20,
        backgroundColor: COLORS.vert,
        // marginLeft: '30%',

    },
    notificationImage: {
      width: 11, // Ajustez la largeur selon vos besoins
      height: 23, // Ajustez la hauteur selon vos besoins
      padding:-22

   
  },

   
})