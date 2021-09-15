import hashlib
from flask import Flask, render_template, jsonify, request, url_for, redirect, flash
# import jwt
import datetime

from bson.objectid import ObjectId

app = Flask(__name__)

from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.Yanudu
SECRET_KEY = 'YANUDU'
app.config["SECRET_KEY"] = 'YANUDU'
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


@app.route('/list/like', methods=['POST'])
def like_list():
    name_receive = request.form['name_give']
    target_list = db.list.find_one({'name':name_receive})
    current_like = target_list['like']

    new_like = current_like + 1

    db.list.update_one({'name': name_receive}, {'$set': {'like': new_like}})

    return jsonify({'msg': '좋아요 완료!'})


@app.route('/')
def main():
    token = request.cookies.get('mytoken')
    print(token)
    try:
        tokenExist = checkExpired()
        if token is not None:
            return render_template('home.html', tokenExist=tokenExist)
        else:
            flash("로그인 정보가 없습니다")
            return render_template('login.html')
    except jwt.ExpiredSignatureError:
        flash("로그인 시간이 만료되었습니다.")
        return render_template('login.html')
    except jwt.exceptions.DecodeError:
        flash("로그인 정보가 없습니다")
        return render_template('home.html')

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
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=60 * 60 * 12)
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

@app.route('/submit')
def submit():
    return render_template('submit.html')

@app.route('/detail/<id>')
def detail(id):
    # 글 id를 받아서 db 조회
    bson_id = ObjectId(id)
    post = db.list.find_one({'_id':bson_id})
    print(post)
    # post = db.list.find({id: detailId})
    return render_template('detail.html', post=post)

@app.route('/submit/post', methods=['POST'])
def submit_post():
    file_receive = request.files['file_give']
    title_receive = request.form['title_give']
    content_receive = request.form['content_give']
    # token_receive = request.cookies.get('mytoken')
    print(file_receive.filename)
    # payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
    # user_info = db.user.find_one({"id": payload['id']})

    extension = file_receive.filename.split('.')[-1]
    print(extension)

    # today = datetime.now()
    # mytime = today.strftime('%Y-%m-%d-%H-%M-%S')

    # filename = f'file_receive-{mytime}'

    save_to = f'static/img/{file_receive.filename}.{extension}'

    file_receive.save(save_to)

    doc = {
        'title': title_receive,
        'content': content_receive,
        'file': f'{file_receive}.{extension}',
        # 'create_date': today.strftime('%Y.%m.%d.%H.%M.%S'),
        # 'author': user_info['id'],
        'likes' : 0
    }

    db.list.insert_one(doc)

    # print(title_receive, title_receive, content_receive)

    return jsonify({'msg':'저장완료!'})

@app.route('/submit', methods=['GET'])
def editList():
    return jsonify({'msg': '수정 완료!'})

@app.route('/detail/delete', methods=['POST'])
def delete_list():
    postId_receive = request.form['postId']

    db.list.delete_one({'_id':postId_receive})
    return jsonify({'msg': '삭제 완료!'})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)