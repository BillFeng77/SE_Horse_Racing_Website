from bson.json_util import dumps
from config import app, mongo
import json
from flask import request
from flask_pymongo import ObjectId
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
    # insert = db["News"].insert_one(doc)
    id = db["News"].insert_one(doc).inserted_id
    db["News"].update_one(
        {'_id': ObjectId(id)}, {"$set": {'likes': 0}})
    db["News"].update_one(
        {'_id': ObjectId(id)}, {"$set": {'dislikes': 0}})
    return "Published sccessfully"


@app.route('/api/news/<news_title>/likes', methods=['POST'])
def like_a_news(news_title):
    db = mongo.db
    is_exist = db["News"].count_documents({"title": news_title}, limit=1)
    if is_exist == False:
        return "Posting Error: news does not exist", 400

    db["News"].update_one({"title": news_title}, {"$inc": {'likes': 1}})
    # find = db["Comments"].find_one({"id": int(news_title)})
    # data = dumps(find)
    # find = db["News"].find().sort("id", -1)
    # data = dumps(list(find))
    return "updated"


@app.route('/api/news/<news_title>/dislikes', methods=['POST'])
def dislike_a_news(news_title):
    db = mongo.db
    is_exist = db["News"].count_documents({"title": news_title}, limit=1)
    if is_exist == False:
        return "Posting Error: news does not exist", 400

    db["News"].update_one({"title": news_title}, {
        "$inc": {'dislikes': 1}})
    # find = db["News"].find_one({"id": int(news_title)})
    # data = dumps(find)
    return "updated"
