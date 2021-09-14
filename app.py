import hashlib
from flask import Flask, render_template, jsonify, request, url_for, redirect, flash
import jwt
import datetime

app = Flask(__name__)

from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.Yanudu
SECRET_KEY = 'YANUDU'

def checkExpired():
    if request.cookies.get('mytoken') is not None:
        return True
    else:
        return False


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
            return render_template('/login')
    except jwt.ExpiredSignatureError:
        flash("로그인 시간이 만료되었습니다.")
        return render_template('/login')
    except jwt.exceptions.DecodeError:
        flash("로그인 정보가 없습니다")
        return render_template('/login')

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

@app.route('/detail')
def detail():
    return render_template('detail.html')

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)