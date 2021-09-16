import hashlib
from flask import Flask, render_template, jsonify, request, url_for, redirect, flash
import jwt
from datetime import datetime, timedelta
import time

from bson.objectid import ObjectId

app = Flask(__name__)

from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.Yanudu
SECRET_KEY = 'YANUDU'
app.config["SECRET_KEY"] = 'YANUDU'

#토큰 유효성 확인
def checkExpired():
    if request.cookies.get('mytoken') is not None:
        return True
    else:
        return False

# API 역할을 하는 부분
@app.route('/list/view', methods=['GET'])
def show_list():
    author = list(db.list.find({}, {'_id': False}).sort('like', -1))
    return jsonify({'bucket_authors': author})


#좋아요 기능
@app.route('/list/like', methods=['POST'])
def like_list():
    print('asdf')
    name_receive = request.form['name_give']
    print(name_receive)
    target_list = db.list.find_one({'_id':ObjectId(name_receive)})
    print(target_list)
    current_like = target_list['likes']

    new_like = current_like + 1

    db.list.update_one({'_id': ObjectId(name_receive)}, {'$set': {'likes': new_like}})

    return jsonify({'msg': '좋아요 완료!'})


@app.route('/')
def main():
    tokenExist = checkExpired()
    all_list = list(db.list.find({}))
    return render_template('home.html', token = tokenExist, all_list=all_list)

@app.route('/login')
def loginpage():
    return render_template('login.html')

@app.route('/login/signin', methods=['POST'])
def signin():
    id_receive = request.form.get('id_give')
    password_receive = request.form.get('password_give')
    password = hashlib.sha256(password_receive.encode('utf-8')).hexdigest()
    result = db.users.find_one({'id':id_receive, 'password':password})

    if result is not None:
        payload = {
            'id': id_receive,
            'exp': datetime.utcnow() + timedelta(seconds=5)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
        return jsonify({'result': 'success', 'token':token})
    else:
        return jsonify({'result': 'fail', 'msg': '아이디/비밀번호가 일치하지 않습니다.'})

@app.route('/user/logout')
def logout():
    return jsonify({"result": "success"})

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/signup/check_dup', methods=['POST'])
def checkdup():
    id_receive = request.form.get('id_give')
    exists = bool(db.users.find_one({"id":id_receive}))
    print(exists)
    return jsonify({'result': 'success', 'exists':exists})

@app.route('/signup/post', methods=['POST'])
def signupPost():
    id_receive = request.form.get('id_give')
    password_receive = request.form.get('password_give')
    password = hashlib.sha256(password_receive.encode('utf-8')).hexdigest()
    user = {
        "id": id_receive,
        "password" : password
    }
    db.users.insert(user)
    return jsonify({'result':'success'})

@app.route('/list_save')
def save():
    tokenExist = checkExpired()
    return render_template('list_save.html', token = tokenExist)

@app.route('/list_detail/<id>')
def detail(id):
    tokenExist = checkExpired()
    bson_id = ObjectId(id)
    post = db.list.find_one({'_id':bson_id})
    # print(post)
    return render_template('list_detail.html', post=post, token = tokenExist)

@app.route('/list_update/<id_data>')
def update(id_data):
    tokenExist = checkExpired()
    bson_id = ObjectId(id_data)
    post = db.list.find_one({'_id':bson_id})
    print(post)
    return render_template('list_update.html', post=post, token = tokenExist)

@app.route('/search')
def search():
    try:
        tokenExist = checkExpired()

    except jwt.ExpiredSignatureError:
        tokenExist = False
    except jwt.exceptions.DecodeError:
        tokenExist = False

    text = request.args.get('search')
    # text는 form으로 데이터를 받음
    splitted_keywords = text.split(' ')
    # text를 공백으로 나눠서 여러가지가 검색될수 있도록함 이때 split된 데이터는 리스트로 만들어짐
    pipelines = list()
    pipelines.append({
        '$sample': {'size': 1}
    })
    search_R = list(db.list.aggregate(pipelines))

    sep_keywords = []
    for string in splitted_keywords:
        sep_keywords.append({'$or': [
            {'title': {'$regex': string}},
            {'content': {'$regex': string}}
        ]})

    search = list(db.list.find({"$or": sep_keywords}, {'_id': False}).sort('create_date', -1))
    if text == "":
        return render_template('search.html', keywords=splitted_keywords, search=search_R, token=tokenExist)
    else:
        return render_template('search.html', keywords=splitted_keywords, search=search, token=tokenExist)

@app.route('/list_save', methods=['POST'])
def listSave():
    file_receive = request.files['file_give']
    title_receive = request.form['title_give']
    content_receive = request.form['content_give']
    token_receive = request.cookies.get('mytoken')
    payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
    print(payload)
    user_info = db.user.find_one({"id": payload['id']})

    extension = file_receive.filename.split('.')[-1]
    file_name = file_receive.filename.split('.')[0]
    print(extension)
    print(file_name)
    # today = datetime.now()
    # mytime = today.strftime('%Y-%m-%d-%H-%M-%S')

    # filename = f'file_receive-{mytime}'

    save_to = f'static/img/{file_name}.{extension}'

    file_receive.save(save_to)

    doc = {
        'title': title_receive,
        'content': content_receive,
        'file': f'{file_name}.{extension}',
        # 'create_date': today.strftime('%Y.%m.%d.%H.%M.%S'),
        'author': payload['id'],
        'likes' : 0
    }

    db.list.insert_one(doc)

    # print(title_receive, title_receive, content_receive)

    return jsonify({'msg':'저장완료!'})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)