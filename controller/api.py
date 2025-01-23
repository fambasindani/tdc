
from flask import jsonify, request
from flask_bcrypt import Bcrypt
from  connexion.myconnection import get_connection

from flask_jwt_extended import   create_access_token


bcrypt = Bcrypt()


def register():
    db=get_connection()
    email = request.form.get('email')
    password = request.form.get('password')
    name = request.form.get('nom')

    # Cryptage du mot de passe
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Insertion de l'utilisateur dans la base de données
    cur = db.cursor()
    cur.execute("INSERT INTO users (email, password, nom) VALUES (%s, %s, %s)", (email, hashed_password, name))
    db.commit()
    cur.close()

    return jsonify({'message': 'Compte créé avec succès'}), 201





def add():
    db=get_connection()
    nom = request.form.get('nom')
    postnom = request.form.get('postnom')


    # Cryptage du mot de passe
   # hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Insertion de l'utilisateur dans la base de données
    cur = db.cursor()
    cur.execute("INSERT INTO etudiant (nom, postnom) VALUES (%s, %s)", (nom, postnom))
    db.commit()
    cur.close()

    return jsonify({'message': 'Compte créé avec succès'}), 201



def update(etudiant_id):
    db = get_connection()

    # Récupération des données du formulaire
    nom = request.form.get('nom')
    postnom = request.form.get('postnom')

    # Vérification que l'ID est fourni
    if not etudiant_id:
        return jsonify({'message': 'ID requis'}), 400

    # Vérification que nom et postnom sont fournis
    if not nom or not postnom:
        return jsonify({'message': 'Nom et postnom requis'}), 400

    # Mise à jour de l'utilisateur dans la base de données
    cur = db.cursor()
    try:
        # Convertir etudiant_id en entier si nécessaire
        etudiant_id = int(etudiant_id)

        cur.execute(
            "UPDATE etudiant SET nom = %s, postnom = %s WHERE id = %s",
            (nom, postnom, etudiant_id)
        )
        db.commit()

        if cur.rowcount == 0:
            return jsonify({'message': f'Aucun étudiant trouvé avec cet ID: {etudiant_id}'}), 404

        return jsonify({'message': 'Compte mis à jour avec succès'}), 200
    except Exception as e:
        db.rollback()  # Annuler la transaction en cas d'erreur
        return jsonify({'message': f'Erreur lors de la mise à jour du compte: {str(e)}'}), 500
    finally:
        cur.close()
        db.close()  # Assurez-vous de fermer la connexion à la base de données

def delete(id):
    db = get_connection()
    cur = db.cursor()
    try:
        # Exécution de la requête de suppression
        cur.execute("DELETE FROM etudiant WHERE id = %s", (id,))
        db.commit()

        if cur.rowcount == 0:
            return jsonify({'message': 'Étudiant non trouvé'}), 404

        return jsonify({'message': 'Étudiant supprimé avec succès'}), 200

    except Exception as e:
        print(e)
        db.rollback()  # Annuler en cas d'erreur
        return jsonify({'message': 'Erreur lors de la suppression de l\'étudiant'}), 500

    finally:
        cur.close()  # Assurez-vous de fermer le curseur
        db.close()   # Fermer la connexion à la base de données



def login():
    email =  request.form.get('email')
    password =  request.form.get('password')
    db=get_connection()
    # Vérification de l'utilisateur dans la base de données
    cur = db.cursor()
    cur.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cur.fetchone()
    cur.close()

   # if user and user[4] == password:
    #motdepasse= bcrypt.check_password_hash(user[4], password)
    if user and bcrypt.check_password_hash(user[4], password):
        # Création du token d'accès
        access_token = create_access_token(identity=user[0])
        return jsonify({'access_token': access_token}), 200
    else:
        return jsonify({'message': 'Identifiants invalides'}), 401


#@jwt_required()
def geteudiant():
    db=get_connection()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM etudiant")
    result = cursor.fetchall()

    # Création d'une liste de dictionnaires représentant les données des étudiants
    students = []
    for row in result:
        student = {
            'id': row[0],
            'nom': row[1],
            'prenom': row[2],
            # Ajoutez d'autres champs selon votre structure de table
        }
        students.append(student)

    # Renvoie les données des étudiants au format JSON
    return jsonify(students)



def upload_pdf():
    db=get_connection()
    if 'pdf' in request.files:
        file = request.files['pdf']
        filename = file.filename

       # file.save('GsCarriere/mesfichiers/' + filename)
        file.save('/home/famba/mysite/GsCarriere/mesfichiers/' + filename)

        cur = db.cursor()
        cur.execute("INSERT INTO fichiers (fichier) VALUES (%s)", (filename,))
        db.commit()
        cur.close()

        return jsonify('Fichier PDF {} enregistré avec succès.'.format(filename))
    else:
        return jsonify('Aucun fichier PDF n\'a été fourni.')