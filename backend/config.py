from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_jwt_extended import JWTManager

app = Flask(__name__)

# connect to LiTags database
app.config['MONGO_URI'] = "mongodb+srv://Pat:13008391115Sjc@cluster0.oamulll.mongodb.net/Horse_information_dataset_v1"
mongo = PyMongo(app)
CORS(app)
app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
jwt = JWTManager(app)
