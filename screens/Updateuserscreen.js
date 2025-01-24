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
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Textareainput from '../composant/Textareainput';
import Droplist from '../composant/Droplist';











export default function Updateuserscreen({ navigation, route }) {

  const { refreshList, items } = route.params;
    const [loading, setloading] = useState(false)
    const [text, settext] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [email, setemail] = useState(items.email);
    const [password, setPassword] = useState('');
    const [nom, setnom] = useState(items.nom);
   // const [postnom, setpostnom] = useState('');
    //const [prenom, setprenom] = useState('');
    const [roleid, setroleid] = useState(items.idrole);
    const [userid, setuserid] = useState(items.id);
    const [phone, setphone] = useState(items.telephone);
    const [role, setrole] = useState('');
    const [Datarole, setDatarole] = useState([]);
    const [urlimage, seturlimage] =  useState(null);
    const [adresse, setadresse] =  useState(items.adresse);
  
   


  const  Roles = [
      {'id': 'admin', 'role': 'admin'},
     // {'id': 'abonne', 'role': 'abonne'},
      {'id': 'client', 'role': 'client'},
      {'id':'motard' , 'role': 'motard'},
      {'id': 'super user', 'role': 'super user'}
  ]
  

  useEffect(() => {
    getrole();
   
  }, []);
   

  const getrole = async () => {
    try {
     // setcontenu('description')
      //const urlget = ApiUrl({ endpoint: 'gettarification' });
      //const response = await axios.get(urlget);
     
      //alert(response.data[0].description)
      setDatarole(Roles);
    } catch (error) {
      console.error('Erreur lors de la requête à l\'API :', error);
    }
  };




    const handleCloseModal = () => {
        setShowSuccessModal(false);
      };


      const annuler =  () => {

        setemail('')
        setPassword('')
        setnom('')
        setadresse('')
        setphone('')

      

      }

  const Actionacc = () => {
    navigation.navigate('MonMenu');

  }




  const updateuser= async () => {

    const url = ApiUrl({ endpoint: 'update_role' });

    setloading(true)
    setTimeout(async () => {
    try {
      // const varemail = ''
      setloading(false)
      const formData = new FormData();

     // alert(userid +" "+roleid)
      formData.append('nom', nom);
      formData.append('role', role);
      formData.append('password', password);
      formData.append('iduser', userid);
      formData.append('idrole', roleid);
      formData.append('adresse', adresse);
      formData.append('telephone', phone);

      if (!role) {
        setShowSuccessModal(true);
        settext('Veuillez sélectionner le rôle')
        return;
      }

      if (nom.trim() === '') {
        setShowSuccessModal(true);
        settext('Veuillez saisir le nom')
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
       
        

            //const formData = new FormData();
            

            const res = await axios.post(url, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });

            //annuler()
            //setShowSuccessModal(true);
            //settext(res.data)
            refreshList()
            navigation.goBack()
         

          
        
      }
    } catch (error) {
      console.error('update echouée:', error);
      setShowSuccessModal(true);
      settext('update echouée')
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
    <StatusBar barStyle="dark-content" backgroundColor="#0e79b6"/>
    <View style={styles.container} >
      <Loading  visible={loading}/>
      <Message handleCloseModal={handleCloseModal} text={text} showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal}/>
     
     
      <ScrollView style={styles.scrollview}>
       
        
       
        <View style={styles.modalContent}>
        <Droplist  icons="briefcase" contenus="role" identifiant="id" getCategorie={getrole} data={Datarole} setData={setDatarole} description={role} setDescription={setrole} label="Rôle" placephold="Sélectionnez rôle"/>
                   
        <Input icons="user" label="Nom" placeholder="Votre nom" name={nom} setname={setnom}/>


        <Input icons="envelope" label="Email" placeholder="Votre e-mail" name={email} setname={setemail}/>
        <PasswordInput password={password} setPassword={setPassword} label="Mot de passe"/>
        <Input icons="phone" label="Phone" placeholder="Votre phone" name={phone} setname={setphone}/>
        <Input icons="map-marker" label="Adresse" placeholder="Votre adresse" name={adresse} setname={setadresse}/>

        <Buttons title='Modifier'  onPress={updateuser} Actionconnection={Actionconnection} connexion="" />


        
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
      width: 79, // Ajustez la largeur selon vos besoins
      height: 99, // Ajustez la hauteur selon vos besoins
      alignSelf: 'center', // Centre l'image horizontalement
      marginBottom: 20, // Ajoute un peu d'espace sous l'image
    },

   
})