import express from "express";

const app = express();
app.use(express.json());

let registeredWebhooks = [];
const eventTypes = ["payment_processed", "payment_removed"];

app.post("/register", (req, res) => {
  const hookUrl = req.body.hook.config.url;

  if (!hookUrl) {
    return res
      .status(400)
      .json({ error: "Webhook URL is missing in the payload" });
  }

  const eventType = eventTypes[0];

  registeredWebhooks.push({ endpoint: hookUrl, eventType: eventType });
  res.status(200).json({ message: "Webhook registered successfully" });
});

app.post("/unregister", (req, res) => {
  const hookUrl = req.body.hook.config.url;
  if (!hookUrl) {
    return res
      .status(400)
      .json({ error: "Webhook URL is missing in the payload" });
  }

  registeredWebhooks = registeredWebhooks.filter(
    (webhook) => webhook.endpoint !== hookUrl
  );
  res.status(200).json({ message: "Webhook unregistered successfully" });
});

app.get("/ping", (req, res) => {
  const pingResults = [];
  registeredWebhooks.forEach((webhook) => {
    pingResults.push({
      endpoint: webhook.endpoint,
      eventType: webhook.eventType,
    });
  });

  res
    .status(200)
    .send({ message: "Pinged all registered webhooks", pingResults });
});

const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));
