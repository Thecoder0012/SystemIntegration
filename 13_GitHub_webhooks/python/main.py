from fastapi import FastAPI, Request

app = FastAPI();


@app.post("/githubwebhookjson")
async def githubwebhookjson(request: Request):
    data = await request.body;
    print(data);
    return