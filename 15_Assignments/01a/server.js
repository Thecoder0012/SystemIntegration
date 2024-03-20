import express from "express";
import fs from "fs";
import yaml from "js-yaml";
import parser from "xml2json";
import { parse } from "csv-parse";

const app = express();
app.use(express.json());

app.get("/json", (req, res) => {
  const filePath = "./me.json";
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const parsedJsonObject = JSON.parse(jsonData);
  res.send({ data: parsedJsonObject });
});

app.get("/yaml", (req, res) => {
  const filePath = "./me.yaml";
  const yamlFile = fs.readFileSync(filePath, "utf8");
  const parsedYamlObject = yaml.load(yamlFile);
  res.send({ data: parsedYamlObject });
});

app.get("/xml", (req, res) => {
  const filePath = "./me.xml";
  const xmlFile = fs.readFileSync(filePath, "utf8");
  var parsedXmlObject = parser.toJson(xmlFile);
  res.send({ data: parsedXmlObject });
});

app.get("/csv", (req, res) => {
  const filePath = "./me.csv";
  const csvData = fs.readFileSync(filePath, "utf8");
  parse(csvData, (err, data) => {
    if (err) {
      res.status(500).send({ error: "Not able to parse csv file." });
      return;
    }
    res.json({ data: data });
  });
});

app.get("/txt", (req, res) => {
  const filePath = "./me.txt";
  const keyValuePairs = {};
  const txtData = fs.readFileSync(filePath, "utf8");

  txtData.split("\n").forEach((line) => {
    const [key, value] = line.split(":").map((item) => item.trim());
    keyValuePairs[key] = value;
  });

  res.send({ data: keyValuePairs });
});

app.listen(3000, () => {
  console.log("Running");
});
