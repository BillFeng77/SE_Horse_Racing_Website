from bson.json_util import dumps
from main import app, mongo
import json
from flask import request
db = mongo.db


@app.route('/api/users', methods=['GET'])
def get_users_from_mongodb():
    # insert = db["UserList"].insert_one(
    #     {"email": "1111", "password": "2222", "userName": "2233"})

    find = db["UserList"].find()
    data = dumps(list(find))
    return data


@app.route("/api/users", methods=['POST'])
def insert_a_user_to_db():
    data = request.form
    newdata = json.dumps(data)  # type: str
    doc = json.loads(newdata)  # str to json
    insert = db["UserList"].insert_one(doc)
    return newdata


@app.route("/api/users/<userName>", methods=['DELETE'])
def delete_a_user_in_db(userName):
    # data = request.form
    # userName = data["userName"]  # doesn't work
    # newdata = json.dumps(data)
    # doc = json.loads(newdata)

    # db["Comments"].delete_many({})   # delete all data
    is_exist = db["UserList"].count_documents({"userName": userName}, limit=1)
    if is_exist == False:
        return "Account does not exist"

    db["UserList"].delete_one({"userName": userName})
    return "Account " + userName + " is terminated"
