import React from 'react';
import { StyleSheet, View,Text, Image,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../Couleurs/COLORS';

const BoutonProfil = ({ onModifier, onSupprimer }) => {
  return (
    <View style={styles.container}>
     
     <TouchableOpacity style={[styles.button, styles.firstButton]} onPress={onModifier}>
      <Text style={{ color: 'white', fontSize: 18, marginBottom: 2 ,  }}>
        Modifier <Image 
                    source={require('../assets/small.png')} 
                    style={styles.notificationImage} 
                />
        </Text>
      
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onSupprimer}>
        <Text  style={{ color: 'white', fontSize: 18, marginBottom: 2 ,  }}>
          Supprimer <Image 
                    source={require('../assets/small.png')} 
                    style={styles.notificationImage} 
                />
          </Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
    flexDirection: 'row',
   
  },
  
  button: {

    padding: 8, // Ajuster le padding pour réduire la taille
    borderRadius: 84,
    alignItems: 'center',
    backgroundColor:'#194465',
    marginTop:10,
    marginLeft: 17,
    marginRight: 0,
    width: 155, // Ajustez la largeur selon vos besoins

   
  },
  firstButton: {


  },
  notificationImage: {
    width: 12, // Ajustez la largeur selon vos besoins
    height:12, // Ajustez la hauteur selon vos besoins
  

},
});

export default BoutonProfil;