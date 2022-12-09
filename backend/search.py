from flask import Flask,jsonify
from flask import request
from config import app, mongo
from bson.json_util import dumps
db = mongo.db
@app.route('/api/search')
def search():
    query=request.args.get("q")
    results= db["News"].find(
      { 'title': { '$regex': query } }
     )
    data=dumps(list(results))
    return data