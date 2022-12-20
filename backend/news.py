from bson.json_util import dumps
from config import app, mongo
import json
from flask import request
from flask_pymongo import ObjectId
db = mongo.db


@app.route("/api/news", methods=['GET'])
def get_news_from_db():
    # Get all news from db

    # Returns:
    #    data(json): all news documents in db
    find = db["News"].find()
    data = dumps(list(find))
    return data


@app.route("/api/news", methods=['POST'])
def insert_a_news_to_db():
    # Save a news to db and add new fields(likes, dislikes)

    # Returns:
    #    (str): a notification
    data = request.form
    newdata = json.dumps(data)
    doc = json.loads(newdata)
    id = db["News"].insert_one(doc).inserted_id
    db["News"].update_one(
        {'_id': ObjectId(id)}, {"$set": {'likes': 0}})
    db["News"].update_one(
        {'_id': ObjectId(id)}, {"$set": {'dislikes': 0}})
    return "Published sccessfully"


@app.route('/api/news/<news_title>/likes', methods=['POST'])
def like_a_news(news_title):
    # Increase likes number of a news by 1

    # Parameters:
    #    news_title (str): title of the news that is liked

    # Returns:
    #    returnData(str): updated likes number of the news that is liked
    is_exist = db["News"].count_documents({"title": news_title}, limit=1)
    if is_exist == False:
        return "Posting Error: news does not exist", 400

    db["News"].update_one({"title": news_title}, {"$inc": {'likes': 1}})
    data = db["News"].find_one({"title": news_title})["likes"]
    returnData = str(data)
    return returnData


@app.route('/api/news/<news_title>/dislikes', methods=['POST'])
def dislike_a_news(news_title):
    # Increase dislikes number of a news by 1

    # Parameters:
    #    news_title (str): title of the news that is disliked

    # Returns:
    #    returnData(str): updated dislikes number of the news that is disliked
    is_exist = db["News"].count_documents({"title": news_title}, limit=1)
    if is_exist == False:
        return "Posting Error: news does not exist", 400

    db["News"].update_one({"title": news_title}, {
        "$inc": {'dislikes': 1}})
    data = db["News"].find_one({"title": news_title})["dislikes"]
    returnData = str(data)
    return returnData
