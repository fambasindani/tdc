


import mysql.connector
from mysql.connector import Error

# Définir les informations de connexion à la base de données MySQL
config = {
    
   'user': 'root',
    'password': 'admin',
    'host': 'localhost',
    'database': 'bdtdc',
    'raise_on_warnings': True
    
}

def get_connection():
    """Établir une connexion à la base de données et la retourner."""
    try:
        conn = mysql.connector.connect(**config)
        if conn.is_connected():
            return conn
    except Error as e:
        print(f"Erreur lors de la connexion à MySQL : {e}")
        return None