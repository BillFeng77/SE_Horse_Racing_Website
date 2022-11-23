import json
from flask import request
from bson.json_util import dumps

from main import *
from news import *
from forum import *
from horseInfo import *
# pip uninstall bson  # pip uninstall pymongo    # pip install pymongo

db=mongo.db

@app.route('/')
def index():
    return "<h1 > Home page </h1>"

# send data to frontend by "serversideprops"

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


@app.route('/user')
def get_data_from_mongodb():
    db = mongo.db
    # insert = db["UserList"].insert_one(
    #     {"email": "1111", "password": "2222", "userName": "2233"})

    find = db["UserList"].find()
    data = dumps(list(find))
    return data

#拿马
def getHorseInformation():
    db=mongo.db
    #db[]

if __name__ == '__main__':
    app.run(debug=True)
