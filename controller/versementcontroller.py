from flask import jsonify, request, send_from_directory, send_file, url_for
from  connexion. myconnection  import get_connection

import os
from flask_jwt_extended import jwt_required, get_jwt_identity, JWTManager, create_access_token
from datetime import datetime







def embarquement():
    conn = get_connection()
    cur = conn.cursor()

    try:
        iduser = request.form.get('iduser')
        idcourse = request.form.get('idcourse')
        dateembarquement = request.form.get('dateembarquement')
        observation = 0

        # Vérifiez le nombre d'enregistrements
        cur.execute("SELECT COUNT(*) FROM versements WHERE iduser = %s  AND observation IS  NULL ", (iduser, ))
        count = cur.fetchone()[0]

        if count > 0:
            return "Un embarquement est déjà enregistré pour cet itinéraire."

        # Insérer la date d'embarquement
        cur.execute("INSERT INTO versements (iduser,idcourse, dateembarquement) VALUES (%s, %s, %s)", 
                    (iduser,idcourse, dateembarquement))
        conn.commit()
        cur.close()
        return 'Embarquement enregistré.'

    except Exception as e:
        conn.rollback()
        print(f"Erreur lors de l'enregistrement de l'embarquement : {str(e)}")
        return 'Erreur lors de l\'enregistrement de l\'embarquement'



def depart():
    conn = get_connection()
    cur = conn.cursor()

    try:
        id = request.form.get('idcourse')
        #observation = request.form.get('observation')
        datedepart = request.form.get('datedepart')
        observation=1

        #compter=0
        cur.execute("SELECT MAX(id) FROM versements WHERE idcourse = %s", (id,))
        idmax = cur.fetchone()[0]
        

        # Vérifiez si l'observation est valide
        #if observation == '0':
           # return "L'observation doit être différente de zéro."

        # Vérifiez le nombre d'enregistrements avec dateembarquement != NULL
        cur.execute("SELECT COUNT(*) FROM versements WHERE id = %s AND dateembarquement IS NOT NULL", (idmax,))
        count = cur.fetchone()[0]

        if count == 0:
            #return "Enregistrement de versement non trouvé ou date d'embarquement non enregistrée."
            return "Veuillez d'abord enregistrer l'embarquement."
        
        # Vérifiez si la date de départ a déjà été enregistrée
        cur.execute("SELECT COUNT(*) FROM versements WHERE id = %s AND datedepart IS NOT NULL", (idmax,))
        cp=cur.fetchone()[0]
        if cp > 0:
            return "La date de départ a déjà été enregistrée et ne peut pas être modifiée."

        # Vérifiez si l'observation est valide
        #cur.execute("SELECT observation FROM versement WHERE id = %s", (id,))
       # if cur.fetchone()[0] == 0:
            #eturn "Veuillez d'abord enregistrer l'embarquement."

        # Mettre à jour la date de départ
        cur.execute("UPDATE versements SET datedepart = %s WHERE id = %s", (datedepart, idmax))
        conn.commit()
        cur.close()
        return 'Départ enregistré.'

    except Exception as e:
        conn.rollback()
        print(f"Erreur lors de l'enregistrement du départ : {str(e)}")
        return 'Erreur lors de l\'enregistrement du départ'


def arriver():
    conn = get_connection()
    cur = conn.cursor()

    try:
        id = request.form.get('idcourse')
        #observation = request.form.get('observation')
        datearriver = request.form.get('datearriver')
        observation="1"

        cur.execute("SELECT MAX(id) FROM versements WHERE idcourse = %s", (id,))
        idmax = cur.fetchone()[0]
        


        # Vérifiez si l'observation est valide
        #if observation == '1':
            #return "L'observation doit être différente de zéro."

        # Vérifiez le nombre d'enregistrements avec datedepart != NULL
        cur.execute("SELECT COUNT(*) FROM versements WHERE id = %s AND datedepart IS NOT NULL", (idmax,))
        count = cur.fetchone()[0]

        if count == 0:
            return "Enregistrement de versement non trouvé ou départ non enregistré."

        # Vérifiez si la date d'arrivée a déjà été enregistrée
        cur.execute("SELECT COUNT(*) FROM versements WHERE id = %s AND datearriver IS NOT NULL", (idmax,))
        if cur.fetchone()[0] > 0:
            return "La date d'arrivée a déjà été enregistrée et ne peut pas être modifiée."

        # Vérifiez si l'observation est valide
        #cur.execute("SELECT observation FROM versement WHERE id = %s", (idversement,))
        #if cur.fetchone()[0] == 0:
            #return "Veuillez d'abord enregistrer l'embarquement."

        # Mettre à jour la date d'arrivée
        cur.execute("UPDATE versements SET datearriver = %s, observation = %s  WHERE id = %s", (datearriver,observation, idmax))
        conn.commit()
        cur.close()
        return 'Arrivée enregistrée.'

    except Exception as e:
        conn.rollback()
        print(f"Erreur lors de l'enregistrement de l'arrivée : {str(e)}")
        return 'Erreur lors de l\'enregistrement de l\'arrivée'





def comptertour():
    conn = get_connection()
    cur = conn.cursor()

    try:
        idcourse = request.form.get('idcourse')
        datearriver = request.form.get('datearriver')

        cur.execute("SELECT COUNT(*) FROM versements WHERE idcourse = %s AND DATE(datearriver) = %s", (idcourse, datearriver))
        count = cur.fetchone()[0]

        conn.commit()
        cur.close()
        
        return jsonify({'count': count})

    except Exception as e:
        conn.rollback()
        print(f"Erreur lors du comptage des tours : {str(e)}")
        return jsonify({'error': 'Erreur lors du comptage des tours'}), 500


        
       
        

    except Exception as e:
        conn.rollback()
        print(f"Erreur lors de l'enregistrement du départ : {str(e)}")
        return 'Erreur de comptage'
    



def format_date(date_value):
    """Convertit une chaîne de date ou un objet datetime en format YYYY-MM-DD HH:mm:ss."""
    if date_value:
        if isinstance(date_value, datetime):
            return date_value.strftime('%Y-%m-%d %H:%M:%S')
        elif isinstance(date_value, str):
            dt = datetime.strptime(date_value, '%a, %d %b %Y %H:%M:%S GMT')
            return dt.strftime('%Y-%m-%d %H:%M:%S')
    return None




def getversement():
    try:
        conn = get_connection()
        cursor = conn.cursor()
        
        datearriverdebut = request.form.get('datearriverdebut')
        datearriverfin = request.form.get('datearriverfin')
        iduser = request.form.get('iduser')

        cursor.execute("""
            SELECT id, nom, prenom, immatriculation, marque, montant, 
                   datecourse, iduser, idtarification, idvehicule, 
                   avatar, dateembarquement, datedepart, datearriver, montanttarif  
            FROM listeversements 
            WHERE datearriver BETWEEN %s AND %s AND iduser = %s 
            ORDER BY id
        """, (datearriverdebut, datearriverfin, iduser))
        
        versement = cursor.fetchall()

        data = []

        for row in versement:
            id, nom, prenom, immatriculation, marque, montant, datecourse, iduser, idtarification, idvehicule, avatar, dateembarquement, datedepart, datearriver, montanttarif = row
            
            image_url = f'/static/Image/{avatar}' if avatar else None

            # Assurez-vous que les dates sont des objets datetime
            dateembarquement_dt = dateembarquement if isinstance(dateembarquement, datetime) else datetime.strptime(dateembarquement, '%a, %d %b %Y %H:%M:%S GMT')
            datedepart_dt = datedepart if isinstance(datedepart, datetime) else datetime.strptime(datedepart, '%a, %d %b %Y %H:%M:%S GMT')
            datearriver_dt = datearriver if isinstance(datearriver, datetime) else datetime.strptime(datearriver, '%a, %d %b %Y %H:%M:%S GMT')

            # Calcul des différences en minutes et arrondir
            diff_depart_embarquement = round((datedepart_dt - dateembarquement_dt).total_seconds() / 60.0)
            diff_arriver_depart = round((datearriver_dt - datedepart_dt).total_seconds() / 60.0)

            data.append({
                'id': id,
                'nom': nom,
                'prenom': prenom,
                'immatriculation': immatriculation,
                'marque': marque,
                'montant': montant,
                'datecourse': format_date(datecourse),
                'iduser': iduser,
                'idtarification': idtarification,
                'idvehicule': idvehicule,
                'avatar': image_url,
                'url': avatar,
                'dateembarquement': format_date(dateembarquement),
                'datedepart': format_date(datedepart),
                'datearriver': format_date(datearriver),
                'montanttarif': montanttarif,
                'diff_depart_embarquement_minutes': diff_depart_embarquement,
                'diff_arriver_depart_minutes': diff_arriver_depart,
            })

        return jsonify(data)

    except Exception as e:
        return jsonify({'error': str(e)}), 500



def calculate_minutes():
    dateembarquement = request.form.get('dateembarquement')
    datearriver = request.form.get('datearriver')
    iduser = request.form.get('iduser')

    # Vérifier si les dates sont fournies
    if not dateembarquement or not datearriver:
        return jsonify({'error': 'Les dates doivent être fournies.'}), 400

    try:
        conn = get_connection()
        cursor = conn.cursor()

        # Requête pour calculer la somme des minutes et du montant
        query = """
            SELECT 
                SUM(TIMESTAMPDIFF(MINUTE, dateembarquement, datearriver)) AS minute_total,
                SUM(montanttarif) AS total_montant
            FROM listeversements
            WHERE datearriver BETWEEN %s AND %s AND iduser = %s;
        """
        cursor.execute(query, (dateembarquement, datearriver, iduser))
        result = cursor.fetchone()
        cursor.close()

        # Récupérer les résultats en s'assurant qu'ils ne sont pas None
        total_minutes = result[0] if result[0] is not None else 0
        total_montant = result[1] if result[1] is not None else 0.0

        return jsonify({'total_minutes': total_minutes, 'total_montant': total_montant})

    except Exception as e:
        return jsonify({'error': str(e)}), 500