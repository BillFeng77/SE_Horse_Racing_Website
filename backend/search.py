from flask import request
from config import app, mongo
from bson.json_util import dumps
db = mongo.db


# find and return news whose title contain the query param from db
@app.route('/api/search')
def search():
    query = request.args.get("q")
    query = query.title()
    results = db["News"].find(
        {'title': {'$regex': query}}
    )
    data = dumps(list(results))
    return data
