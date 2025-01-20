import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import COLORS from '../Couleurs/COLORS';

const CheckComposant = ({totalChecked, setTotalChecked, riderChecked, setRiderChecked,mySumChecked, setMySumChecked}) => {
 // const [totalChecked, setTotalChecked] = useState(false);
  //const [riderChecked, setRiderChecked] = useState(false);
  //const [mySumChecked, setMySumChecked] = useState(false);

  const handleCheckBoxChange = (type) => {
    setTotalChecked(false);
    setRiderChecked(false);
    setMySumChecked(false);

    if (type === 'somme') {
      setTotalChecked(true);
    } else if (type === 'rider') {
      setRiderChecked(true);
    } else if (type === 'mySum') {
      setMySumChecked(true);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisissez une option :</Text>
      <View style={styles.checkboxContainer}>
        <CheckBox
          checked={totalChecked}
          onPress={() => handleCheckBoxChange('somme')}
          containerStyle={styles.checkbox}
        />
        <Text style={styles.checkboxLabel}>Somme</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          checked={riderChecked}
          onPress={() => handleCheckBoxChange('rider')}
          containerStyle={styles.checkbox}
        />
        <Text style={styles.checkboxLabel}>Somme par motard</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          checked={mySumChecked}
          onPress={() => handleCheckBoxChange('mySum')}
          containerStyle={styles.checkbox}
        />
        <Text style={styles.checkboxLabel}>Liste par motard</Text>
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: COLORS.blanccasse,
    borderRadius: 10,
    //margin: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5, // Espace entre les lignes
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  checkboxLabel: {
   // marginLeft: 5, // Réduire l'espace entre la case à cocher et le texte
    fontSize: 16,
  },
});

export default CheckComposant;