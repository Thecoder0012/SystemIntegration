from flask import Flask, jsonify
import requests

app = Flask(__name__)

@app.route('/xml_from_express')
def get_xml():
    response = requests.get("http://127.0.0.1:8080/xml").json()
    return {"data": response}

@app.route('/json_from_express')
def get_json():
    response = requests.get("http://127.0.0.1:8080/json").json()
    return {"data": response}


if __name__ == '__main__':
    app.run(port=8000)
