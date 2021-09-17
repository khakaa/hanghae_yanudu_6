import hashlib
from flask import Flask, render_template, jsonify, request, url_for, redirect, flash
import jwt
from datetime import datetime, timedelta
import time

from bson.objectid import ObjectId

app = Flask(__name__)

from pymongo import MongoClient

# client = MongoClient('localhost', 27017)
client = MongoClient('mongodb://test:test@localhost', 27017)
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



@app.route('/like_update', methods=['POST'])

def like_list():
    # 브라우저의 쿠키에서 사용자의 토큰을 불러온다.
    token_receive = request.cookies.get('mytoken')
    try:
        # 받아온 암호화된 토큰을 복호화하고, db 값을 이용하여 사용자의 id를 변수에 저장
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.users.find_one({'id': payload['id']})
        id_user = user_info['id']

        # ajax에서 보낸 데이터들을 변수에 저장
        type = request.form['type_give']
        _id_receive = request.form['_id_give']

        # ajax가 보내준 데이터와 db를 이용하여 사용할 변수생성
        target_list = db.list.find_one({'_id': ObjectId(_id_receive)})
        current_like = target_list['likes']
        once = list(db.like.find({'like_id': id_user},{'_id':False}))

        # like db에 들어갈 데이터 document 생성(좋아요를 누른 사용자만 저장됨)
        doc = {
            "post_id": ObjectId(_id_receive),
            "like_id": id_user
        }

        # ajax에서 어떤 type(좋아요)의 입력값을 받았는지 판단
        if type == 'like':
            # like db에 저장된 id들과 현재 로그인된 사용자의 id 비교
            for i in once:
                if id_user == i['like_id']:
                    return jsonify({'msg': '이미 좋아요를 눌렀어요!'})
            # like db에 현재 사용자id가 없다면 추가한후 likes값 최신화
            db.like.insert_one(doc)
            likes = current_like + 1
            db.list.update_one({'_id': ObjectId(_id_receive)}, {'$set': {'likes': likes}})
        else:
            # like db에 현재 사용자id가 저장되어있는지 판단
            if db.like.find_one({'like_id': id_user}):
                # 저장되어있다면 저장된 id를 지우고 likes값 최신화
                db.like.delete_one(doc)
                likes = current_like - 1
                db.list.update_one({'_id': ObjectId(_id_receive)}, {'$set': {'likes': likes}})
            else:
                return jsonify({'msg': '이미 싫어요를 눌렀어요!'})

        # likes값의 최신화가 진행되었으면 msg를 띄운다.
        return jsonify({"result": "success", 'msg': '업데이트 완료!'})

    # 로그인된 사용자가 아니면 return값 출력
    except (jwt.ExpiredSignatureError, jwt.exceptions.DecodeError):
        return redirect(url_for("home"))



@app.route('/submit')
def submit():
    tokenExist = checkExpired()
    return render_template('base.html', token = tokenExist)
    

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
    receive = request.get_json(force=True)
    id_receive = receive['id_give']
    password_receive = receive['password_give']
    password = hashlib.sha256(password_receive.encode('utf-8')).hexdigest()
    result = db.users.find_one({'id':id_receive, 'password':password})
    if result is not None:
        payload = {
            'id': id_receive,
            'exp': datetime.utcnow() + timedelta(seconds=60*60*12)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
        return jsonify({'result': 'success', 'token':token})
    else:
        return jsonify({'result': 'fail', 'msg': '아이디/비밀번호가 일치하지 않습니다.'})

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/signup/check_dup', methods=['POST'])
def checkdup():
    id_receive = request.form.get('id_give')
    exists = bool(db.users.find_one({"id":id_receive}))
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
    bson_id = ObjectId(id)
    post = db.list.find_one({'_id':bson_id})
    tokenExist = checkExpired()

    token_receive = request.cookies.get('mytoken')

    payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])

    userid = db.users.find_one({'id': payload['id']})['id']
    postid = db.list.find_one({'_id':bson_id})['author']
    return render_template('list_detail.html', post=post, token = tokenExist, userid=userid, postid=postid)

@app.route('/list_update/<id_data>')
def update(id_data):
    tokenExist = checkExpired()
    bson_id = ObjectId(id_data)
    post = db.list.find_one({'_id':bson_id})
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

# 글 저장
@app.route('/list_save', methods=['POST'])
def listSave():
    file_receive = request.files['file_give']
    title_receive = request.form['title_give']
    content_receive = request.form['content_give']
    token_receive = request.cookies.get('mytoken')
    payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
    user_info = db.user.find_one({"id": payload['id']})

    extension = file_receive.filename.split('.')[-1]
    file_name = file_receive.filename.split('.')[0]
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

    return jsonify({'msg':'저장완료!'})

# 수정 글 저장
@app.route('/api/list_detail', methods=['PUT'])
def update_post_save():
    title_receive = request.form['title_give']
    content_reiceive = request.form['content_give']
    post_id_receive = request.form['id_give']
    file_receive = request.files.get('file_give')

    extension = file_receive.filename.split('.')[-1]
    file_name = file_receive.filename.split('.')[0]

    save_to = f'static/img/{file_name}.{extension}'

    file_receive.save(save_to)

    doc = {
        'title' : title_receive,
        'content' : content_reiceive,
        'file' : f'{file_name}.{extension}'
    }

    db.list.update_one({'_id':ObjectId(post_id_receive)}, {'$set' : doc})

    return jsonify({'msg' : '수정 완료!'})

# 글 삭제
@app.route('/api/list_detail', methods=['POST'])
def delete_post():
    receive = request.get_json(force=True)
    print(receive)
    id_receive = receive['id_give']
    print(id_receive)
    db.list.delete_one({'_id':ObjectId(id_receive)})
    return jsonify({'msg' : '삭제 완료!'})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)