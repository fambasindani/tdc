import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, Image } from 'react-native';
import Loginscreen from '../screens/Loginscreen';
import Test from '../screens/Test';
import Inscriptionsceens from '../screens/Inscriptionsceens';
import Passwordscreen from '../screens/Passwordscreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Listevehiculescreen from '../screens/Listevehiculescreen';
import Profilscreens from '../screens/Profilscreens';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



const AppStack = () => {
  return (
    <Stack.Navigator>
     
      <Stack.Screen
        name="Test"
        component={Test}
        options={{
          headerTitle: () => (
            <View style={styles.headerTitleContainer}>
             
              <Text style={styles.headerTitle}>Accueil</Text>
            </View>
          ),
          headerStyle: {
            backgroundColor: '#0e79b6',
          },
          headerTintColor: '#FFFFFF',
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Vehicule"
        component={Listevehiculescreen }
        options={{
          headerTitle: () => (
            <View style={styles.headerTitleContainer}>
             
              <Text style={styles.headerTitle}>Inscription</Text>
            </View>
          ),
          headerStyle: {
            backgroundColor: '#0e79b6',
          },
          headerTintColor: '#FFFFFF',
          headerShown: false 
        }}
      />
      <Stack.Screen
        name="Profilscreens"
        component={Profilscreens}
        options={{
            
          headerTitle: () => (
            <View style={styles.headerTitleContainer}>
             
              <Text style={styles.headerTitle}>Modifier Mot de Passe</Text>
            </View>
          ),
          headerStyle: {
            backgroundColor: '#0e79b6',
          },
          headerTintColor: '#FFFFFF',
          headerShown: false 
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Test">
    <Drawer.Screen name="Test" component={AppStack} options={{ title: "Accueil" , drawerIcon: ({ color }) => <Image source={require('../assets/home.png')} style={styles.linear} />}} />
   <Drawer.Screen name="Inscriptions" component={Listevehiculescreen} options={{ title: "Vehicule", drawerIcon: ({ color }) => <Image source={require('../assets/home.png')} style={styles.linear} /> }} />
    <Drawer.Screen name="Password" component={Profilscreens} options={{ title: "Profile", drawerIcon: ({ color }) => <Image source={require('../assets/home.png')} style={styles.linear} /> }} />
       {/*   Ajoutez d'autres écrans ici  <Drawer.Screen name="Password" component={Profilscreens} options={{ title: "Profile", drawerIcon: () => <Image source={require('../assets/lock.png')} style={styles.linear} /> }} />    */}
    </Drawer.Navigator>
  );
};

export default function CustomHeader() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    marginLeft: 10,
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  linear: {
    width: 30,
    height: 30,
  },
});