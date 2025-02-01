from flask import jsonify, request, send_from_directory, send_file, url_for
from  connexion. myconnection  import get_connection
from flask_bcrypt import Bcrypt
import os
from flask_jwt_extended import jwt_required, get_jwt_identity, JWTManager, create_access_token




def  create_itineraire():
    
    conn = get_connection()
    cur = conn.cursor()

    try:
        description = request.form.get('description')
        cur.execute("INSERT INTO itinairaires (description) VALUES (%s)", (description,))
        conn.commit()
         
        cur.close()

        return 'Opération effectuée.'

    except Exception as e:
        conn.rollback()
        print(f"Erreur lors de la création de itinéraire : {str(e)}")
        return 'Erreur lors de la création de itinéraire'   
    



       
def  update_itineraire(id):
 
    conn = get_connection()
    cur = conn.cursor()

    try:
        description = request.form.get('description')   
      
       
        cur.execute("UPDATE  itinairaires SET description=%s  WHERE id=%s", (description,  id))
        conn.commit()
         
        cur.close()

        return 'Opération effectuée.'

    except Exception as e:
        conn.rollback()
        print(f"Erreur lors de la modification Itinéraire : {str(e)}")
        return 'Erreur lors de la modification Itinéraire'   



          
def getitineraire():
    try:
        # Connexion à la base de données
        conn = get_connection()
        cursor = conn.cursor()

        # Récupération des données des utilisateurs
        cursor.execute("SELECT id,  description FROM itinairaires")
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
    




     
def delete_itineraire(id):
    conn = get_connection()
    cur = conn.cursor()

    try:
        # Exécutez la commande de suppression
        cur.execute("DELETE FROM itinairaires WHERE id=%s", (id,))
        conn.commit()
        
        cur.close()
        
        return 'Opération effectuée.'

    except Exception as e:
        conn.rollback()
        print(f"Erreur lors de la suppression arrêt : {str(e)}")
        return str(e)           
            


    
            


    
