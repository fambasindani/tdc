from flask import jsonify, request, send_from_directory, send_file, url_for
from  connexion. myconnection  import get_connection
from flask_bcrypt import Bcrypt
import os
from flask_jwt_extended import jwt_required, get_jwt_identity, JWTManager, create_access_token
from werkzeug.utils import secure_filename
import time
#import psycopg2  # ou un autre module selon votre base de données






def create_user():
    bcrypt = Bcrypt()
    conn = get_connection()
    cur = conn.cursor()

    try:
        conn.autocommit = False
        nom = request.form.get('nom')
        email = request.form.get('email')
        password = request.form.get('password')
        adresse = request.form.get('adresse')
        telephone = request.form.get('telephone')
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        
        # Insertion dans la table users
        monimage = "user.png"
        cur.execute(
            "INSERT INTO users (nom, email, password, avatar, telephone, adresse) VALUES (%s, %s, %s, %s, %s, %s)",
            (nom, email, hashed_password, monimage, telephone, adresse)
        )
        
        # Récupération de l'ID de l'utilisateur nouvellement créé
        iduser = cur.lastrowid

        # Insertion dans la table roles
        libelle = "abonne"
        cur.execute("INSERT INTO roles (iduser, libelle) VALUES (%s, %s)", (iduser, libelle))
        
        # Commit des changements
        conn.commit()

        return 'Opération effectuée.'

    except Exception as e:
        # Rollback en cas d'erreur
        conn.rollback()
        print(f"Erreur lors de la création de user : {str(e)}")
        return 'Erreur lors de la création de user'
    
    finally:
        # Fermeture du curseur et de la connexion
        cur.close()
        conn.close()



def create_role():
    bcrypt = Bcrypt()
    conn = get_connection()
    cur = conn.cursor()

    try:
        conn.autocommit = False
        nom = request.form.get('nom')
        email = request.form.get('email')
        password = request.form.get('password')
        adresse = request.form.get('adresse')
        telephone = request.form.get('telephone')
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        role = request.form.get('role')
        
        # Insertion dans la table users
        monimage = "user.png"
        cur.execute(
            "INSERT INTO users (nom, email, password, avatar, telephone, adresse) VALUES (%s, %s, %s, %s, %s, %s)",
            (nom, email, hashed_password, monimage, telephone, adresse)
        )
        
        # Récupération de l'ID de l'utilisateur nouvellement créé
        iduser = cur.lastrowid

        # Insertion dans la table roles
       # libelle = "abonne"
        cur.execute("INSERT INTO roles (iduser, libelle) VALUES (%s, %s)", (iduser, role))
        
        # Commit des changements
        conn.commit()

        return 'Opération effectuée.'

    except Exception as e:
        # Rollback en cas d'erreur
        conn.rollback()
        print(f"Erreur lors de la création de user : {str(e)}")
        return 'Erreur lors de la création de user'
    
    finally:
        # Fermeture du curseur et de la connexion
        cur.close()
        conn.close()   





def  update_role():
    bcrypt = Bcrypt()
    conn = get_connection()
    cur = conn.cursor()

    try:
        conn.autocommit = False
        password = request.form.get('password')
        nom = request.form.get('nom')   
        role = request.form.get('role')
        prenom = request.form.get('prenom')
        adresse = request.form.get('adresse')
        telephone = request.form.get('telephone')
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        iduser = request.form.get('iduser') 
        idrole = request.form.get('idrole')
        #cursor = db.cursor()
       
     
        #monimage = "user.png"
        cur.execute("UPDATE  users SET nom=%s,telephone=%s, adresse=%s, password=%s WHERE id=%s", (nom,telephone, adresse, hashed_password, iduser))
        cur.execute("UPDATE  roles SET  libelle=%s WHERE id=%s ", ( role, idrole))
        
        conn.commit()
         
        cur.close()

        return 'Opération effectuée.'

    except Exception as e:
        conn.rollback()
        print(f"Erreur lors de la modification de user : {str(e)}")
        return 'Erreur lors de la modification de user'
    
                



def  update_user(id):
    bcrypt = Bcrypt()
    conn = get_connection()
    cur = conn.cursor()

    try:
        conn.autocommit = False
        password = request.form.get('password')
        nom = request.form.get('nom')   
        #postnom = request.form.get('postnom')
        prenom = request.form.get('prenom')
        adresse = request.form.get('adresse')
        telephone = request.form.get('telephone')
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        #cursor = db.cursor()
       
     
        #monimage = "user.png"
        cur.execute("UPDATE  users SET nom=%s, prenom=%s,telephone=%s, adresse=%s, password=%s WHERE id=%s", (nom, prenom,telephone, adresse, hashed_password, id))
        conn.commit()
         
        cur.close()

        return 'Opération effectuée.'

    except Exception as e:
        conn.rollback()
        print(f"Erreur lors de la modification de user : {str(e)}")
        return 'Erreur lors de la modification de user'
    
   
    
    
def login():
    
    try:
        conn = get_connection()
        cursor = conn.cursor()
        bcrypt = Bcrypt()
        email = request.form.get('email')
        password = request.form.get('password')

        # Vérification de l'utilisateur dans la base de données
        cursor.execute("SELECT * FROM listeusers WHERE email = %s", (email,))
        user = cursor.fetchone()
        conn.close()

        if user and bcrypt.check_password_hash(user[4], password):
            # Création du token d'accès
           # access_token = create_access_token(identity=user[0])
            response = {
               # 'access_token': access_token,
                'user': {
                    'id': user[0],
                    'nom': user[1],
                    #'postnom': user[2],
                    'prenom': user[2],
                    'email': user[3],
                    'role': user[10]
                }
            }
            return response
        else:
            return 'password'
    except Exception as e:
        # Gérer les exceptions ici
        print(f"Une erreur est survenue : {e}")
        return 'Une erreur est survenue', 500


        






def update_imageuser(id):
    BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    conn = get_connection()
    cur = conn.cursor()

    try:
        # Chemin du dossier d'images
        image_dir = os.path.join(BASE_DIR, 'static', 'Image')

        # Vérifiez et créez le dossier si nécessaire
        if not os.path.exists(image_dir):
            os.makedirs(image_dir)

        if 'image' in request.files:
            file = request.files['image']
            print("Fichier reçu :", file.filename)

            # Assurez-vous de sécuriser le nom de fichier d'origine
            original_filename = secure_filename(file.filename)
            extension = os.path.splitext(original_filename)[1]  # Obtenir l'extension du fichier

            # Créer le nouveau nom de fichier avec un timestamp
            timestamp = int(time.time())  # Obtenir le timestamp actuel
            new_filename = f"user_{id}_{timestamp}{extension}"  # Nouveau nom de fichier
            image_path = os.path.join(image_dir, new_filename)
            print("image_path:", image_path)

            # Sauvegarder l'image
            file.save(image_path)

            # Mettre à jour le nom de l'image dans la base de données
            cur.execute("UPDATE users SET avatar=%s WHERE id=%s", (new_filename, id))
            conn.commit()

            return {'message': 'Opération effectuée avec succès.'}, 200

        return {'error': 'Aucune image fournie.'}, 400

    except Exception as e:
        print(f"Erreur lors de la sauvegarde : {str(e)}")
        conn.rollback()
        return {'error': 'Opération échouée.'}, 500

    finally:
        cur.close()
        conn.close()



 
    
def verifieremail():
    try:
        email = request.form.get('email')
        conn = get_connection()
        cursor = conn.cursor()
        query = "SELECT COUNT(*) FROM users WHERE email = %s"
        cursor.execute(query, (email,))
        count = cursor.fetchone()[0]

        if count > 0:
            return('email')
        else:
            return("email n'existe pas")
    except Exception as e:
        return(f"Une erreur est survenue : {e}")  




            
def getuserid(id):
    try:
        # Connexion à la base de données
        conn = get_connection()
        cursor = conn.cursor()

        # Récupération des données des utilisateurs
        cursor.execute("SELECT id, nom, prenom, email, password, avatar, telephone, adresse FROM users WHERE id=%s", (id,))
        users = cursor.fetchall()

        # Vérification si des utilisateurs ont été trouvés
        if not users:
            return []

        # Conversion des données en format JSON
        data = []
        for id, nom, prenom, email, password, avatar, telephone, adresse in users:
            image_url = f'/static/Image/{avatar}' if avatar else None  # Vérification de l'avatar
            data.append({
                'id': id,
                'nom': nom,
               
                'prenom': prenom,
                'email': email,
                'password': password,  # Note: ne pas inclure le mot de passe dans les données retournées.
                'avatar': image_url,
                'telephone': telephone,
                'adresse': adresse,
                'url': avatar
            })

        return data

    except Exception as e:
        print(f"Erreur lors de la récupération des données utilisateur : {str(e)}")
        return 'Erreur'

    finally:
        # Assurez-vous que la connexion à la base de données est fermée
        cursor.close()
        conn.close()          



           
def getuser():
    try:
        # Connexion à la base de données
        conn = get_connection()
        cursor = conn.cursor()

        # Récupération des données des utilisateurs
        cursor.execute("SELECT id, nom, prenom, email, password, avatar, telephone, adresse FROM users")
        users = cursor.fetchall()

        # Vérification si des utilisateurs ont été trouvés
        if not users:
            return []

        # Conversion des données en format JSON
        data = []
        for id, nom, prenom, email, password, avatar, telephone, adresse in users:
            image_url = f'/static/Image/{avatar}' if avatar else None  # Vérification de l'avatar
            data.append({
                'id': id,
                'nom': nom,
               
                'prenom': prenom,
                'email': email,
                'password': password,  # Note: ne pas inclure le mot de passe dans les données retournées.
                'avatar': image_url,
                'telephone': telephone,
                'adresse': adresse,
                'url': avatar
            })

        return data

    except Exception as e:
        print(f"Erreur lors de la récupération des données utilisateur : {str(e)}")
        return 'Erreur'

    finally:
        # Assurez-vous que la connexion à la base de données est fermée
        cursor.close()
        conn.close()                  



def get_role():
    try:
        # Connexion à la base de données
        conn = get_connection()
        cursor = conn.cursor()

        # Récupération des données des utilisateurs, excluant ceux avec le rôle 'abonne'
        cursor.execute("""
            SELECT id, nom, prenom, email, password, avatar, telephone, adresse, libelle, idrole 
            FROM listeusers 
            WHERE libelle <> 'abonne'
        """)
        users = cursor.fetchall()

        # Vérification si des utilisateurs ont été trouvés
        if not users:
            return []

        # Conversion des données en format JSON
        data = []
        for id, nom, prenom, email, password, avatar, telephone, adresse, libelle, idrole in users:
            image_url = f'/static/Image/{avatar}' if avatar else None  # Vérification de l'avatar
            data.append({
                'id': id,
                'nom': nom,
                'prenom': prenom,
                'email': email,
                'libelle': libelle,  # Ajout du rôle
                'avatar': image_url,
                'telephone': telephone,
                'adresse': adresse,
                'idrole': idrole,
                'url': avatar
            })

        return data

    except Exception as e:
        print(f"Erreur lors de la récupération des données utilisateur : {str(e)}")
        return f"Erreur : {str(e)}"

    finally:
        # Assurez-vous que la connexion à la base de données est fermée
        cursor.close()
        conn.close()        