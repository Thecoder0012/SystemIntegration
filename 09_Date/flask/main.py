from flask import Flask
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route('/date')
def send_date():
    from datetime import datetime
    curent_datetime = datetime.now() 
    print(curent_datetime) 
    return {"date": curent_datetime}


if __name__ == '__main__':
    app.run(port=8000)