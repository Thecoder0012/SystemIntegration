# poetry init -n, change project name, 
# poetry add fastapi uvicorn, create main.py,
# poetry shell command, 
# then use uvicorn main:app --reload to serve this file on a port.
from fastapi import FastAPI
import requests

app = FastAPI()

@app.get("/requestFastAPI")
def _():
    return {"msg": "data from fastapi server"}

# this now works as a server but also a client for the express server, 
# since we are fetching from another server.
@app.get("/requestExpressData")
def _():
    response = requests.get("http://127.0.0.1:8080/expressData").json()
    return {"data": response}

