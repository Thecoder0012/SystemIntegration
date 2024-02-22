import express from 'express';

const app = express();

app.get("/expressData",(req,res) => {
    res.send({running: true})
})

app.get("/requestFastAPI", async (req,res) => {
    const response = await fetch("http://127.0.0.1:8000/requestFastAPI"); 
    const data = await response.json();
    res.send({data})
})


app.listen(8080,() => console.log("Running on port 8080"));