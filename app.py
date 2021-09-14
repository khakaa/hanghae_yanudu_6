from flask import Flask, render_template, jsonify, request, url_for

from bson.objectid import ObjectId

app = Flask(__name__)

from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.Yanudu

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
    # id_receive = request.form[]
    file_receive = request.form['file_give']
    title_receive = request.form['title_give']
    content_receive = request.form['content_give']
    # likes_receive = request.form['likes_give']

    doc = {
        'file' : file_receive,
        'title' : title_receive,
        'content' : content_receive,
        # 'likes' : likes_receive
    }

    db.list.insert_one(doc)

    # print(title_receive, title_receive, content_receive)

    return jsonify({'msg':'저장완료!'})

@app.route('/submit', methods=['GET'])
def editList():
    return jsonify({'msg': '수정 완료!'})

@app.route('/detail/delete', methods=['POST'])
def delete_list():
    title_receive = request.form['title_give']

    db.list.delete_one({'title':title_receive})
    return jsonify({'msg': '삭제 완료!'})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)