import { useState } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Modal, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../Couleurs/COLORS';
import * as ImagePicker from 'expo-image-picker';

export default function Imagephoto({ setimage, defimage, setdefimage, image, selectFromGallery, takePhoto, modalVisible, setModalVisible }) {
  const defaultImage = require('../assets/user.png');

  // Fonction pour prendre une photo
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={image ? { uri: image.uri } : { uri: defimage }}
          style={styles.image}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="photo-camera" size={15} color="white" />
        </TouchableOpacity>
      </View>

      {/* Modal pour choisir entre prendre une photo ou sélectionner une image */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalView} onStartShouldSetResponder={() => true}>
            <Text style={styles.modalText}>Choisir une option</Text>
            <View style={styles.iconRow}>
              <TouchableOpacity style={styles.iconItem} onPress={takePhoto}>
                <Icon name="camera-alt" size={40} color="gray" />
                <Text style={styles.iconText}>Caméra</Text>
              </TouchableOpacity>
              <Image
                source={require('../assets/linear.png')}
                style={styles.linear}
              />
              <TouchableOpacity style={styles.iconItem} onPress={selectFromGallery}>
                <Icon name="photo" size={40} color="gray" />
                <Text style={styles.iconText}>Galerie</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonsText}>ANNULER</Text>
              <Icon name="cancel" size={15} color="white" style={styles.iconn} />
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blanccasse,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    marginVertical: 10,
    width: '90%',
    marginBottom: 20,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderColor: '#cecece',
    borderWidth: 0.1,
    resizeMode: 'cover',
  },
  iconContainer: {
    position: 'absolute',
    bottom: 20,
    right: 0,
    backgroundColor: '#1d1309',
    padding: 10,
    borderRadius: 25,
    shadowColor: 'blue',
    shadowOffset: {
      width: 5,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: COLORS.blanccasse,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  modalText: {
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginBottom: 20,
  },
  iconItem: {
    alignItems: 'center',
  },
  iconText: {
    textAlign: 'center',
    marginTop: 15,
  },
  closeButton: {
    flexDirection: 'row',
    backgroundColor: '#135067',
    borderRadius: 50,
    padding: 9,
    marginVertical: 10,
    alignItems: 'center',
    width: '65%',
    borderColor: 'black',
    borderWidth: 0.1,
  },
  iconn: {
    marginTop: 1,
  },
  buttonsText: {
    marginLeft: 59,
    color: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  linear: {
    width: 95,
    height: 7,
    marginTop: 20,
  },
});