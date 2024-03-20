import express from "express";
import parser from "xml2json";
import fs from "fs";

const app = express();

app.get("/xml", async (req, res) => {
  const filePath = "../data/me.xml";
  const readData = fs.readFileSync(filePath, "utf-8");
  const parsedXmlObject = parser.toJson(readData);
  const parseXmlObj = JSON.parse(parsedXmlObject);
  res.send(parseXmlObj);
});

app.get("/json", async (req, res) => {
  const filePath = "../data/me.json";
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const parsedJsonObject = JSON.parse(jsonData);
  res.send(parsedJsonObject);
});


app.listen(8080, () => console.log("Running on port 8080"));
