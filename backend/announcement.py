from bson.json_util import dumps
from config import app, mongo
import json
from flask import request
from flask_pymongo import ObjectId
db = mongo.db


# return the latest announcements from db
@app.route("/api/announcements", methods=['GET'])
def get_announcements_from_db():
    print(db)
    result = db["Announcements"].find().sort("id", -1)
    return dumps(list(result)[0])


# save an announcement to db and add new field (id)
@app.route("/api/announcements", methods=['POST'])
def insert_an_announcement_to_db():
    data = request.form
    newdata = json.dumps(data)
    doc = json.loads(newdata)
    id = db["Announcements"].insert_one(doc).inserted_id
    counter = update_counter_announcements()
    db["Announcements"].update_one(
        {'_id': ObjectId(id)}, {"$set": {'id': counter}})
    return "Published sccessfully"


# generate new ids for announcements based on time sequence
def update_counter_announcements():
    db = mongo.db
    db["Counters_Announcements"].find_one_and_update(
        {'type': "announcements"},
        {'$inc': {'counter': 1}})

    return db["Counters_Announcements"].find_one()['counter']
