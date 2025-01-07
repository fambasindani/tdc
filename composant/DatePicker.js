import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Assurez-vous d'importer l'icône
import COLORS from '../Couleurs/COLORS';

const DatePicker = ({ date, setDate, label }) => {
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    if (event.type === 'set') { // Vérifiez le type d'événement
      const currentDate = selectedDate || date;
      setShow(false); // Fermez le picker
      setDate(currentDate); // Mettez à jour la date
    } else {
      setShow(false); // Fermez le picker si l'utilisateur annule
    }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={showDatepicker} style={styles.pickerWrapper}>
        <Icon name="calendar-today" size={20} style={styles.icon} />
        <Text style={styles.dateText}>
          {date ? date.toLocaleDateString() : 'Sélectionner une date'}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    color: COLORS.black,
    marginBottom: 5,
    fontSize: 16,
    marginLeft: 20,
  },
  pickerWrapper: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  icon: {
    color: COLORS.grey,
    marginLeft: 10,
  },
  dateText: {
    flex: 1,
    color: COLORS.grey,
    marginLeft: 10,
    justifyContent: 'center',
  },
});

export default DatePicker;