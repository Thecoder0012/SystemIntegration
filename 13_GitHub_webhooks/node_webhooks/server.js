import express from "express";

const app = express();

// parse application/json til js object
app.use(express.json());
// parse application/x-www-form-urlencoded til js object
app.use(express.urlencoded({ extended: true }));

// application/json
app.post("/githubwebhook", (req, res) => {
    console.log(req.body);
    res.sendStatus(204);
});


// www form urlencoded
app.post("/githubwebhookform", (req, res) => {
  console.log(req.body);
  console.log("hello");
  res.sendStatus(204);
});

app.listen(8080, () => {
  console.log("Server is running on port 3000");
});
