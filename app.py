from flask import Flask, render_template, jsonify, request, url_for

app = Flask(__name__)

from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.Yanudu


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

"""
@app.route('/list/delete', methods=['POST'])
def delete_list():
    name_receive = request.form['name_give']

    db.list.delete_one({'name':name_receive})

    return jsonify({'msg': '삭제 되었습니다!'})

"""
@app.route('/')
def main():
    return render_template('home.html')

@app.route('/login')
def home():
    return render_template('login.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/signup/check_dup')
def checkdup():
    id_receive = request.form.get('id_give')
    print(id_receive)

@app.route('/submit')
def submit():
    return render_template('submit.html')

@app.route('/detail')
def detail():
    return render_template('detail.html')

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)