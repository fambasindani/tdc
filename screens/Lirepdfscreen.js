import React, { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Asset } from 'expo-asset';

const Lirepdfscreen = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Chemin du fichier PDF local
  const pdfUri = Asset.fromModule(require('../assets/Manuel.pdf')).uri;

  const downloadAndOpenPDF = async () => {
    setLoading(true);
    setError(false);

    try {
      // Chemin pour sauvegarder le PDF dans le répertoire des documents
      const fileUri = FileSystem.documentDirectory + 'Manuel.pdf';

      // Vérifiez si le fichier existe déjà pour éviter de le copier à nouveau
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists) {
        // Copier le fichier depuis l'assets vers le document directory
        await FileSystem.copyAsync({
          from: pdfUri,
          to: fileUri,
        });
      }

      // Partager le PDF téléchargé
      await Sharing.shareAsync(fileUri);
    } catch (err) {
      console.error('Erreur de téléchargement :', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Likunzi.png')} style={styles.logo} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>Erreur de chargement</Text>}
      {!loading && !error && (
        <TouchableOpacity style={styles.button} onPress={downloadAndOpenPDF}>
          <Text style={styles.buttonText}>Ouvrir le Manuel PDF</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  logo: {
    width: 100,
    height: 130,
    marginBottom: 70,
  },
  button: {
    backgroundColor: '#976666',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 80,
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    width: '100%',
  },
  errorText: {
    color: 'red',
    marginTop: 20,
  },
});

export default Lirepdfscreen;