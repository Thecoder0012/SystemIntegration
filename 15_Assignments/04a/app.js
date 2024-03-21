import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.static("public"));

app.get("/events", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const interval = setInterval(() => {
    const eventData = {
      message: "This is a server-sent event message!",
      timestamp: new Date().toISOString(),
    };

    res.write(`data: ${JSON.stringify(eventData)}\n\n`);
  }, 1000);

  req.on("close", () => {
    clearInterval(interval);
    console.log("Client is disconnected");
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
