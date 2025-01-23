from flask import jsonify, request, send_from_directory, send_file, url_for
from  connexion. myconnection  import get_connection
from flask_bcrypt import Bcrypt
import os
from flask_jwt_extended import jwt_required, get_jwt_identity, JWTManager, create_access_token




def  create_categorie():
    
    conn = get_connection()
    cur = conn.cursor()

    try:
        description = request.form.get('description')
        cur.execute("INSERT INTO categories (description) VALUES (%s)", (description,))
        conn.commit()
         
        cur.close()

        return 'Opération effectuée.'

    except Exception as e:
        conn.rollback()
        print(f"Erreur lors de la création de categorie : {str(e)}")
        return 'Erreur lors de la création de catégorie'   
    



       
def  update_categorie(id):
 
    conn = get_connection()
    cur = conn.cursor()

    try:
        description = request.form.get('description')   
      
        #cursor = db.cursor()
       
     
        #monimage = "user.png"
        cur.execute("UPDATE  categories SET description=%s  WHERE id=%s", (description,  id))
        conn.commit()
         
        cur.close()

        return 'Opération effectuée.'

    except Exception as e:
        conn.rollback()
        print(f"Erreur lors de la modification catégorie : {str(e)}")
        return 'Erreur lors de la modification catégorie'   



          
def getcategorie():
    try:
        # Connexion à la base de données
        conn = get_connection()
        cursor = conn.cursor()

        # Récupération des données des utilisateurs
        cursor.execute("SELECT id,  description FROM categories")
        arrets = cursor.fetchall()

        # Conversion des données en format JSON
        data = []
  
        for id, description in arrets:
         
            data.append({
                'id': id,
                'description': description,
               
            })

        return data

    except Exception as e:
       
      
        return 'Erreur'
    
            


    
