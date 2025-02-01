import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Loginscreen from '../screens/Loginscreen';
import Test from '../screens/Test';
import Inscriptionsceens from '../screens/Inscriptionsceens';
import Passwordscreen from '../screens/Passwordscreen';
import COLORS from '../Couleurs/COLORS';
import Itinerairesreens from '../screens/Additinerairesreen';

import Listecatscreen from '../screens/Listecatscreen';
import Addcategoriesreen from '../screens/Addcategoriesreen';
import ListeItinscreen from '../screens/ListeItinscreen';
import Listearretscreen from '../screens/Listearretscreen';
import Addarretsreen from '../screens/Addarretsreen';
import Listevehiculescreen from '../screens/Listevehiculescreen';
import Addvehiculescreen from '../screens/Addvehiculescreen';
import Profilscreens from '../screens/Profilscreens';
import Updateprofilscreen from '../screens/Updateprofilscreen';
import Menutab from './Menutab';
import Addcoursescreen from '../screens/Addcoursescreen';
import Updatevehiculescreen from '../screens/Updatevehiculescreen';
import Updatecategoriesreen from '../screens/Updatecategoriesreen';
import Additinerairesreen from '../screens/Additinerairesreen';
import Updateitinerairesreen from '../screens/Updateitinerairesreen';
import Updatearretsreen from '../screens/Updatearretsreen';
import Addtarificationscreen from '../screens/Addtarificationscreen';
import Listetarificationscreen from '../screens/Listetarificationscreen';
import Updatetarificationscreen from '../screens/Updatetarificationscreen';
import Updatecoursescreen from '../screens/Updatecoursescreen';
import Listefiltrerscreen from '../screens/Listefiltrerscreen';
import Listeuserscreen from '../screens/Listeuserscreen';
import Adduserscreen from '../screens/Adduserscreen';
import Updateuserscreen from '../screens/Updateuserscreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Justificationscreen from '../screens/Justificationscreen';
import SplashScreen from '../screens/SplashScreen';
import Lirepdfscreen from '../screens/Lirepdfscreen';
import Aproposcreen from '../screens/Aproposcreen';



function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Text>Accueil</Text>
    </View>
  );
}

function Securite() {
  return (
    <Listeuserscreen />
  );
}

function Profilscreen() {
  return (
    <Profilscreens />
  );
}

function VehiculeScreen() {
  return (
    <Listevehiculescreen />
  );
}

function transportscreen() {
  //alert(role)

  return (


    <Menutab />
  );
}


function Actionlistcat() {
  return (
    <Listecatscreen />

  );
}

function Actionmanuel() {
  return (
    <Lirepdfscreen />

  );
}




function Actioninineraire() {
  //const navigation = useNavigation()
  //navigation.navigate('ListeItinscreen');

  return (
    <ListeItinscreen />


  );
}

function ArretScreen() {
  return (
    <Listearretscreen />

  );
}

function TarificationScreens() {
  return (
    <Listetarificationscreen />
  );
}


function ActionApropos() {
  return (
    <Aproposcreen/>
  );
}

function ConnexionScreen() {
  const navigation = useNavigation()
  navigation.navigate('Login');
  //Alert.alert("Message", "Message box")
  return (
    <View style={styles.screen}>
      <Text>Connexion</Text>
    </View>
  );
}

// Configuration des navigateurs
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



//const Drawer = createDrawerNavigator();

const MenutabStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Menutab"
      component={Menutab}
      options={{ title: "Accueil" }} // Affiche "Accueil" dans l'en-tête
    />
  </Stack.Navigator>
);



const DrawerNavigator = () => {

  // Vos fonctions d'écran
  const [role, setRole] = useState('');

  const retrieveRole = async () => {
    try {
      const storedRole = await AsyncStorage.getItem('role');
      if (storedRole) {
        setRole(storedRole);
      }
    } catch (e) {
      console.error('Erreur lors de la récupération du rôle:', e);
    }
  };

  useEffect(() => {
    retrieveRole();
  }, []);



  return (
    <Drawer.Navigator initialRouteName="Test">
      <Drawer.Screen
        name="Test"
        component={Test}
        options={{
          drawerIcon: ({ color }) => <Image source={require('../assets/home.png')} style={styles.linear} />,
          title: "Accueil",
          headerStyle: {
            backgroundColor: '#0e79b6', // Couleur bleue pour l'en-tête
          },
          headerTintColor: '#FFFFFF', // Couleur du texte de l'en-tête
          headerTitleAlign: 'center', // Centrer le titre
        }}
      />

      <Drawer.Screen
        name="Profil"
        component={Profilscreen}
        options={{
          drawerIcon: ({ color }) => <Image source={require('../assets/user2.png')} style={styles.linear} />,
          title: "Profil",
          headerStyle: {
            backgroundColor: '#0e79b6', // Couleur bleue pour l'en-tête
          },
          headerTintColor: '#FFFFFF', // Couleur du texte de l'en-tête
          headerTitleAlign: 'center', // Centrer le titre
        }}
      />
      {(role === 'admin' || role === 'super user') && (
        <Drawer.Screen
          name="Véhicule"
          component={VehiculeScreen}
          options={{
            drawerIcon: ({ color }) => <Image source={require('../assets/car.png')} style={styles.linear} />,
            headerStyle: {
              backgroundColor: '#0e79b6', // Couleur bleue pour l'en-tête
            },
            headerTintColor: '#FFFFFF', // Couleur du texte de l'en-tête
            headerTitleAlign: 'center', // Centrer le titre

          }}
        />
      )}

      {(role !== 'abonne') && (
        <Drawer.Screen
          name="Transport"
          component={transportscreen}
          options={{

            drawerIcon: ({ color }) => <Image source={require('../assets/route.png')} style={styles.linear} />,


            title: "Transport",
            headerStyle: {
              backgroundColor: '#0e79b6', // Couleur bleue pour l'en-tête
            },
            headerTintColor: '#FFFFFF', // Couleur du texte de l'en-tête
            headerTitleAlign: 'center', // Centrer le titre

          }}
        />
      )}
      {/*  <Drawer.Screen
        name="Catégorie"
        component={Actioncatddddd}
        options={{
          drawerIcon: ({ color }) => <Icon name="category" size={24} color={color} />,
          headerStyle: {
            backgroundColor: '#007BFF', // Couleur bleue pour l'en-tête
          },
          headerTintColor: '#FFFFFF', // Couleur du texte de l'en-tête
        }}
      />*/}
      {(role === 'admin' || role === 'super user') && (
        <Drawer.Screen
          name="Listecat"
          component={Actionlistcat}
          options={{
            drawerIcon: ({ color }) => <Image source={require('../assets/cat.png')} style={styles.linear} />,
            title: "Catégorie",
            headerStyle: {
              backgroundColor: '#0e79b6', // Couleur bleue pour l'en-tête
            },
            headerTintColor: '#FFFFFF', // Couleur du texte de l'en-tête
            headerTitleAlign: 'center', // Centrer le titre
          }}
        />
      )}



      <Drawer.Screen
        name="Itineraire"
        component={Actioninineraire}
        options={{
          drawerIcon: ({ color }) => <Image source={require('../assets/maps.png')} style={styles.linear} />,
          title: "Itinéraire",
          headerStyle: {
            backgroundColor: '#0e79b6', // Couleur bleue pour l'en-tête
          },
          headerTintColor: '#FFFFFF', // Couleur du texte de l'en-tête
          headerTitleAlign: 'center', // Centrer le titre

        }}
      />
      {(role === 'admin' || role === 'super user') && (
        <Drawer.Screen
          name="Listearret"
          component={ArretScreen}
          options={{
            drawerIcon: ({ color }) => <Image source={require('../assets/arret.png')} style={styles.linear} />,
            title: "Arrêt",
            headerStyle: {
              backgroundColor: '#0e79b6', // Couleur bleue pour l'en-tête
            },
            headerTintColor: '#FFFFFF', // Couleur du texte de l'en-tête
            headerTitleAlign: 'center', // Centrer le titre
          }}
        />
      )}


      <Drawer.Screen
        name="Tarification"
        component={TarificationScreens}
        options={{
          drawerIcon: ({ color }) => <Image source={require('../assets/cash.png')} style={styles.linear} />,

          title: "Tarification",
          headerStyle: {
            backgroundColor: '#0e79b6', // Couleur bleue pour l'en-tête
          },
          headerTintColor: '#FFFFFF', // Couleur du texte de l'en-tête
          headerTitleAlign: 'center', // Centrer le titre
        }}
      />


      {(role === 'admin' || role === 'super user') && (
        <Drawer.Screen
          name="Securite"
          component={Securite}
          options={{
            drawerIcon: ({ color }) => <Image source={require('../assets/cash.png')} style={styles.linear} />,

            title: "Sécurité",
            headerStyle: {
              backgroundColor: '#0e79b6', // Couleur bleue pour l'en-tête
            },
            headerTintColor: '#FFFFFF', // Couleur du texte de l'en-tête
            headerTitleAlign: 'center', // Centrer le titre
          }}
        />

      )}

      
<Drawer.Screen
        name="Apropos"
        component={ActionApropos}
        options={{
          drawerIcon: ({ color }) => <Image source={require('../assets/user2.png')} style={styles.linear} />,
          title: "A propos",
          headerStyle: {
            backgroundColor: '#0e79b6', // Couleur bleue pour l'en-tête
          },
          headerTintColor: '#FFFFFF', // Couleur du texte de l'en-tête
          headerTitleAlign: 'center', // Centrer le titre
        }}
      />


<Drawer.Screen
        name="Manuel"
        component={Actionmanuel}
        options={{
          drawerIcon: ({ color }) => <Image source={require('../assets/user2.png')} style={styles.linear} />,
          title: "Manuel",
          headerStyle: {
            backgroundColor: '#0e79b6', // Couleur bleue pour l'en-tête
          },
          headerTintColor: '#FFFFFF', // Couleur du texte de l'en-tête
          headerTitleAlign: 'center', // Centrer le titre
        }}
      />

      <Drawer.Screen
        name="Connexion"
        component={ConnexionScreen}
        options={{
          drawerIcon: ({ color }) => <Image source={require('../assets/logout.png')} style={styles.linear} />,
        }}
      />


  

    </Drawer.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }} // Masquer l'en-tête pour l'écran de connexion
      />



      <Stack.Screen
        name="Login"
        component={Loginscreen}
        options={{ headerShown: false }} // Masquer l'en-tête pour l'écran de connexion
      />
      <Stack.Screen
        name="Test"
        component={DrawerNavigator}
        options={{ headerShown: false }} // Masquer l'en-tête pour le Drawer
      />
      <Stack.Screen
        name="Inscription"
        component={Inscriptionsceens}
        options={{ headerShown: false }} // Masquer l'en-tête pour le DrawerPasswordscreen
      />



      <Stack.Screen
        name="Passwordscreen"
        component={Passwordscreen}
        options={{ headerShown: false }} // Masquer l'en-tête pour le Drawer 
      />

      <Stack.Screen
        name="addcat"
        component={Addcategoriesreen}
        options={{
          headerStyle: {
            backgroundColor: '#0e79b6',
            color: COLORS.white // Couleur de fond de l'en-tête
          },
          headerTitle: 'Ajouter Catégorie', // Titre de l'en-tête  
          headerTitleAlign: 'center', // Centrer le titre
          headerTitleStyle: {
            fontSize: 17, // Taille de police
            // fontWeight: 'bold', // Texte en gras
            color: COLORS.white, // Couleur du texte   Listeactifscreen
          },
        }}
      />


      <Stack.Screen
        name="Updatecategorie"
        component={Updatecategoriesreen}
        options={{
          headerStyle: {
            backgroundColor: '#0e79b6',
            color: COLORS.white // Couleur de fond de l'en-tête
          },
          headerTitle: 'Modifier Catégorie', // Titre de l'en-tête  
          headerTitleAlign: 'center', // Centrer le titre
          headerTitleStyle: {
            fontSize: 17, // Taille de police
            // fontWeight: 'bold', // Texte en gras
            color: COLORS.white, // Couleur du texte   Listeactifscreen
          },
        }}
      />






      <Stack.Screen
        name="Addvehicule"
        component={Addvehiculescreen}
        options={{
          headerStyle: {
            backgroundColor: '#0e79b6',
            color: COLORS.white // Couleur de fond de l'en-tête
          },
          headerTitle: 'Ajouter Vehicule', // Titre de l'en-tête  
          headerTitleAlign: 'center', // Centrer le titre
          headerTitleStyle: {
            fontSize: 17, // Taille de police
            // fontWeight: 'bold', // Texte en gras
            color: COLORS.white,
            // Couleur du texte   Listeactifscreen
          },
        }}
      />

      <Stack.Screen
        name="Updateprofil"
        component={Updateprofilscreen}
        options={{
          headerStyle: {
            backgroundColor: "#0e79b6",
            color: COLORS.white // Couleur de fond de l'en-tête
          },
          headerTitle: 'Modifier Profil', // Titre de l'en-tête  
          headerTitleAlign: 'center', // Centrer le titre
          headerTitleStyle: {
            fontSize: 17, // Taille de police
            // fontWeight: 'bold', // Texte en gras
            color: COLORS.white,
            // Couleur du texte   Listeactifscreen
          },
        }}
      />


      <Stack.Screen
        name="Addcours"
        component={Addcoursescreen}
        options={{
          headerStyle: {
            backgroundColor: '#0e79b6',
            color: COLORS.white // Couleur de fond de l'en-tête
          },
          headerTitle: 'Ajouter Course', // Titre de l'en-tête  
          headerTitleAlign: 'center', // Centrer le titre
          headerTitleStyle: {
            fontSize: 17, // Taille de police
            // fontWeight: 'bold', // Texte en gras
            color: COLORS.white,
            // Couleur du texte   Listeactifscreen
          },
        }}
      />


      <Stack.Screen
        name="Updatecours"
        component={Updatecoursescreen}
        options={{
          headerStyle: {
            backgroundColor: '#0e79b6',
            color: COLORS.white // Couleur de fond de l'en-tête
          },
          headerTitle: 'Modifier Course', // Titre de l'en-tête  
          headerTitleAlign: 'center', // Centrer le titre
          headerTitleStyle: {
            fontSize: 17, // Taille de police
            // fontWeight: 'bold', // Texte en gras
            color: COLORS.white,
            // Couleur du texte   Listeactifscreen
          },
        }}
      />


      <Stack.Screen
        name="Updatevehicule"
        component={Updatevehiculescreen}
        options={{
          headerStyle: {
            backgroundColor: '#0e79b6',
            color: COLORS.white // Couleur de fond de l'en-tête
          },
          headerTitle: 'Modifier Vehicule', // Titre de l'en-tête  
          headerTitleAlign: 'center', // Centrer le titre
          headerTitleStyle: {
            fontSize: 17, // Taille de police
            // fontWeight: 'bold', // Texte en gras
            color: COLORS.white,
            // Couleur du texte   Listeactifscreen
          },
        }}
      />


      <Stack.Screen
        name="Additineraire"
        component={Additinerairesreen}
        options={{
          headerStyle: {
            backgroundColor: '#0e79b6',
            color: COLORS.white // Couleur de fond de l'en-tête
          },
          headerTitle: 'Ajouter Itinéraire', // Titre de l'en-tête  
          headerTitleAlign: 'center', // Centrer le titre
          headerTitleStyle: {
            fontSize: 17, // Taille de police
            // fontWeight: 'bold', // Texte en gras
            color: COLORS.white,
            // Couleur du texte   Listeactifscreen
          },
        }}
      />




      <Stack.Screen
        name="Updateitineraire"
        component={Updateitinerairesreen}
        options={{
          headerStyle: {
            backgroundColor: '#0e79b6',
            color: COLORS.white // Couleur de fond de l'en-tête
          },
          headerTitle: 'Modifier Itinéraire', // Titre de l'en-tête  
          headerTitleAlign: 'center', // Centrer le titre
          headerTitleStyle: {
            fontSize: 17, // Taille de police
            // fontWeight: 'bold', // Texte en gras
            color: COLORS.white,
            // Couleur du texte   Listeactifscreen
          },
        }}
      />




      <Stack.Screen
        name="Addarret"
        component={Addarretsreen}
        options={{
          headerStyle: {
            backgroundColor: '#0e79b6',
            color: COLORS.white // Couleur de fond de l'en-tête
          },
          headerTitle: 'Ajouter Arrêt', // Titre de l'en-tête  
          headerTitleAlign: 'center', // Centrer le titre
          headerTitleStyle: {
            fontSize: 17, // Taille de police
            // fontWeight: 'bold', // Texte en gras
            color: COLORS.white,
            // Couleur du texte   Listeactifscreen
          },
        }}
      />



      <Stack.Screen
        name="Updatearret"
        component={Updatearretsreen}
        options={{
          headerStyle: {
            backgroundColor: '#0e79b6',
            color: COLORS.white // Couleur de fond de l'en-tête
          },
          headerTitle: 'Modifier Arrêt', // Titre de l'en-tête  
          headerTitleAlign: 'center', // Centrer le titre
          headerTitleStyle: {
            fontSize: 17, // Taille de police
            // fontWeight: 'bold', // Texte en gras
            color: COLORS.white,
            // Couleur du texte   Listeactifscreen
          },
        }}
      />


      <Stack.Screen
        name="Addtarification"
        component={Addtarificationscreen}
        options={{
          headerStyle: {
            backgroundColor: '#0e79b6',
            color: COLORS.white // Couleur de fond de l'en-tête
          },
          headerTitle: 'Ajouter Tarification', // Titre de l'en-tête  
          headerTitleAlign: 'center', // Centrer le titre
          headerTitleStyle: {
            fontSize: 17, // Taille de police
            // fontWeight: 'bold', // Texte en gras
            color: COLORS.white,
            // Couleur du texte   Listeactifscreen
          },
        }}
      />

      <Stack.Screen
        name="Updatetarification"
        component={Updatetarificationscreen}
        options={{
          headerStyle: {
            backgroundColor: '#0e79b6',
            color: COLORS.white // Couleur de fond de l'en-tête
          },
          headerTitle: 'Modifier Tarification', // Titre de l'en-tête  
          headerTitleAlign: 'center', // Centrer le titre
          headerTitleStyle: {
            fontSize: 17, // Taille de police
            // fontWeight: 'bold', // Texte en gras
            color: COLORS.white,
            // Couleur du texte   Listeactifscreen
          },
        }}
      />


      <Stack.Screen
        name="Listefiltre"
        component={Listefiltrerscreen}
        options={{
          headerStyle: {
            backgroundColor: '#0e79b6',
            color: COLORS.white // Couleur de fond de l'en-tête
          },
          headerTitle: 'Liste des tours', // Titre de l'en-tête  
          headerTitleAlign: 'center', // Centrer le titre
          headerTitleStyle: {
            fontSize: 17, // Taille de police
            // fontWeight: 'bold', // Texte en gras
            color: COLORS.white,
            // Couleur du texte   Listeactifscreen
          },
        }}
      />




      <Stack.Screen
        name="Adduser"
        component={Adduserscreen}
        options={{
          headerStyle: {
            backgroundColor: '#0e79b6',
            color: COLORS.white // Couleur de fond de l'en-tête
          },
          headerTitle: 'Ajouter utilisateur', // Titre de l'en-tête  
          headerTitleAlign: 'center', // Centrer le titre
          headerTitleStyle: {
            fontSize: 17, // Taille de police
            // fontWeight: 'bold', // Texte en gras
            color: COLORS.white,
            // Couleur du texte   Listeactifscreen
          },
        }}
      />



      <Stack.Screen
        name="Updateuser"
        component={Updateuserscreen}
        options={{
          headerStyle: {
            backgroundColor: '#0e79b6',
            color: COLORS.white // Couleur de fond de l'en-tête
          },
          headerTitle: 'Modifier utilisateur', // Titre de l'en-tête  
          headerTitleAlign: 'center', // Centrer le titre
          headerTitleStyle: {
            fontSize: 17, // Taille de police
            // fontWeight: 'bold', // Texte en gras
            color: COLORS.white,
            // Couleur du texte   Listeactifscreen
          },
        }}
      />



      <Stack.Screen
        name="Justifications"
        component={Justificationscreen}
        options={{
          headerStyle: {
            backgroundColor: '#0e79b6',
            color: COLORS.white // Couleur de fond de l'en-tête
          },
          headerTitle: 'Ajouter Justification', // Titre de l'en-tête  
          headerTitleAlign: 'center', // Centrer le titre
          headerTitleStyle: {
            fontSize: 17, // Taille de police
            // fontWeight: 'bold', // Texte en gras
            color: COLORS.white,
            // Couleur du texte   Listeactifscreen
          },
        }}
      />














    </Stack.Navigator>
  );
};

export default function Menue() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',


  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  linear: {
    width: 30, // Ajustez la largeur selon vos besoins
    height: 31, // Ajustez la hauteur selon vos besoins

    borderRadius: 45
  },
});