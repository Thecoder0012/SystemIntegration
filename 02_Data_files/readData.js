import fs from 'fs';
const filePath = "./me.json";
const jsonData = fs.readFileSync(filePath, "utf-8");

const parseJsonData = JSON.parse(jsonData);

console.log(parseJsonData);