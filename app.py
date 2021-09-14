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

@app.route('/signup/check_dup', methods=['POST'])
def checkdup():
    id_receive = request.form.get('id_give')
    exists = bool(db.users.find_one({"username":id_receive}))
    print(exists)
    return jsonify({'result': 'success', 'exists':exists})

@app.route('/submit')
def submit():
    return render_template('submit.html')

@app.route('/detail')
def detail():
    return render_template('detail.html')

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)