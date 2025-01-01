import { View, Image, Text, StyleSheet, Alert, SafeAreaView ,ScrollView, StatusBar, Button} from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../Couleurs/COLORS';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'
import Imagephoto from '../composant/Imagephoto';


import Message from '../Message/Boxmessage';
import Loading from '../Message/Loading';
import ApiUrl from '../composant/ApiUrl';
import ApiUrlbis from '../composant/ApiUrlbis';

import MonText from '../composant/MonText ';
import BoutonProfil from '../composant/BoutonProfil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from 'lodash';
import { useNavigation } from '@react-navigation/native';












export default function Profilscreens({ navigation }) {
    const [loading, setloading] = useState(false)
    const [text, settext] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    
    const [password, setPassword] = useState('');
    const [email, setemail] = useState('pierrpapy@gmail.com');
    const [nom, setnom] = useState('FAMBA');
    const [phone, setphone] = useState('0898596501');
    const [postnom, setpostnom] = useState('');
    const [prenom, setprenom] = useState('');
    const [pseudo, setpseudo] = useState('');
    
    const [image, setImage] = useState(null);
    const [idf, setidf] = useState("");
    const [urlimage, seturlimage] =  useState(null);
    const [valeur, setvaleur] =  useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    
  
   // const [defaultImage, setDefaultImage] = useState(require('../assets/user.png'));
    const [defaultImage, setDefaultImage] = useState();
    const takePhoto = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setModalVisible(false);
            setImage(result.assets[0]);  // Fermer la modale ici
           // pickImage(result); // Passer l'objet result au composant parent
           fetchUserid(result.assets[0]);
           //fetchUserName()
        }
       
    };

    // Fonction pour choisir une image de la galerie
    const selectFromGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setModalVisible(false); 
            setImage(result.assets[0]); // Fermer la modale ici
           //pickImage(result); // Passer l'objet result au composant parent
           fetchUserid(result.assets[0]);
           //fetchUserName()
        }

     



    };

  

    useEffect(() => {
    
         
        

        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission refusée', "Nous avons besoin de votre permission pour accéder à la bibliothèque d'images.");
            }
        });


     
   
       fetchUserName();
      // fetchUserid()
        //fetchUserName()
       // editvaleurs('famba')
     
    }, []);
  

    const fetchUserName = async () => {
      try {
        const monid = await AsyncStorage.getItem('monid'); // Récupérer le nom
     
        //alert(monid)
        if (monid !== null) {
       // alert(monid)
         // setUserName(name); // Mettre à jour l'état local avec le nom
         //setidf(monid)
        
         getusers(monid)
        // onModifier(monid)
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du nom:', error);
      }
    };


    const fetchUserid = async (selectedImage) => {
      try {
        const monid = await AsyncStorage.getItem('monid'); // Récupérer le nom
     
        //alert(monid)
        if (monid !== null) {
       // alert(monid)
         // setUserName(name); // Mettre à jour l'état local avec le nom
         //setidf(monid)
        
         updateuploadImage(selectedImage,monid)
        
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du nom:', error);
      }
    };

    


    const getusers = async (id) => {



        const url = ApiUrl({ endpoint: 'getuserid' });
        const urlimg = ApiUrlbis({ endpoint: '' });
         setloading(true);
        try {
            const response = await axios.get(`${url}/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            // Traitez les données comme vous le souhaitez
            console.log(response.data);
           //const  responseData=response.data[0]
        
            setnom(response.data[0].nom)
            setemail(response.data[0].email)
           setphone(response.data[0].telephone)
           setDefaultImage(`${urlimg}${response.data[0].avatar}`)
       
    
        } catch (error) {
            console.error('Erreur:', error.message);
            return null; // Ou gérez l'erreur selon vos besoins
          } finally {
            setloading(false); // Arrêter le chargement dans tous les cas
          }



    };


    const handleCloseModal = () => {
        setShowSuccessModal(false);
      };


   


  
  
      const updateuploadImage = async (selectedImage, id) => {
       // const id = 25;
        const url = ApiUrl({ endpoint: 'update_user' });
        setloading(true); // Démarrer le chargement
      
        try {
          const formData = new FormData();
          formData.append('image', {
            //uri: image.uri,
            uri: selectedImage.uri,
            type: 'image/jpeg',
           // name: image.fileName,
            name: selectedImage.fileName,
          });
      
          const res = await axios.put(`${url}/${id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      
          // Actions à effectuer après le téléchargement réussi
         // annuler();
         // setShowSuccessModal(true);
         // settext(res.data.message || 'Image téléchargée avec succès.'); // Assurez-vous d'utiliser une chaîne
          fetchUserName()
        } catch (error) {
          console.error('Erreur lors du téléchargement de l\'image:', error);
      
          // Vérifiez la structure de l'erreur
          if (error.response) {
            console.log('Response data:', error.response.data); // Journaliser la réponse complète
            const errorMessage = error.response.data.message || error.response.data.error || 'Erreur lors du téléchargement de l\'image';
            setShowSuccessModal(true);
            settext(errorMessage); // Utilisez une chaîne pour éviter l'erreur de rendu
          } else {
            // Si error.response n'existe pas, on peut avoir une erreur réseau ou autre
            setShowSuccessModal(true);
            settext('Erreur réseau ou problème de connexion.');
          }
        } finally {
          setloading(false); // Arrêter le chargement dans tous les cas
        }
      };

      const naviger = useNavigation();
      const onModifier = async () => {
        // Créer un objet avec les valeurs par défaut
      
        const userData = {
            nom: 'FAMBA',
            email: 'pierrpapy@gmail.com',
            telephone: '0898596501',
        };
    
        // Mettre à jour les états avec les valeurs par défaut
        setnom(userData.nom);
        setemail(userData.email);
        setphone(userData.telephone);
        //alert('hhhhhh')
        //naviger.navigate('Updateprofil');
    
        // Naviguer vers l'écran de mise à jour du profil
        naviger.navigate('Updateprofil', {userData});
    };


      const onModifiers =async () => {
        //`${url}/${id}
        const id = await AsyncStorage.getItem('monid'); // Récupérer le nom
    
        const url = ApiUrl({ endpoint: 'getuserid' });
       // const urlimg = ApiUrlbis({ endpoint: '' });
        // setloading(true);
        try {
            const response = await axios.get(`${url}/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const responseData=response.data[0]

            navigation.navigate('Updateprofile', { userData: responseData});

          } catch (error) {
            console.error('Erreur de connexion:', error);
          }  
      
        // 
       
       
    };


  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="#007BFF"/>
    <View style={styles.container}>
    <Loading visible={loading} />
    <Message handleCloseModal={handleCloseModal} text={text} showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal} />
    
    <ScrollView style={styles.scrollview}>
      <View style={styles.modalContent}>
      <Imagephoto 
                   modalVisible={modalVisible}
                   setModalVisible={setModalVisible}
                   takePhoto={takePhoto}
                   selectFromGallery={selectFromGallery}
                    image={image}
                    setimage={setImage}
                    defimage={defaultImage}
                    setdefimage={setDefaultImage}
                   
                />
        
        <MonText desisnation={nom} label="Nom" />
        <MonText  desisnation={email} label="E-mail" />
        <MonText desisnation={phone} label="Téléphone" />
      </View>
      <Image 
                    source={require('../assets/linear2.png')} 
                    style={styles.linear} 
                />
      <BoutonProfil onModifier={onModifier} />
      
    </ScrollView>
  
  </View>
  </>
  )
}



const styles = StyleSheet.create({

  modalContent: {
    
     //flex: 1,
     // justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'COLORS.blanccasse',
   // padding: 20,
     
    
  },
  line: {
    
  height:0.5,
  width:'90%',
  margin:10,
  backgroundColor:'#a0a3a5',
  alignSelf:'center',
    
   
 },
 linear: {
  width: 295, // Ajustez la largeur selon vos besoins
  height:4, // Ajustez la hauteur selon vos besoins
  marginTop:20,
  marginLeft:32,



},

    container: {
   
     // paddingTop:80,
   
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

   
})