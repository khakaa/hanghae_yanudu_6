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

@app.route('/submit')
def submit():
    return render_template('submit.html')
<<<<<<< HEAD

@app.route('/detail')
def detail():
    return render_template('detail.html')

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
=======
>>>>>>> c6b9ea7fc7fba4faec62e01bccf1f60f203bfd91

@app.route('/detail')
def detail():
    return render_template('detail.html')

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)