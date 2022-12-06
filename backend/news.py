from bson.json_util import dumps
from main import app, mongo
import json
from flask import request
db = mongo.db


@app.route("/api/news", methods=['GET'])
def get_news_from_db():
    print(db)
    find = db["News"].find()
    data = dumps(list(find))
    return data


@app.route("/api/news", methods=['POST'])
def insert_a_news_to_db():
    data = request.form
    newdata = json.dumps(data)  # type: str
    doc = json.loads(newdata)  # str to json
    insert = db["News"].insert_one(doc)
    return "Published sccessfully"
