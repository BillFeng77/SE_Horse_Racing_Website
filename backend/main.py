from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)

# connect to LiTags database
app.config['MONGO_URI'] = "mongodb+srv://Pat:13008391115Sjc@cluster0.oamulll.mongodb.net/Horse_information_dataset_v1"
mongo = PyMongo(app)
CORS(app)