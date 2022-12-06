from flask import Flask
from flask import request,Quotes
db = mongo.db
@app.route('api/search',methods=['get'])
def search():
    content=request.form.get('content')
    if content is None:
        content=''
    quotes=Quotes.query.filter(Quotes.content.like("%"+content+"%")if content is not None else "").all()
    return quotes