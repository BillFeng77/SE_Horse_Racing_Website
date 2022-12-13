from bson.json_util import dumps
from config import app, mongo


# get all horse information in db
@app.route('/api/horseInfo', methods=['GET'])
def getHorseInformation():
    db = mongo.db
    find = db["Horse"].find()
    data = dumps(list(find))
    return data
