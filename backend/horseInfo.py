from bson.json_util import dumps
from config import app, mongo


@app.route('/api/horseInfo', methods=['GET'])
def getHorseInformation():
    db = mongo.db
    find = db["Test"].find()
    data = dumps(list(find))
    return data
