import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const CustomModal = ({ visible, onClose, montant }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <Text style={styles.title}>Résultat</Text>
              <Text style={styles.amount}>Montant : {montant} euros</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent
  },
  modalContainer: {
    height: 60, // Hauteur du modal mise à jour
    width: '80%', // Largeur du modal
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10, // Augmenter le rembourrage pour un meilleur espacement
  },
  title: {
    fontSize: 16, // Taille de police augmentée
    fontWeight: 'bold',
    marginBottom: 5, // Espacement entre le titre et le montant
  },
  amount: {
    fontSize: 14, // Taille de police ajustée pour le montant
  },
});

export default CustomModal;