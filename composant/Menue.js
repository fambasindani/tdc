import React from 'react';
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

// Vos fonctions d'écran
function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Text>Accueil</Text>
    </View>
  );
}

function Profilscreen() {
  return (
    <Profilscreens/>
  );
}

function VehiculeScreen() {
  return (
    <Listevehiculescreen />
  );
}

function ChatScreen() {
  return (
    <View style={styles.screen}>
      <Text>Chat</Text>
    </View>
  );
}


function Actionlistcat() {
  return (
    <Listecatscreen />

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

function TarificationScreen() {
  return (
    <View style={styles.screen}>
      <Text>Tarification</Text>
    </View>
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

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Test">
      <Drawer.Screen
        name="Test"
        component={Test}
        options={{
          drawerIcon: ({ color }) => <Image source={require('../assets/home.png')} style={styles.linear} />,
          title: "Accueil",
          headerStyle: {
            backgroundColor: '#007BFF', // Couleur bleue pour l'en-tête
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
            backgroundColor: '#007BFF', // Couleur bleue pour l'en-tête
          },
          headerTintColor: '#FFFFFF', // Couleur du texte de l'en-tête
          headerTitleAlign: 'center', // Centrer le titre
        }}
      />
      <Drawer.Screen
        name="Véhicule"
        component={VehiculeScreen}
        options={{
          drawerIcon: ({ color }) => <Image source={require('../assets/car.png')} style={styles.linear} />,
          headerStyle: {
            backgroundColor: '#007BFF', // Couleur bleue pour l'en-tête
          },
          headerTintColor: '#FFFFFF', // Couleur du texte de l'en-tête
          headerTitleAlign: 'center', // Centrer le titre

        }}
      />
      <Drawer.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          drawerIcon: ({ color }) => <Image source={require('../assets/chat.png')} style={styles.linear} />,
        }}
      />
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

      <Drawer.Screen
        name="Listecat"
        component={Actionlistcat}
        options={{
          drawerIcon: ({ color }) => <Image source={require('../assets/cat.png')} style={styles.linear} />,
          title: "Catégorie",
          headerStyle: {
            backgroundColor: '#007BFF', // Couleur bleue pour l'en-tête
          },
          headerTintColor: '#FFFFFF', // Couleur du texte de l'en-tête
          headerTitleAlign: 'center', // Centrer le titre
        }}
      />



      <Drawer.Screen
        name="Itineraire"
        component={Actioninineraire}
        options={{
          drawerIcon: ({ color }) => <Image source={require('../assets/maps.png')} style={styles.linear} />,
          title: "Itinéraire",
          headerStyle: {
            backgroundColor: '#007BFF', // Couleur bleue pour l'en-tête
          },
          headerTintColor: '#FFFFFF', // Couleur du texte de l'en-tête
          headerTitleAlign: 'center', // Centrer le titre

        }}
      />
      <Drawer.Screen
        name="Listearret"
        component={ArretScreen}
        options={{
          drawerIcon: ({ color }) => <Image source={require('../assets/arret.png')} style={styles.linear} />,
          title: "Arrêt",
          headerStyle: {
            backgroundColor: '#007BFF', // Couleur bleue pour l'en-tête
          },
          headerTintColor: '#FFFFFF', // Couleur du texte de l'en-tête
          headerTitleAlign: 'center', // Centrer le titre
        }}
      />



      <Drawer.Screen
        name="Tarification"
        component={TarificationScreen}
        options={{
          drawerIcon: ({ color }) => <Image source={require('../assets/cash.png')} style={styles.linear} />,
          


        }}


      />
      <Drawer.Screen
        name="Connexion"
        component={ConnexionScreen}
        options={{
          drawerIcon: ({ color }) => <Image source={require('../assets/connexion.png')} style={styles.linear} />,
        }}
      />
    </Drawer.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator>



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
            backgroundColor: COLORS.blue,
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
        name="Additineraire"
        component={Addcategoriesreen}
        options={{
          headerStyle: {
            backgroundColor: COLORS.blue,
            color: COLORS.white // Couleur de fond de l'en-tête
          },
          headerTitle: 'Ajouter Itinéraire', // Titre de l'en-tête  
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
            backgroundColor: COLORS.blue,
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
            backgroundColor: COLORS.blue,
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
    height:31, // Ajustez la hauteur selon vos besoins

    borderRadius:45
  },
});