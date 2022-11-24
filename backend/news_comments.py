import json
from bson.json_util import dumps
from main import app, mongo
from flask_pymongo import ObjectId
from flask import request


@app.route('/api/<news_id>/comments', methods=['GET'])
def get_comments_from_mongodb(news_id):
    db = mongo.db

    result = db["News_Comments"].find({'type': news_id}).sort("id", -1)

    # query path '/api/messages?userName=userName'
    # args = request.args
    # userName = args.get('userName')
    # if userName is not None:
    #     result = db["Comments"].find({"userName": userName})

    return dumps(list(result))


@app.route('/api/<news_id>/comments', methods=['POST'])
def insert_comments_to_mongodb(news_id):
    db = mongo.db
    data = request.form
    newdata = json.dumps(data)  # type: str
    doc = json.loads(newdata)  # str to json
    id = db["News_Comments"].insert_one(doc).inserted_id
    counter = update_counter_news_comments(news_id)
    db["News_Comments"].update_one(
        {'_id': ObjectId(id)}, {"$set": {'id': counter}})  # assign new id based on 评论的先后顺序
    db["News_Comments"].update_one(
        {'_id': ObjectId(id)}, {"$set": {'type': news_id}})

    # print('request.form:', request.form)    all data in string type
    # returnData = db["Comments"].find(ObjectId(id))
    userName = data["userName"]
    content = data["content"]
    type = news_id
    count = counter
    returnData = {"userName": userName,
                  "content": content,
                  "type": type,
                  "id": count
                  }
    return returnData


def update_counter_news_comments(news_id):
    db = mongo.db
    is_exist = db["Counters_News_Comments"].count_documents(
        {'type': news_id}, limit=1)
    print("try to find")
    if is_exist == False:
        db["Counters_News_Comments"].insert_one(
            {'type': news_id, 'counter': 0})
        print("insert")
        return 0
    else:
        db["Counters_News_Comments"].find_one_and_update(
            {'type': news_id},
            {'$inc': {'counter': 1}})
        print("update")

        return db["Counters_News_Comments"].find_one({'type': news_id})['counter']
