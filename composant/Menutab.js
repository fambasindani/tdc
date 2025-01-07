import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Addcoursescreen from '../screens/Addcoursescreen';
import Listecoursscreen from '../screens/Listecoursscreen';
import Listevaliderscreen from '../screens/Listevaliderscreen';
import FilterScreen from '../screens/FilterScreen';
import Justificationscreen from '../screens/Justificationscreen';
import HistoriqueScreen from '../screens/HistoriqueScreen';




// Créer des composants d'écran simples
function FiltrageScreen() {
  return (
    <FilterScreen/>
  );
}

function Justification() {
  return (
    <Justificationscreen/>
   
  );
}


function Historique() {
  return (
    <HistoriqueScreen/>
  );
}

function valider() {
  return (
    <Listevaliderscreen/>
  );
}
function Maps() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Maps</Text>
    </View>
  );
}
function Cours() {
  return (

      <Listecoursscreen/>
  
  );
}

// Créer un Tab Navigator
const Tab = createBottomTabNavigator();

export default function Menutab() {
  return (
  
      <Tab.Navigator 
        screenOptions={{
          tabBarStyle: { backgroundColor: 'black' }, // Fond noir
          tabBarActiveTintColor: 'green', // Couleur active verte
          tabBarInactiveTintColor: 'white', // Couleur inactive blanche
        }}
      >

        
<Tab.Screen 
          name="Course" 
          component={Cours} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="directions-car" color={color} size={size} />
            ),
            headerTitleStyle: {
              fontSize: 16, // Taille de police 11
             
             // textAlign: 'center', // Centre le titre
              //flex: 1, // Permet au texte de prendre tout l'espace
            },
            headerStyle: {
              backgroundColor: '#f5f5f5', // Blanc cassé
              borderRadius:5,
              //marginVertical:10
            },
          }} 
        />
         <Tab.Screen 
          name="Valider" 
          component={valider} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="check" color={color} size={size} />
            ),
            headerTitleStyle: {
              fontSize: 16, // Taille de police 11
             
             // textAlign: 'center', // Centre le titre
              //flex: 1, // Permet au texte de prendre tout l'espace
            },
            headerStyle: {
              backgroundColor: '#f5f5f5', // Blanc cassé
              borderRadius:5,
              //marginVertical:10
            },
          }} 
        />
         <Tab.Screen 
          name="Maps" 
          component={Maps} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="map" color={color} size={size} />
            ),
            headerTitleStyle: {
              fontSize: 16, // Taille de police 11
             
             // textAlign: 'center', // Centre le titre
              //flex: 1, // Permet au texte de prendre tout l'espace
            },
            headerStyle: {
              backgroundColor: '#f5f5f5', // Blanc cassé
              borderRadius:5,
              //marginVertical:10
            },
          }} 
        />

<Tab.Screen 
          name="Historique" 
          component={Historique} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="history" color={color} size={size} />
            ),
            headerTitleStyle: {
              fontSize: 16, // Taille de police 11
             
             // textAlign: 'center', // Centre le titre
              //flex: 1, // Permet au texte de prendre tout l'espace
            },
            headerStyle: {
              backgroundColor: '#f5f5f5', // Blanc cassé
              borderRadius:5,
              //marginVertical:10
            },
          }} 
        />






        <Tab.Screen 
          name="Filtrer" 
          component={FiltrageScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="filter-list" color={color} size={size} />
            ),
            headerTitleStyle: {
              fontSize: 16, // Taille de police 11
             
             // textAlign: 'center', // Centre le titre
              //flex: 1, // Permet au texte de prendre tout l'espace
            },
            headerStyle: {
              backgroundColor: '#f5f5f5', // Blanc cassé
              borderRadius:5,
              //marginVertical:10
            },
          }} 
        />

        <Tab.Screen 
          name="Justification" 
          component={Justification} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="warning" color={color} size={size} />
            ),
            headerTitleStyle: {
              fontSize: 16, // Taille de police 11
             
             // textAlign: 'center', // Centre le titre
              //flex: 1, // Permet au texte de prendre tout l'espace
            },
            headerStyle: {
              backgroundColor: '#f5f5f5', // Blanc cassé
              borderRadius:5,
              //marginVertical:10
            },
          }} 
        />
      </Tab.Navigator>
   
  );
}