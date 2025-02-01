import React from 'react';

// Définition de l'URL de base de l'API
//const API_BASE_URL = 'http://192.168.88.147:1200/api/';
const API_BASE_URL = 'https://famba.pythonanywhere.com/api/';
//const API_BASE_URLS = 'http://192.168.38.147:1200/';

// Composant Url pour les API
const ApiUrl = ({ endpoint, params = {} }) => {
  // Construire l'URL complète avec les paramètres
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  return url.toString();
};




export default ApiUrl;