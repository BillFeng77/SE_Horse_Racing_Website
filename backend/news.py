from bson.json_util import dumps
from config import app, mongo
import json
from flask import request
from flask_pymongo import ObjectId
db = mongo.db


# get all news from db
@app.route("/api/news", methods=['GET'])
def get_news_from_db():
    print(db)
    find = db["News"].find()
    data = dumps(list(find))
    return data


# save a news to db and add new fields(likes, dislikes)
@app.route("/api/news", methods=['POST'])
def insert_a_news_to_db():
    data = request.form
    newdata = json.dumps(data)  # type: str
    doc = json.loads(newdata)  # str to json
    id = db["News"].insert_one(doc).inserted_id
    db["News"].update_one(
        {'_id': ObjectId(id)}, {"$set": {'likes': 0}})
    db["News"].update_one(
        {'_id': ObjectId(id)}, {"$set": {'dislikes': 0}})
    return "Published sccessfully"


# increase likes number of a news by 1
@app.route('/api/news/<news_title>/likes', methods=['POST'])
def like_a_news(news_title):
    db = mongo.db
    is_exist = db["News"].count_documents({"title": news_title}, limit=1)
    if is_exist == False:
        return "Posting Error: news does not exist", 400

    db["News"].update_one({"title": news_title}, {"$inc": {'likes': 1}})
    data = db["News"].find_one({"title": news_title})["likes"]
    return str(data)


# increase dislikes number of a news by 1
@app.route('/api/news/<news_title>/dislikes', methods=['POST'])
def dislike_a_news(news_title):
    db = mongo.db
    is_exist = db["News"].count_documents({"title": news_title}, limit=1)
    if is_exist == False:
        return "Posting Error: news does not exist", 400

    db["News"].update_one({"title": news_title}, {
        "$inc": {'dislikes': 1}})
    data = db["News"].find_one({"title": news_title})["dislikes"]
    return str(data)
