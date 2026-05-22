import os
from flask import Flask, request, jsonify, url_for
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.admin import setup_admin
from api.models import db
from api.routes import api
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.url_map.strict_slashes = False

# 1. Configuración de la llave secreta para JWT
# Asegúrate de tener JWT_SECRET_KEY en tu archivo .env
app.config["JWT_SECRET_KEY"] = os.environ.get(
    "JWT_SECRET_KEY", "clave-super-secreta")

# 2. Inicialización de JWTManager
jwt = JWTManager(app)

# Configuración de base de datos
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

MIGRATE = Migrate(app, db)
db.init_app(app)

# Permitir CORS para todos los orígenes
CORS(app)

# Configuración del panel de administración
setup_admin(app)

# Registro de Blueprints (aquí se incluyen tus rutas)
app.register_blueprint(api, url_prefix='/api')

# Manejo de errores


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Generar sitemap con todas las rutas


@app.route('/')
def sitemap():
    return generate_sitemap(app)


# Ejecución del servidor
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
