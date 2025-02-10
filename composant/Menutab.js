import React, { useEffect, useState } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Listejustificationscreen from '../screens/Listejustificationscreen';
import Listemapscreen from '../screens/Listemapscreen';




// Créer des composants d'écran simples
function FiltrageScreen() {
  return (
    <FilterScreen/>
  );
}

function Justification() {
  // <Justificationscreen/>
  return (
    <Listejustificationscreen/>
   
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
    <Listemapscreen/>
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
  
      <Tab.Navigator 
        screenOptions={{
          tabBarStyle: { backgroundColor: '#e7e7e7',
            height: 70,
            paddingTop:7,
            borderBottomWidth: 1,
        
          

           }, // Fond noir
          tabBarActiveTintColor: 'black', // Couleur active verte
          tabBarInactiveTintColor: '#0e79b6', // Couleur inactive blanche
         
        }}
      >

{(role === 'admin'||role === 'super user') && (   
<Tab.Screen 
          name="Course" 
          component={Cours} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="directions-car" color={color} size={size} />
            ),
            headerTitleStyle: {
              fontSize: 16,color:'#4975ad' // Taille de police 11
             
             // textAlign: 'center', // Centre le titre
              //flex: 1, // Permet au texte de prendre tout l'espace
            },
            headerStyle: {
              backgroundColor: '#f5f5f5', // Blanc cassé
              borderRadius:0,
              //marginVertical:10
            },
          }} 
        />
        )}

{(role === 'admin'||role === 'super user' ||role === 'motard') && ( 

         <Tab.Screen 
          name="Valider" 
          component={valider} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="check" color={color} size={size} />
            ),
            headerTitleStyle: {
              fontSize: 16,color:'#4975ad' // Taille de police 11
             
             // textAlign: 'center', // Centre le titre
              //flex: 1, // Permet au texte de prendre tout l'espace
            },
            headerStyle: {
              backgroundColor: '#f5f5f5', // Blanc cassé
              borderRadius:0,
              //marginVertical:10
            },
          }} 
        />
)}
         <Tab.Screen 
          name="Maps" 
          component={Maps} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="map" color={color} size={size} />
            ),
            headerTitleStyle: {
             fontSize: 16,color:'#4975ad' // Taille de police 11
             
             // textAlign: 'center', // Centre le titre
              //flex: 1, // Permet au texte de prendre tout l'espace
            },
            headerStyle: {
              backgroundColor: '#f5f5f5', // Blanc cassé
              borderRadius:0,
              //marginVertical:10
            },
          }} 
        />
{(role === 'admin'||role === 'super user'||role === 'client' ) && ( 
<Tab.Screen 
          name="Historique" 
          component={Historique} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="history" color={color} size={size} />
            ),
            headerTitleStyle: {
             fontSize: 16,color:'#4975ad' // Taille de police 11
             
             // textAlign: 'center', // Centre le titre
              //flex: 1, // Permet au texte de prendre tout l'espace
            },
            headerStyle: {
              backgroundColor: '#f5f5f5', // Blanc cassé
              borderRadius:0,
              //marginVertical:10
            },
          }} 
        />
        )}




{(role === 'admin'||role === 'super user') && ( 
        <Tab.Screen 
          name="Filtrer" 
          component={FiltrageScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="filter-list" color={color} size={size} />
            ),
            headerTitleStyle: {
            fontSize: 16,color:'#4975ad' // Taille de police 11
             
             // textAlign: 'center', // Centre le titre
              //flex: 1, // Permet au texte de prendre tout l'espace
            },
            headerStyle: {
              backgroundColor: '#f5f5f5', // Blanc cassé
              borderRadius:0,
              //marginVertical:10
            },
          }} 
        />
)}


{(role === 'admin'||role === 'super user' ||role === 'motard') && ( 
        <Tab.Screen 
          name="Justification" 
          
          
          component={Justification} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="warning" color={color} size={size} />
            ),
            headerTitleStyle: {
              fontSize: 16,color:'#4975ad' // Taille de police 11
             
             // textAlign: 'center', // Centre le titre
              //flex: 1, // Permet au texte de prendre tout l'espace
            },
            headerStyle: {
              backgroundColor: '#f5f5f5', // Blanc cassé
              borderRadius:0,
              //marginVertical:10
            },
          }} 
        />
)}
      </Tab.Navigator>
   
  );
}