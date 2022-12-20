from bson.json_util import dumps
from config import app, mongo


@app.route('/api/horseInfo', methods=['GET'])
def getHorseInformation():
    # Get all horse information in db

    # Returns:
    #    data(json): all horse documents in db
    db = mongo.db
    find = db["Horse"].find()
    data = dumps(list(find))
    return data
