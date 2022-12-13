import json
from bson.json_util import dumps
from config import app, mongo
from flask_pymongo import ObjectId
from flask import request
from flask_jwt_extended import jwt_required


# get all comments of a news from db and sort them based on their ids
@app.route('/api/<news_title>/comments', methods=['GET'])
def get_comments_from_mongodb(news_title):
    db = mongo.db
    result = db["News_Comments"].find({'type': news_title}).sort("id", -1)
    return dumps(list(result))


# save a comments in db (check login status prior), add new fields(id, type)
@app.route('/api/<news_title>/comments', methods=['POST'])
@jwt_required()
def insert_comments_to_mongodb(news_title):
    db = mongo.db
    data = request.form
    newdata = json.dumps(data)  # type: str
    doc = json.loads(newdata)  # str to json
    id = db["News_Comments"].insert_one(doc).inserted_id
    counter = update_counter_news_comments(news_title)
    db["News_Comments"].update_one(
        {'_id': ObjectId(id)}, {"$set": {'id': counter}})  # assign new id based on 评论的先后顺序
    db["News_Comments"].update_one(
        {'_id': ObjectId(id)}, {"$set": {'type': news_title}})

    userName = data["userName"]
    content = data["content"]
    type = news_title
    count = counter
    returnData = {"userName": userName,
                  "content": content,
                  "type": type,
                  "id": count
                  }
    return returnData


# generate new ids for each news's comments based on time sequence
def update_counter_news_comments(news_title):
    db = mongo.db
    is_exist = db["Counters_News_Comments"].count_documents(
        {'type': news_title}, limit=1)
    print("try to find")
    if is_exist == False:
        db["Counters_News_Comments"].insert_one(
            {'type': news_title, 'counter': 0})
        print("insert")
        return 0
    else:
        db["Counters_News_Comments"].find_one_and_update(
            {'type': news_title},
            {'$inc': {'counter': 1}})
        print("update")

        return db["Counters_News_Comments"].find_one({'type': news_title})['counter']
