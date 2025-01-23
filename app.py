from flask import Flask, jsonify, send_from_directory,request
from flask_cors import CORS
from controller.usercontroller import create_user, update_user,update_imageuser,verifieremail, login,getuserid,getuser
from controller.arretcontroller import create_arret, update_arret, delete_arret, getarret
from controller.categoriecontroller import create_categorie, update_categorie, getcategorie
from controller.itinerairecontroller import create_itineraire, update_itineraire, getitineraire
from controller.vehiculecontroller import create_vehicule, update_vehicule, getvehicule
from controller.tarificationcontroller import create_tarification, gettarification, update_tarification
from controller.coursecontroller import getcourseid, create_course, getcourses, update_course
from controller.versementcontroller import embarquement, depart, arriver, comptertour,getversement,calculate_minutes
from flask_jwt_extended import jwt_required, get_jwt_identity, JWTManager, create_access_token


#IP_ADDRESS = '192.168.38.147' "msg": "Token has expired" 
IP_ADDRESS = '192.168.43.147'  
PORT = 1200

app = Flask(__name__)

CORS(app)
app.config['JWT_SECRET_KEY'] = '1254857@fb'
jwt = JWTManager(app)

#controller pour le users
@app.route('/api/create_user', methods=['POST'])
def api_create_user():
    return (create_user())

@app.route('/api/getuser', methods=['GET'])
#@jwt_required()
def api_getuser():
    return (getuser())    

@app.route('/api/login', methods=['POST'])
def api_loginr():
    return (login())

@app.route('/api/verifieremail', methods=['POST'])
def api_verifieremail():
    return (verifieremail())

@app.route('/api/update_user/<int:id>', methods=['PUT'])
def api_update_user(id):
      return (update_user(id))


@app.route('/api/getuserid/<int:id>', methods=['GET'])
def api_getuserid(id):
      return (getuserid(id))

@app.route('/api/update_image/<int:id>', methods=['PUT'])
def api_update_imageuser(id):
      return (update_imageuser(id))  





#controller pour arret
@app.route('/api/create_arret', methods=['POST'])
def api_create_arret():
    return (create_arret())    

@app.route('/api/update_arret/<int:id>', methods=['PUT'])
def api_update_arret(id):
      return (update_arret(id))    

@app.route('/api/delete_arret/<int:id>', methods=['DELETE'])
def api_delete_arret(id):
      return (delete_arret(id))


@app.route('/api/getarret', methods=['GET'])
def api_get_arraet():
    return (getarret())



#controller pour catégorie
@app.route('/api/create_categorie', methods=['POST'])
def api_create_categorie():
    return (create_categorie()) 

@app.route('/api/update_categorie/<int:id>', methods=['PUT'])
def api_update_categorier(id):
      return (update_categorie(id))

@app.route('/api/getcategorie', methods=['GET'])
def api_get_categorie():
    return (getcategorie()) 


#controller pour le itineraire
@app.route('/api/create_itineraire', methods=['POST'])
def api_create_itineraire():
    return (create_itineraire())


@app.route('/api/update_itineraire/<int:id>', methods=['PUT'])
def api_update_itineraire(id):
      return (update_itineraire(id))

@app.route('/api/getitineraire', methods=['GET'])
def api_get_itineraire():
    return (getitineraire())



#controller pour le vehicule
@app.route('/api/create_vehicule', methods=['POST'])
def api_create_vehicule():
    return (create_vehicule())

@app.route('/api/update_vehicule/<int:id>', methods=['PUT'])
def api_update_vehicule(id):
      return (update_vehicule(id))


@app.route('/api/getvehicule', methods=['GET'])
def api_getvehicule():
    return (getvehicule())



#controller pour la tarification
@app.route('/api/create_tarification', methods=['POST'])
def api_create_tarification():
    return (create_tarification())

@app.route('/api/gettarification', methods=['GET'])
def api_gettarification():
    return (gettarification())


@app.route('/api/update_tarification/<int:id>', methods=['PUT'])
def api_update_tarification(id):
      return (update_tarification(id))



#controller pour la course
@app.route('/api/create_course', methods=['POST'])
def api_create_course():
    return (create_course())

@app.route('/api/getcourses', methods=['GET'])
def api_getcourses():
    return (getcourses())

@app.route('/api/update_course/<int:id>', methods=['PUT'])
def api_update_course(id):
      return (update_course(id))

@app.route('/api/getcourseid/<string:id>', methods=['GET'])
def api_getcourseid(id):
      return (getcourseid(id))


#controller versement  

@app.route('/api/embarquement', methods=['POST'])
def api_embarquement():
    return (embarquement())

@app.route('/api/depart', methods=['POST'])
def api_depart():
    return (depart())

@app.route('/api/arriver', methods=['POST'])
def api_arriver():
    return (arriver())

@app.route('/api/comptertour', methods=['POST'])
def api_comptertour():
    return (comptertour())

@app.route('/api/getversement', methods=['POST'])
def api_getversement():
    return (getversement())

@app.route('/api/calculate_minutes', methods=['POST'])
def api_calculate_minutes():
    return (calculate_minutes())







if __name__ == '__main__':
    app.run(host=IP_ADDRESS, port=PORT, debug=True)