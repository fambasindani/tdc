import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View,Image } from 'react-native';
import COLORS from '../Couleurs/COLORS';

const Boutons = ({Actioninscription, Actionpassword, title, onPress = () => { } }) => {
    //<> </>

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={onPress}
                style={{
                    // width:"100%",
                    backgroundColor: '#0a8ad3',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    borderRadius: 120,
                    paddingVertical: 12,

                }}


            ><Text
                style={{
                    color: COLORS.white,
                  
                    fontSize: 20,


                }}


            >{title}</Text></TouchableOpacity>



            <View style={styles.contenu} >

                <Text icons="envelope" style={styles.texts} onPress={Actioninscription}>
              Créer un compte  <Image 
                    source={require('../assets/small.png')} 
                    style={styles.notificationImage} 
                />
                </Text>
                <Text style={styles.texts} onPress={Actionpassword}>
                    Mot de passe oublié  
                
                </Text>
            </View>


        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: '90%'
        // flex: 1,
        // justifyContent: 'center',
        //  alignItems: 'center',
        //  backgroundColor: '#f5f5f5',
    },
    texts: {

        color: 'gray',
        fontWeight: '10',
        fontSize: 15,
        paddingTop:18,

    },

    contenu: {


        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,


    },

    notificationImage: {
        width: 14, // Ajustez la largeur selon vos besoins
        height: 14, // Ajustez la hauteur selon vos besoins
        padding:-22

     
    },


})

export default Boutons;