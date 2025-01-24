from flask import jsonify, request, send_from_directory, send_file, url_for
from  connexion. myconnection  import get_connection

import os
from flask_jwt_extended import jwt_required, get_jwt_identity, JWTManager, create_access_token

import time


          
def getjustification():
    try:
        # Connexion à la base de données
        conn = get_connection()
        cursor = conn.cursor()

        # Récupération des données des utilisateurs
        cursor.execute("SELECT id, nom, prenom, email,  avatar, telephone, adresse, idjustification,datej,justification, idtype, description FROM listejustifications order by id asc")
        users = cursor.fetchall()

        # Vérification si des utilisateurs ont été trouvés
        if not users:
            return []

        # Conversion des données en format JSON
        data = []
        for id, nom, prenom, email,  avatar, telephone, adresse , idjustification,datej,justification , idtype, description in users:
            image_url = f'/static/Image/{avatar}' if avatar else None  # Vérification de l'avatar
            data.append({
                'id': id,
                'nom': nom,
               
                'prenom': prenom,
                'email': email,
                #'password': password,  # Note: ne pas inclure le mot de passe dans les données retournées.
                'avatar': image_url,
                'telephone': telephone,
                'adresse': adresse,
                'url': avatar,
                'idjustification': idjustification,
                'datej': datej,
                'description': description,
                'idtype': idtype
            })

        return data

    except Exception as e:
        print(f"Erreur lors de la récupération des données utilisateur : {str(e)}")
        return 'Erreur'

    finally:
        # Assurez-vous que la connexion à la base de données est fermée
        cursor.close()
        conn.close() 



def  create_justification():
    
    conn = get_connection()
    cur = conn.cursor()

    try:
        iduser = request.form.get('iduser')
        datej = request.form.get('datej')
        idj = request.form.get('idj')
       # justification = request.form.get('justification')
        cur.execute("INSERT INTO justifications (iduser,datej,idj) VALUES (%s, %s, %s)", (iduser,datej,idj))
        conn.commit()
         
        cur.close()

        return 'Opération effectuée.'

    except Exception as e:
        conn.rollback()
        print(f"Erreur lors de la création de categorie : {str(e)}")
        return 'Erreur lors de la création de catégorie'  


       
def gettypejust():
    try:
        # Connexion à la base de données
        conn = get_connection()
        cursor = conn.cursor()

        # Récupération des données des utilisateurs
        cursor.execute("SELECT id,  description FROM type_justifications")
        just = cursor.fetchall()

        # Conversion des données en format JSON
        data = []
  
        for id, description in just:
         
            data.append({
                'id': id,
                'description': description,
               
            })

        return data

    except Exception as e:
       
      
        return e
    
                 
    


