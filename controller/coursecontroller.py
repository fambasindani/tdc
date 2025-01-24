from flask import jsonify, request, send_from_directory, send_file, url_for
from  connexion. myconnection  import get_connection

import os
from flask_jwt_extended import jwt_required, get_jwt_identity, JWTManager, create_access_token





  
def  create_course():
   
    conn = get_connection()
    cur = conn.cursor()

    try:
        iduser = request.form.get('iduser') 
        idvehicule = request.form.get('idvehicule')
        idtarification = request.form.get('idtarification')
        datecourse = request.form.get('datecourse')
        montant = request.form.get('montant')
        idtarification = request.form.get('idtarification')
        #iduser=1
        #idvehicule=1
        #idtarification=1
       

        cur.execute("INSERT INTO courses (iduser, idvehicule,idtarification, datecourse, montant) VALUES (%s,%s,%s,%s,%s)", (iduser, idvehicule, idtarification, datecourse, montant))
        conn.commit()
        cur.close()
        return 'Opération effectuée.'

    except Exception as e:
        conn.rollback()
        print(f"Erreur lors de la création de courses : {str(e)}")
        return 'Erreur lors de la création de courses'
    




def  update_course(id):
   
    conn = get_connection()
    cur = conn.cursor()

    try:
        iduser = request.form.get('iduser') 
        idvehicule = request.form.get('idvehicule')
        idtarification = request.form.get('idtarification')
        datecourse = request.form.get('datecourse')
        montant = request.form.get('montant')
        idtarification = request.form.get('idtarification')
        #iduser=1
        #idvehicule=1
        #idtarification=1
     
        #monimage = "user.png"
        cur.execute("UPDATE  courses SET iduser=%s, idvehicule=%s,idtarification=%s, datecourse=%s, montant=%s  WHERE id=%s", (iduser, idvehicule,idtarification,datecourse,montant, id))
        conn.commit()
         
        cur.close()

        return 'Opération effectuée.'

    except Exception as e:
        conn.rollback()
        print(f"Erreur lors de la modification de course : {str(e)}")
        return 'Erreur lors de la modification de course'
    



           
def getcourses():
    try:
        # Connexion à la base de données
        conn = get_connection()
        cursor = conn.cursor()

        # Récupération des données des utilisateurs
        cursor.execute("SELECT id,nom, prenom, immatriculation, marque, montant, datecourse, iduser, idtarification, idvehicule, avatar, description FROM listecourses order by id desc ")
        courses = cursor.fetchall()

     
        data = []
    
        for id,nom, prenom, immatriculation, marque, montant, datecourse,iduser, idtarification, idvehicule , avatar, description in courses:
            image_url = f'/static/Image/{avatar}' if avatar else None  
          
            data.append({
                'id': id,
                'nom': nom,
                'prenom': prenom,
                'immatriculation': immatriculation,
                'marque': marque,
                'montant': montant,
                'datecourse': datecourse,
                'iduser': iduser,
                'idtarification': idtarification,
                'idvehicule': idvehicule,
                'avatar': image_url,
                'url': avatar,
                'description': description,
          
            })

        return data

    except Exception as e:
       
       
        return 'Erreur'




          
def getcourseid(id):
    try:
        # Connexion à la base de données
        conn = get_connection()
        cursor = conn.cursor()

        # Récupération des données des utilisateurs
        cursor.execute("SELECT id,nom, prenom, immatriculation, marque, montant, datecourse, iduser, idtarification, idvehicule, avatar FROM listecourses WHERE datecourse=%s order by id asc ",(id,))
        courses = cursor.fetchall()

     
        data = []
    
        for id,nom, prenom, immatriculation, marque, montant, datecourse,iduser, idtarification, idvehicule , avatar in courses:
            image_url = f'/static/Image/{avatar}' if avatar else None  
          
            data.append({
                'id': id,
                'nom': nom,
                'prenom': prenom,
                'immatriculation': immatriculation,
                'marque': marque,
                'montant': montant,
                'datecourse': datecourse,
                'iduser': iduser,
                'idtarification': idtarification,
                'idvehicule': idvehicule,
                'avatar': image_url,
                'url': avatar,
          
            })

        return data

    except Exception as e:
       
       
        return 'Erreur'
    
   
    


