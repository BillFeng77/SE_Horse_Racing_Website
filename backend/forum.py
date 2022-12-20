import json
from bson.json_util import dumps
from config import app, mongo
from flask_pymongo import ObjectId
from flask import request
from flask_jwt_extended import jwt_required
db = mongo.db


@app.route('/api/messages', methods=['GET'])
def get_messages_from_mongodb():
    # Get all messages from db and sort them based on their ids

    # Returns:
    #    returnData(json): all forum messages
    result = db["Comments"].find().sort("id", -1)
    returnData = dumps(list(result))
    return returnData


@app.route('/api/messages', methods=['POST'])
@jwt_required()
def insert_message_to_mongodb():
    # Save a message in db, add new fields(id, likes, dislikes)

    # Returns:
    #    returnData(obj): message that is jsut saved
    data = request.form
    newdata = json.dumps(data)
    doc = json.loads(newdata)
    id = db["Comments"].insert_one(doc).inserted_id
    counter = update_counter_forum()
    db["Comments"].update_one(
        {'_id': ObjectId(id)}, {"$set": {'id': counter}})
    db["Comments"].update_one(
        {'_id': ObjectId(id)}, {"$set": {'likes': 0}})
    db["Comments"].update_one(
        {'_id': ObjectId(id)}, {"$set": {'dislikes': 0}})

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
    # Increase likes number of a message by 1

    # Parameters:
    #    message_id (str): id of the message that is liked

    # Returns:
    #    returnData(str): updated likes number of the message that is liked
    is_exist = db["Comments"].count_documents({"id": int(message_id)}, limit=1)
    if is_exist == False:
        return "Posting Error: message id does not exist", 400

    db["Comments"].update_one(
        {"id": int(message_id)}, {"$inc": {'likes': 1}})
    data = db["Comments"].find_one({"id": int(message_id)})["likes"]
    returnData = str(data)
    return returnData


@app.route('/api/messages/<message_id>/dislikes', methods=['POST'])
def dislike_a_message_in_mongodb(message_id):
    # Increase dislikes number of a message by 1

    # Parameters:
    #    message_id (str): id of the message that is disliked

    # Returns:
    #    returnData(str): updated dislikes number of the message that is disliked
    is_exist = db["Comments"].count_documents({"id": int(message_id)}, limit=1)
    if is_exist == False:
        return "Posting Error: message id does not exist", 400

    db["Comments"].update_one({"id": int(message_id)}, {
                              "$inc": {'dislikes': 1}})
    data = db["Comments"].find_one({"id": int(message_id)})["dislikes"]
    returnData = str(data)
    return returnData


def update_counter_forum():
    # generate new ids for messages based on time sequence

    # Returns:
    #    counter(int): a new id for message
    db["Counters_Messages_Forum"].find_one_and_update(
        {'type': "forum"},
        {'$inc': {'counter': 1}})
    counter = db["Counters_Messages_Forum"].find_one()['counter']
    return counter
