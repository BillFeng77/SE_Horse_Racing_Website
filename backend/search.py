from flask import Flask
from flask import request,Quotes
from config import app, mongo
db = mongo.db
@app.route('api/search',methods=['GET'])
def search():
    content=request.args.get('value')
    if content is None:
        content=''
    quotes=Quotes.query.filter(
    Quotes.content.like("%" + content + "%") if content is not None else ""

 ).all()

    return quotes