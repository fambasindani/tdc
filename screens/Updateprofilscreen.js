import { View, Image, Text, StyleSheet, Alert, SafeAreaView ,ScrollView, StatusBar, Button} from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../Couleurs/COLORS';

import axios from 'axios'

import Input from '../composant/Inputtext';

import PasswordInput from '../composant/Password';
import Buttons from '../composant/Bouton';
import Message from '../Message/Boxmessage';
import Loading from '../Message/Loading';
import ApiUrl from '../composant/ApiUrl';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Textareainput from '../composant/Textareainput';











export default function Updateprofilscreen({ navigation}) {
    const [loading, setloading] = useState(false)
    const [text, settext] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [prenom, setprenom] = useState('');
    const [password, setPassword] = useState('');
    const [nom, setnom] = useState('');
   // const [postnom, setpostnom] = useState('');
    //const [prenom, setprenom] = useState('');
    const [pseudo, setpseudo] = useState('');
    const [phone, setphone] = useState('');
    const [email, setemail] = useState(null);
    const [urlimage, seturlimage] =  useState(null);
    const [adresse, setadresse] =  useState(null);
    const [userid, setuserid]=useState('')
    const [name, setname]=useState('ngoma')

    const route = useRoute();
    const { userData,updateUserData  } = route.params;


  



  useEffect(() => {
    const userdata = userData
   // setuserid(items.id.toString())
    setnom(userdata.nom)
 
    setprenom(userdata.prenom)
    setphone(userdata.telephone)
    setadresse(userdata.adresse)
    setuserid(userdata.id.toString());
    setemail(userdata.email)


  }, []);


  


   






    const handleCloseModal = () => {
        setShowSuccessModal(false);
      };


      const annuler =  () => {

        setprenom('')
        setPassword('')
        setnom('')
        setadresse('')
        setphone('')

      

      }






  const updateuser = async () => {
 
    const url = ApiUrl({ endpoint: 'update_user' });

    setloading(true)
    setTimeout(async () => {
    try {
      // const varemail = ''
      setloading(false)
      const formData = new FormData();

      formData.append('nom', nom);
   
      formData.append('password', password);

      formData.append('prenom', prenom);
      //formData.append('pseudo', pseudo);
      formData.append('telephone', phone);
      formData.append('adresse', adresse);



      if (nom.trim() === '') {
        setShowSuccessModal(true);
        settext('Veuillez saisir le nom')
      }
      
      if (prenom.trim() === '') {
        setShowSuccessModal(true);
        settext('Veuillez saisir le prénom')
      }
   
  

      else if (password.trim() === '') {
        setShowSuccessModal(true);
        settext('Veuillez saisir le Password')
      }

      else if (phone.trim() === '') {
        setShowSuccessModal(true);
        settext('Veuillez saisir le numéro téléphone')
      }
      else if (adresse.trim() === '') {
        setShowSuccessModal(true);
        settext("Veuillez saisir l'adresse")
      }
      else {
        const url = ApiUrl({ endpoint: 'update_user' });

        const res = await axios.put(`${url}/${userid}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });


    
       
        

            //const formData = new FormData();
            

          

           // annuler()
            //setShowSuccessModal(true);
           // settext(res.data)
           //if (res.status === 200) {
            const updatedDatas = {
                nom,
                email,
                phone,
            };
            //alert(updatedDatas.phone)
           // console.log(updatedData.email)
            updateUserData(updatedDatas); // Mettre à jour les données dans Profilscreens
            navigation.goBack(); // Retourner à Profilscreens
         
        //  }
          
        
      }
    } catch (error) {
      console.error('update echoué:', error);
      setShowSuccessModal(true);
      settext('update echoué')
      //Alert.alert();
      // Alert.alert(res.data)
    }
  }, 3000);
  };

  const navigations = useNavigation();

    const Actionconnection = () => {
        navigation.navigate('Login');
      
      // navigations.goBack();
          



      };


  return (
    <>
       <StatusBar barStyle="dark-content" backgroundColor="#0e79b6" />
    <View style={styles.container} >
      <Loading  visible={loading}/>
      <Message handleCloseModal={handleCloseModal} text={text} showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal}/>
     
     
      <ScrollView style={styles.scrollview}>
       
     
     
        <View style={styles.modalContent}>
       
        <Input icons="user" label="Nom" placeholder="Votre nom" name={nom} setname={setnom}/>
        <Input icons="user" label="Prénom" placeholder="Votre prénom" name={prenom} setname={setprenom}/>


       

       
        <PasswordInput password={password} setPassword={setPassword} label="Password"/>
        <Input icons="phone" label="Phone" placeholder="Votre phone" name={phone} setname={setphone}/>
        <Textareainput icons="map-marker" label="Adresse" placeholder="Votre adresse" name={adresse} setname={setadresse}/>

        <Buttons title='Enregistrer'  onPress={updateuser} Actionconnection={Actionconnection} connexion="Connexion"/>


        
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
        width: 200, // Ajustez la largeur selon vos besoins
        height: 200, // Ajustez la hauteur selon vos besoins
        alignSelf: 'center', // Centre l'image horizontalement
       // marginBottom: 20, // Ajoute un peu d'espace sous l'image
    },

   
})