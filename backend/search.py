from flask import Flask,jsonify
from flask import request
from config import app, mongo
db = mongo.db
@app.route('/api/search')
def search():
    query=request.args.get("q")
    results= db["News"].find({ '$or': [
      { 'title': { '$regex': query } },
      { 'content': { '$regex': query } }
    ] })
    return results