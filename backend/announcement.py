from bson.json_util import dumps
from config import app, mongo
import json
from flask import request
db = mongo.db


@app.route("/api/announcements", methods=['GET'])
def get_announcements_from_db():
    print(db)
    find = db["Announcements"].find()
    data = dumps(list(find))
    return data


@app.route("/api/announcements", methods=['POST'])
def insert_an_announcement_to_db():
    data = request.form
    newdata = json.dumps(data)  # type: str
    doc = json.loads(newdata)  # str to json
    insert = db["Announcements"].insert_one(doc)
    return "Published sccessfully"
