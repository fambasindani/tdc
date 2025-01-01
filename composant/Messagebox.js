import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet,Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ConfirmationModal = ({ visible, message, onConfirm, onCancel}) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, styles.roundedCorners]}>
          <Text style={styles.message}>{message}</Text>
      
          <View style={styles.buttonContainer}>
         
            <TouchableOpacity
              style={styles.button}
              onPress={onConfirm}
            >
                 
              <Text style={styles.buttonText}>Oui </Text>
              <Icon name="check-circle" size={15} color="white" style={styles.iconn}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={onCancel}
            >
              <Text style={styles.buttonText}>Non </Text>
              <Icon name="cancel" size={15} color="white" style={styles.iconn}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const Messagebox = ({modalVisible, handelDelete, setModalVisible, handleConfirm,handleCancel, message}) => {



  return (
    <View style={styles.container}>
    
      <ConfirmationModal
        visible={modalVisible}
        message={message}
        onConfirm={handleConfirm}
        //onConfirm={handelDelete}
        onCancel={handleCancel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   // flex: 1,
   // justifyContent: 'center',
  //  alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    width: '80%',
  },
  roundedCorners: {
    borderRadius: 5,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    flexDirection: 'row', 
    backgroundColor: '#607079',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 18,
  },
  buttonText: {
    flexDirection: 'row', 
    color: 'white',
    fontSize: 14,
    
  },
  iconn: {
    marginTop:1.9,
    
    },

});

export default Messagebox;