import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import COLORS from '../Couleurs/COLORS';

const Buttons = ({connexion,Actionconnection,title, onPress=()=>{}}) => {
     //<> </>
   
    return (
        <View style={styles.container}> 
        <TouchableOpacity
        onPress={onPress}
        style={{
           // width:"100%",
           backgroundColor: '#0f75bc',
            justifyContent:'center',
            alignItems:'center',
            marginTop:5,
            borderRadius:210,
            paddingVertical:12,
            
        }}
        
        
        ><Text
        style={{
            color:COLORS.white,
            fontWeight:'70',
            fontSize:20,
          
           
        }}
        
        
        >{title}</Text></TouchableOpacity>
        <Text onPress={Actionconnection}
         style={{
            color:'#646c72',
            fontWeight:'70',
            fontSize:15,
            marginBottom:20,
            marginTop:15,
            textAlign:'center'
           
        }}
        >{connexion} </Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
      width:'90%'
     // flex: 1,
    // justifyContent: 'center',
   //  alignItems: 'center',
    //  backgroundColor: '#f5f5f5',
    },})

export default Buttons;