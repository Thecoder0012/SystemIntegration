import express from "express";

const app = express();
// long polling is keeping the server open with a connection until there is a new message
// long polling better than long polling in the case of fetching, because short polling fetches more often.
let clients = [];

// listens for a message
app.get("/events/subscribe", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  req.on("close", () => {
    clients = clients.filter((client) => client !== res)
  });
  clients.push(res);
});

// publishes a message
app.get("/events/publish", (req, res) => {
  const newData = { data: "This is a new message" };
  clients.forEach((client) => {
    client.send(newData);
  });

  clients = [];
  res.status(204).end();
});

const PORT = 8080;
app.listen(PORT, () => console.log("running on port", PORT));
