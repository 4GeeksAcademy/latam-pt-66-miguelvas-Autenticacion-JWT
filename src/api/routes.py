from flask import Flask, request, jsonify, Blueprint
from api.models import db, User
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)
CORS(api)


@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    email = body.get("email")
    password = body.get("password")

    # Crear nuevo usuario
    new_user = User(email=email, password=password, is_active=True)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuario creado exitosamente"}), 201


@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    email = body.get("email")
    password = body.get("password")

    # Buscar usuario en la base de datos
    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        return jsonify({"message": "Credenciales inválidas"}), 401

    # Crear token si el usuario existe
    access_token = create_access_token(identity=str(user.id))
    return jsonify({"access_token": access_token, "user_id": user.id}), 200


@api.route('/private', methods=['GET'])
@jwt_required()
def get_private_data():
    # Extraemos el ID del usuario que guardamos en el token durante el login
    current_user_id = get_jwt_identity()

    # Buscamos al usuario en la base de datos usando ese ID
    user = User.query.get(current_user_id)

    if user is None:
        return jsonify({"message": "Usuario no encontrado"}), 404

    # Retornamos el email, que es exactamente lo que Private.jsx está esperando para mostrar: {userData.email}
    return jsonify({
        "message": "Acceso concedido",
        "email": user.email
    }), 200
