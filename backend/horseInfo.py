from bson.json_util import dumps
from main import app, mongo

@app.route('/horseInfo', methods=['GET'])
def getHorseInformation():
    db=mongo.db
    find = db["Test"].find()
    data = dumps(list(find))
    return data