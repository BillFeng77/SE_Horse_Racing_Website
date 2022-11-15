import json
from flask import Flask, request, render_template
from flask_cors import cross_origin, CORS
from flask_pymongo import PyMongo
from flask_pymongo import ObjectId
from flask.json import jsonify
from bson.json_util import dumps
# pip uninstall bson  # pip uninstall pymongo    # pip install pymongo


app = Flask(__name__)
CORS(app)
app.config['MONGO_URI'] = "mongodb+srv://Pat:13008391115Sjc@cluster0.oamulll.mongodb.net/Horse_information_dataset_v1"
mongo = PyMongo(app)
db = mongo.db


@app.route('/')
def index():
    return "<h1 > Home page </h1>"

# send data to frontend by "serversideprops"


@app.route('/user')
def user():
    return json.dumps([{'name': 'alice',
                       'email': 'alice@outlook.com'},
                       {'name': 'jny',
                       'email': 'jny@outlook.com'},
                       {'name': 'yyy',
                       'email': 'yyy@outlook.com'}])

# send data to frontend by axios


@app.route('/news')
def news():
    return json.dumps({'title': 'derby',
                       'content': 'it wins'})

# get data from frontend


@app.route('/api/query', methods=['POST'])
# @cross_origin(origins='http://localhost:3000')
def get_query_from_react():
    data = request.form
    newdata = json.dumps(data)
    print(newdata)
    return newdata


@app.route('/name', methods=['GET', 'POST'])
def get_dates():
    sd = request.form.get('first')
    print(sd)
    return


@app.route('/mongouser')
def get_data_from_mongodb():
    db = mongo.db
    # insert = db["UserList"].insert_one(
    #     {"email": "1111", "password": "2222", "userName": "2233"})

    find = db["UserList"].find()
    data = dumps(list(find))
    return data


# FORUM
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

#拿马
def getHorseInformation():
    db=mongo.db
    db[]

if __name__ == '__main__':
    app.run(debug=True)
