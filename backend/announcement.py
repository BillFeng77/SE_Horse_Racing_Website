from bson.json_util import dumps
from config import app, mongo
import json
from flask import request
from flask_pymongo import ObjectId
db = mongo.db


@app.route("/api/announcements", methods=['GET'])
def get_announcements_from_db():
    # Return the latest announcements from db

    # Returns:
    #    returnData(json):the latest announcements
    result = db["Announcements"].find().sort("id", -1)
    returnData = dumps(list(result)[0])
    return returnData


@app.route("/api/announcements", methods=['POST'])
def insert_an_announcement_to_db():
    # Save an announcement to db and add new field (id)

    # Returns:
    #    (str): a notification
    data = request.form
    newdata = json.dumps(data)
    doc = json.loads(newdata)
    id = db["Announcements"].insert_one(doc).inserted_id
    counter = update_counter_announcements()
    db["Announcements"].update_one(
        {'_id': ObjectId(id)}, {"$set": {'id': counter}})
    return "Published sccessfully"


def update_counter_announcements():
    # Generate new ids for announcements based on time sequence

    # Returns:
    #    counter(int): a new id for announcement
    db = mongo.db
    db["Counters_Announcements"].find_one_and_update(
        {'type': "announcements"},
        {'$inc': {'counter': 1}})
    counter = db["Counters_Announcements"].find_one()['counter']
    return counter
