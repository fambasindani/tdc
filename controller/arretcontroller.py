from flask import jsonify, request, send_from_directory, send_file, url_for
from  connexion. myconnection  import get_connection
from flask_bcrypt import Bcrypt
import os
from flask_jwt_extended import jwt_required, get_jwt_identity, JWTManager, create_access_token




 
def  create_arret():
    
    conn = get_connection()
    cur = conn.cursor()

    try:
        description = request.form.get('description')
       
        cur.execute("INSERT INTO arrets (description) VALUES (%s)", (description,))
        conn.commit()
         
        cur.close()

        return 'Opération effectuée.'

    except Exception as e:
        conn.rollback()
        print(f"Erreur lors de la création de arret : {str(e)}")
        return 'Erreur lors de la création de arret'   
    




    
def  update_arret(id):
 
    conn = get_connection()
    cur = conn.cursor()

    try:
        description = request.form.get('description')   
      
        #cursor = db.cursor()
       
     
        #monimage = "user.png"
        cur.execute("UPDATE  arrets SET description=%s  WHERE id=%s", (description,  id))
        conn.commit()
         
        cur.close()

        return 'Opération effectuée.'

    except Exception as e:
        conn.rollback()
        print(f"Erreur lors de la modification arret : {str(e)}")
        return 'Erreur lors de la modification arret'               



      
def delete_arret(id):
    conn = get_connection()
    cur = conn.cursor()

    try:
        # Exécutez la commande de suppression
        cur.execute("DELETE FROM arrets WHERE id=%s", (id,))
        conn.commit()
        
        cur.close()
        
        return 'Opération effectuée.'

    except Exception as e:
        conn.rollback()
        print(f"Erreur lors de la suppression arrêt : {str(e)}")
        return 'Erreur lors de la suppression arrêt'           
    


          
def getarret():
    try:
        # Connexion à la base de données
        conn = get_connection()
        cursor = conn.cursor()

        # Récupération des données des utilisateurs
        cursor.execute("SELECT id,  description FROM arrets")
        arrets = cursor.fetchall()

        # Conversion des données en format JSON
        data = []
        #for id, nom, postnom, prenom, email, password, avatar, telephone in users:
        for id, description in arrets:
           # image_url = f'/static/Image/{avatar}'
            data.append({
                'id': id,
                'description': description,
                #'postnom': postnom,    
               # 'prenom': prenom,
                #'email': email,
                #'password': password,
                 #'avatar': image_url,
                #'telephone': telephone,
               # 'url':avatar
            })

        return data

    except Exception as e:
       
        #print(f"Erreur lors de la création de la localisation : {str(e)}")
        return 'Erreur'
    

    
   
    