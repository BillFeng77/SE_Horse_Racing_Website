from config import app, mongo
from flask import request, jsonify
from flask_jwt_extended import create_access_token, \
    unset_jwt_cookies
db = mongo.db


# user authentication and authorization, return access token, username, and usertype
@app.route('/api/usertoken', methods=["POST"])
def create_token():
    email = request.form.get("email")
    password = request.form.get("password")
    find = db["UserList"].find({"email": email, "password": password})
    result_list = list(find)
    if len(result_list) == 0:
        return {"msg": "Wrong email or password"}, 401
    access_token = create_access_token(identity=email)
    response = {"access_token": access_token,
                "username": result_list[0]['username'], "usertype": result_list[0]['usertype']}
    return response


# register, save user information to db
@app.route('/api/register', methods=["POST"])
def register():
    email = request.form.get("email")
    username = request.form.get("username")
    password = request.form.get("password")
    usertype = request.form.get("usertype")
    find_email = db["UserList"].find({"email": email})
    find_username = db["UserList"].find({"username": username})
    if len(list(find_email)) == 0 and len(list(find_username)) == 0:
        insert = db["UserList"].insert_one(
            {"email": email, "username": username, "password": password, "usertype": usertype})
        return {"msg": "successfully registered!"}
    else:
        return {"msg": "account already existed"}, 409


# logout, terminate access token
@app.route("/api/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


# delete a user from db
@app.route("/api/users/<username>", methods=['DELETE'])
def delete_a_user_in_db(username):
    is_exist = db["UserList"].count_documents({"username": username}, limit=1)
    if is_exist == False:
        return "Account does not exist"

    db["UserList"].delete_one({"username": username})
    return "Account " + username + " is terminated"
