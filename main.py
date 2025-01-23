from flask import Flask, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity, JWTManager, create_access_token
import mysql.connector
from flask_bcrypt import Bcrypt
from flask_cors import CORS

from controller.api import geteudiant, login, register, upload_pdf, add, delete,update



#IP_ADDRESS = '192.168.38.147'  
IP_ADDRESS = '192.168.43.147'  
PORT = 1200

app = Flask(__name__)

CORS(app)
app.config['JWT_SECRET_KEY'] = '1254857@fb'
jwt = JWTManager(app)







@app.route('/api/update/<int:id>', methods=['PUT'])
#@jwt_required()
def update_student(id):
    return update(id)


@app.route('/api/add', methods=['POST'])
@jwt_required()
def add_etudiant():
    return add()









@app.route('/api/register', methods=['POST'])
@jwt_required()
def register_route():
    return register()

@app.route('/api/login', methods=['POST'])
#@jwt_required()
def login_route():
    return login()

# Route Flask pour afficher des données depuis la base de données
@app.route('/', methods=['GET'])
#@jwt_required()
def getetudiant_route():
    return geteudiant()


@app.route('/api/delete/<int:id>', methods=['DELETE'])
#@jwt_required()
def delete_student(id):
    return delete(id)

@app.route('/api/pdf', methods=['POST'])
@jwt_required()
def pdfupload_route():
    return upload_pdf()


if __name__ == '__main__':
    app.run()