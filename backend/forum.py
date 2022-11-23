# FORUM
import json
from bson.json_util import dumps
from main import app, mongo
from flask_pymongo import ObjectId
from flask import request


@app.route('/api/messages', methods=['GET'])
def get_messages_from_mongodb():
    db = mongo.db

    result = db["Comments"].find().sort("id", -1)

    # query path '/api/messages?userName=userName'
    # args = request.args
    # userName = args.get('userName')
    # if userName is not None:
    #     result = db["Comments"].find({"userName": userName})

    return dumps(list(result))


@app.route('/api/messages', methods=['POST'])
def insert_message_to_mongodb():
    db = mongo.db
    data = request.form
    newdata = json.dumps(data)  # type: str
    doc = json.loads(newdata)  # str to json
    id = db["Comments"].insert_one(doc).inserted_id
    counter = update_counter_forum()
    db["Comments"].update_one(
        {'_id': ObjectId(id)}, {"$set": {'id': counter}})  # assign new id based on 评论的先后顺序
    db["Comments"].update_one(
        {'_id': ObjectId(id)}, {"$set": {'likes': 0}})
    db["Comments"].update_one(
        {'_id': ObjectId(id)}, {"$set": {'dislikes': 0}})

    # print('request.form:', request.form)    all data in string type
    # returnData = db["Comments"].find(ObjectId(id))
    userName = data["userName"]
    content = data["content"]
    likes = 0
    dislikes = 0
    count = counter
    returnData = {"userName": userName,
                  "content": content,
                  "likes": likes,
                  "dislikes": dislikes,
                  "id": count
                  }
    return returnData


@app.route('/api/messages/<message_id>/likes', methods=['POST'])
def like_a_message_in_mongodb(message_id):
    db = mongo.db
    is_exist = db["Comments"].count_documents({"id": int(message_id)}, limit=1)
    if is_exist == False:
        return "Posting Error: message id does not exist", 400

    db["Comments"].update_one({"id": int(message_id)}, {"$inc": {'likes': 1}})
    # find = db["Comments"].find_one({"id": int(message_id)})
    # data = dumps(find)
    find = db["Comments"].find().sort("id", -1)
    data = dumps(list(find))
    return data


@app.route('/api/messages/<message_id>/dislikes', methods=['POST'])
def dislike_a_message_in_mongodb(message_id):
    db = mongo.db
    is_exist = db["Comments"].count_documents({"id": int(message_id)}, limit=1)
    if is_exist == False:
        return "Posting Error: message id does not exist", 400

    db["Comments"].update_one({"id": int(message_id)}, {
                              "$inc": {'dislikes': 1}})
    find = db["Comments"].find_one({"id": int(message_id)})
    data = dumps(find)
    return data


@app.route('/api/messages/<message_id>', methods=['DELETE'])
def delete_a_message_in_mongodb(message_id):

    db = mongo.db
    # db["Comments"].delete_many({})   # delete all data
    is_exist = db["Comments"].count_documents({"id": int(message_id)}, limit=1)
    if is_exist == False:
        return "Deleting Error: message id does not exist", 400

    db["Comments"].delete_one({"id": int(message_id)})
    return "message " + str(message_id) + " is deleted"

    # generate a increasing number as the new id of messages in forum, according to 评论的先后顺序


def update_counter_forum():
    db = mongo.db
    db["Counters_Messages_Forum"].find_one_and_update(
        {'type': "forum"},
        {'$inc': {'counter': 1}})

    return db["Counters_Messages_Forum"].find_one()['counter']
