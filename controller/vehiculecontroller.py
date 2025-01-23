from flask import jsonify, request, send_from_directory, send_file, url_for
from  connexion. myconnection  import get_connection

import os
from flask_jwt_extended import jwt_required, get_jwt_identity, JWTManager, create_access_token





  
def  create_vehicule():
   
    conn = get_connection()
    cur = conn.cursor()

    try:
        iduser = request.form.get('iduser') 
        idcat = request.form.get('idcat')
        immatriculation = request.form.get('immatriculation')
        num_chassies = request.form.get('num_chassies')
        marque = request.form.get('marque')
       # iduser=1
        cur.execute("INSERT INTO vehicules (iduser, idcat, immatriculation, num_chassies,marque) VALUES (%s,%s,%s,%s,%s)", (iduser, idcat, immatriculation, num_chassies, marque))
        conn.commit()
        cur.close()
        return 'Opération effectuée.'

    except Exception as e:
        conn.rollback()
        print(f"Erreur lors de la création de vehicule : {str(e)}")
        return 'Erreur lors de la création de vehicule'
    




def  update_vehicule(id):
   
    conn = get_connection()
    cur = conn.cursor()

    try:
        iduser = request.form.get('iduser') 
        idcat = request.form.get('idcat')
        immatriculation = request.form.get('immatriculation')
        num_chassies = request.form.get('num_chassies')
        marque = request.form.get('marque')
        iduser=1
     
        #monimage = "user.png"
        cur.execute("UPDATE  vehicules SET iduser=%s, idcat=%s,immatriculation=%s, num_chassies=%s, marque=%s WHERE id=%s", (iduser, idcat,immatriculation,num_chassies, marque, id))
        conn.commit()
         
        cur.close()

        return 'Opération effectuée.'

    except Exception as e:
        conn.rollback()
        print(f"Erreur lors de la modification de vehicules : {str(e)}")
        return 'Erreur lors de la modification de vehicules'
    



           
def getvehicule():
    try:
        # Connexion à la base de données
        conn = get_connection()
        cursor = conn.cursor()

        # Récupération des données des utilisateurs
        cursor.execute("SELECT id,iduser, idcat, immatriculation, marque, num_chassies, description,nom, prenom, telephone, email,avatar FROM listevehicules")
        vehicules = cursor.fetchall()

     
        data = []
    
        for id,iduser, idcat, immatriculation, marque, num_chassies, description, nom, prenom, telephone, email, avatar in vehicules:
            image_url = f'/static/Image/{avatar}' if avatar else None  
            data.append({
                'id': id,
                'iduser': iduser,
                'idcat': idcat,
                'immatriculation': immatriculation,
                'marque': marque,
                'numero_chassies': num_chassies,
                'description': description,
                'avatar': image_url,
                'url': avatar,
                'nom': nom,
                'prenom': prenom,
                'telephone': telephone,
                'email': email

          
            })

        return data

    except Exception as e:
       
       
        return 'Erreur'
    
   
    


