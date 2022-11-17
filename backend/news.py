from bson.json_util import dumps
from main import app, mongo
import json
db=mongo.db
@app.route("/news")
def get_news_from_db():
    print(db)
    find = db["News"].find()
    data = dumps(list(find))
    return data