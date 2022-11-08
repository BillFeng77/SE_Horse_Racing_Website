import json
from flask import Flask, request, render_template
from flask_cors import cross_origin, CORS
from flask_pymongo import PyMongo
from flask.json import jsonify
from bson.json_util import dumps
# pip uninstall bson  # pip uninstall pymongo    # pip install pymongo


app = Flask(__name__)
CORS(app)
app.config['MONGO_URI'] = "mongodb+srv://Pat:13008391115Sjc@cluster0.oamulll.mongodb.net/Horse_information_dataset_v1"
mongo = PyMongo(app)


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
    horse_info_db = mongo.db
    # insert = horse_info_db["UserList"].insert_one(
    #     {"email": "1111", "password": "2222", "userName": "2233"})

    find = horse_info_db["UserList"].find()
    data = dumps(list(find))
    return data


@app.route('/messages')
def get_messages_from_mongodb():
    horse_info_db = mongo.db

    find = horse_info_db["Comments"].find()
    data = dumps(list(find))
    return data


if __name__ == '__main__':
    app.run(debug=True)
