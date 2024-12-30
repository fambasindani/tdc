import React from 'react';
import { StyleSheet, View,Text, Image,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../Couleurs/COLORS';

const BoutonProfil = ({ onModifier, onSupprimer }) => {
  return (
    <View style={styles.container}>
     
     <TouchableOpacity style={[styles.button, styles.firstButton]} onPress={onModifier}>
     <Text style={styles.buttonsText}>Modifier </Text>
     <Icon name="update" size={15} color="white" style={styles.iconn}/>
    
      
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onSupprimer}>
          <Text style={styles.buttonsText}>Supprimer </Text>
          <Icon name="delete" size={15} color="white" style={styles.iconn}/>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
    flexDirection: 'row',
   
  },
  
  
  button: {
    flexDirection: 'row',        
    backgroundColor: '#1779a7',
    borderRadius: 100,
    padding:11,    
    marginVertical: 10,
    alignItems:'center',
    width: '42%',
    borderColor: 'black',
    borderWidth: 0.1,
    marginLeft:19,
},



  firstButton: {


  },
  buttonsText: {
    marginLeft:25,
    color:'white',
    flexDirection: 'row',  
    alignItems:'center',

  
  },
  iconn: {
    marginTop:1,
   color: 'white',
    
    },
    
});

export default BoutonProfil;