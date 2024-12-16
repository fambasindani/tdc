import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Carte from '../screens/Cartescreen';

// Créer des composants d'écran simples
function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Text>Accueil</Text>
    </View>
  );
}

function Profilscreen() {
  return (
    <View style={styles.screen}>
      <Text>Profil</Text>
    </View>
  );
}

function vehiculeScrren() {
  return (
    <View style={styles.screen}>
      <Text>vehicule</Text>
    </View>
  );
}

function chatscreen() {
  return (
    <View style={styles.screen}>
      <Text>chat</Text>
    </View>
  );
}

function categoriescreen() {
  return (
    <View style={styles.screen}>
      <Text>Catégorie</Text>
    </View>
  );
}

function Itinerairescreen() {
  return (
    <View style={styles.screen}>
      <Text>Itinéraire</Text>
    </View>
  );
}

function Arretscreen() {
  return (
    <View style={styles.screen}>
      <Text>Arrêt</Text>
    </View>
  );
}


function Tarificationscreen() {
  return (
    <View style={styles.screen}>
      <Text>Tarification</Text>
    </View>
  );
}

function Connexioscreen() {
  return (
    <View style={styles.screen}>
      <Text>Connection</Text>
    </View>
  );
}


// Créer un Drawer Navigator
const Drawer = createDrawerNavigator();

export default function Menue() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Accueil">
        <Drawer.Screen
          name="Accueil"
          component={Carte}
          options={{
            drawerIcon: ({ color }) => (
              <Icon name="home" size={24} color={color} />
            ),
            headerStyle: {
              backgroundColor: '#007BFF', // Couleur bleue pour l'en-tête
            },
            headerRight: () => (
              <Image
                source={require('../assets/user.png')} // Chemin vers votre image
                style={styles.avatar}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="Profil"
          component={Profilscreen}
          options={{
            drawerIcon: ({ color }) => (
              <Icon name="person" size={24} color={color} />
            ),
            headerStyle: {
              backgroundColor: '#007BFF', // Couleur bleue pour l'en-tête
            },
            headerRight: () => (
              <Image
                source={require('../assets/user.png')} // Chemin vers votre image
                style={styles.avatar}
              />
            ),
          }}
        />


        <Drawer.Screen
          name="Catégorie Vehicule"
          component={categoriescreen}
          options={{
            drawerIcon: ({ color }) => (
              <Icon name="category" size={24} color={color} />
            ),
            headerStyle: {
              backgroundColor: '#007BFF', // Couleur bleue pour l'en-tête
            },
            headerRight: () => (
              <Image
                source={require('../assets/user.png')} // Chemin vers votre image
                style={styles.avatar}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="Vehicule"
          component={vehiculeScrren}
          options={{
            drawerIcon: ({ color }) => (
              <Icon name="directions-car" size={24} color={color} />
            ),
            headerStyle: {
              backgroundColor: '#007BFF', // Couleur bleue pour l'en-tête
            },
            headerRight: () => (
              <Image
                source={require('../assets/user.png')} // Chemin vers votre image
                style={styles.avatar}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="Itineraire"
          component={Itinerairescreen}
          options={{
            drawerIcon: ({ color }) => (
              <Icon name="directions" size={24} color={color} />
            ),
            headerStyle: {
              backgroundColor: '#007BFF', // Couleur bleue pour l'en-tête
            },
            headerRight: () => (
              <Image
                source={require('../assets/user.png')} // Chemin vers votre image
                style={styles.avatar}
              />
            ),
          }}
        />
          
          <Drawer.Screen
          name="Arrêt"
          component={Arretscreen}
          options={{
            drawerIcon: ({ color }) => (
              <Icon name="stop" size={24} color={color} />
            ),
            headerStyle: {
              backgroundColor: '#007BFF', // Couleur bleue pour l'en-tête
            },
            headerRight: () => (
              <Image
                source={require('../assets/user.png')} // Chemin vers votre image
                style={styles.avatar}
              />
            ),
          }}
        />

<Drawer.Screen
          name="Tarification"
          component={Tarificationscreen}
          options={{
            drawerIcon: ({ color }) => (
              <Icon name="stop" size={24} color={color} />
            ),
            headerStyle: {
              backgroundColor: '#007BFF', // Couleur bleue pour l'en-tête
            },
            headerRight: () => (
              <Image
                source={require('../assets/user.png')} // Chemin vers votre image
                style={styles.avatar}
              />
            ),
          }}
        />





        <Drawer.Screen
          name="Chat"
          component={chatscreen}
          options={{
            drawerIcon: ({ color }) => (
              <Icon name="chat" size={24} color={color} />
            ),
            headerStyle: {
              backgroundColor: '#007BFF', // Couleur bleue pour l'en-tête
            },
            headerRight: () => (
              <Image
                source={require('../assets/user.png')} // Chemin vers votre image
                style={styles.avatar}
              />
            ),
          }}
        />

<Drawer.Screen
          name="Connection"
          component={Connexioscreen}
          options={{
            drawerIcon: ({ color }) => (
              <Icon name="login" size={24} color={color} />
            ),
            headerStyle: {
              backgroundColor: '#007BFF', // Couleur bleue pour l'en-tête
            },
            headerRight: () => (
              <Image
                source={require('../assets/user.png')} // Chemin vers votre image
                style={styles.avatar}
              />
            ),
          }}
        />


      </Drawer.Navigator>
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
    width: 40, // Taille de l'image
    height: 40, // Taille de l'image
    borderRadius: 20, // Pour rendre l'image ronde
    marginRight: 15, // Espacement à droite
  },
});