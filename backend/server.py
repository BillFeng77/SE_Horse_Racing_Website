import json
from flask import request
from bson.json_util import dumps

from main import *
from news import *
from users import *
from forum import *
from horseInfo import *
from announcement import *
from news_comments import *
# pip uninstall bson  # pip uninstall pymongo    # pip install pymongo

db = mongo.db


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




if __name__ == '__main__':
    app.run(debug=True)
