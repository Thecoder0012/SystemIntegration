import express from "express";

const app = express();

// serve alle statiske filder inde i public mappen.
app.use(express.static("./public"));

const randomNumbers = [1,20,540];

app.get("/randomNumbers", (req, res) => {
  res.send({ data: randomNumbers });
});

app.get("/newRandomNumbers", (req, res) => {
  const randomNumber = getRandomInt(3, 1000);
  randomNumbers.push(randomNumber);
  res.send({ data: randomNumber });
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const PORT = 8080;
app.listen(PORT, () => console.log("running on port", PORT));
