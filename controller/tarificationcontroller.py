from flask import jsonify, request, send_from_directory, send_file, url_for
from  connexion. myconnection  import get_connection
from flask_bcrypt import Bcrypt
import os
from flask_jwt_extended import jwt_required, get_jwt_identity, JWTManager, create_access_token




def  create_tarification():
    
    conn = get_connection()
    cur = conn.cursor()

    try:
        montant = request.form.get('montant')
        iditineraire = request.form.get('iditineraire')
        cur.execute("INSERT INTO tarifications (iditineraire,montant) VALUES (%s,%s)", (iditineraire,montant))
        conn.commit()    
        cur.close()

        return 'Opération effectuée.'

    except Exception as e:
        conn.rollback()
        print(f"Erreur lors de la création de tarification : {str(e)}")
        return (f"Erreur : {str(e)}")   
    



       
def  update_tarification(id):
 
    conn = get_connection()
    cur = conn.cursor()

    try:
        montant = request.form.get('montant')
        iditineraire = request.form.get('iditineraire')  
      
       
        cur.execute("UPDATE  tarifications SET iditineraire=%s,  montant=%s  WHERE id=%s", (iditineraire,montant,  id))
        conn.commit()   
        cur.close()

        return 'Opération effectuée.'

    except Exception as e:
        conn.rollback()
        print(f"Erreur lors de la modification Itinéraire : {str(e)}")
        return (f"Erreur : {str(e)}")    



          
def gettarification():
    try:
        # Connexion à la base de données
        conn = get_connection()
        cursor = conn.cursor()

        # Récupération des données des utilisateurs
        cursor.execute("SELECT id,  montant, description, iditineraire FROM listetarifications")
        itineraires = cursor.fetchall()

        # Conversion des données en format JSON
        data = []
  
        for id,  montant, description, iditineraire in itineraires:
         
            data.append({
                'id': id,
                'montant': montant,
                'description': description,
               
                'iditineraire': iditineraire,
               
            })

        return data

    except Exception as e:
       
      
        return 'Erreur'
    


   
def delete_tarification(id):
    conn = get_connection()
    cur = conn.cursor()

    try:
        # Exécutez la commande de suppression
        cur.execute("DELETE FROM tarifications WHERE id=%s", (id,))
        conn.commit()
        
        cur.close()
        
        return 'Opération effectuée.'

    except Exception as e:
        conn.rollback()
        print(f"Erreur lors de la suppression arrêt : {str(e)}")
        return str(e)           
            
    
            


    
