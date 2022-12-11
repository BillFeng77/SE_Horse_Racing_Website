from bson.json_util import dumps
from config import app, mongo
import json
from flask import request
from flask_pymongo import ObjectId
db = mongo.db


@app.route("/api/announcements", methods=['GET'])
def get_announcements_from_db():
    print(db)
    # find = db["Announcements"].find()
    result = db["Announcements"].find().sort("id", -1)
    return dumps(list(result)[0])


@app.route("/api/announcements", methods=['POST'])
def insert_an_announcement_to_db():
    data = request.form
    newdata = json.dumps(data)  # type: str
    doc = json.loads(newdata)  # str to json
    id = db["Announcements"].insert_one(doc).inserted_id
    counter = update_counter_announcements()
    db["Announcements"].update_one(
        {'_id': ObjectId(id)}, {"$set": {'id': counter}})  # assign new id
    return "Published sccessfully"


def update_counter_announcements():
    db = mongo.db
    db["Counters_Announcements"].find_one_and_update(
        {'type': "announcements"},
        {'$inc': {'counter': 1}})

    return db["Counters_Announcements"].find_one()['counter']
