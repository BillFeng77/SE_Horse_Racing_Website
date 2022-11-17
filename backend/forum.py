# FORUM
import json
from bson.json_util import dumps
from main import app, mongo
from flask_pymongo import ObjectId
from flask import request

@app.route('/messages', methods=['GET'])
def get_messages_from_mongodb():
    db = mongo.db

    find = db["Comments"].find().sort("count", -1)
    data = dumps(list(find))
    return data


@app.route('/messages', methods=['POST'])
def insert_message_to_mongodb():
    db = mongo.db
    data = request.form
    newdata = json.dumps(data)  # type: str
    doc = json.loads(newdata)  # str to json
    id = db["Comments"].insert_one(doc).inserted_id
    counter = update_counter_forum()
    db["Comments"].update_one(
        {'_id': ObjectId(id)}, {"$set": {'count': counter}})  # assign new id based on 评论的先后顺序
    db["Comments"].update_one(
        {'_id': ObjectId(id)}, {"$set": {'likes': 0}})
    db["Comments"].update_one(
        {'_id': ObjectId(id)}, {"$set": {'dislikes': 0}})

    # print('request.form:', request.form)    all data in string type
    return newdata


# generate a increasing number as the new id of messages in forum, according to 评论的先后顺序
def update_counter_forum():
    db = mongo.db
    db["Counters_Messages_Forum"].find_one_and_update(
        {'type': "forum"},
        {'$inc': {'counter': 1}})

    return db["Counters_Messages_Forum"].find_one()['counter']