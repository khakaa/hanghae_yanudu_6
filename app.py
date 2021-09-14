from flask import Flask, render_template, jsonify, request, url_for

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

@app.route('/submit/post', methods=['POST'])
def submit_post():
    img_receive = request.form['img_give']
    title_receive = request.form['title_give']
    content_receive = request.form['content_give']

    doc = {
        'img' : img_receive,
        'title' : title_receive,
        'content' : content_receive
    }

    db.list.insert_one(doc)

    print(title_receive, title_receive, content_receive)

    return jsonify({'msg':'저장완료!'})

@app.route('/submit/delete', methods=['POST'])
def delete_list():
    ObjectId_receive = request.form['_id_give']

    db.list.delete_one({'_id':ObjectId_receive})

    return jsonify({'msg': '삭제 완료!'})

@app.route('/detail')
def detail():
    return render_template('detail.html')

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)