const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
app.use(bodyParser.json());

const events = [];

app.post("/events", async (req, res) => {
  const eventData = req.body;
  console.log("Event => ", eventData.type);

  events.push(eventData);

  try {
    await fetch("http://localhost:4000/events", {
      method: "post",
      body: JSON.stringify(eventData),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {}
  try {
    await fetch("http://localhost:4001/events", {
      method: "post",
      body: JSON.stringify(eventData),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {}
  try {
    await fetch("http://localhost:4002/events", {
      method: "post",
      body: JSON.stringify(eventData),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {}
  try {
    await fetch("http://localhost:4003/events", {
      method: "post",
      body: JSON.stringify(eventData),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log({ error });
  }

  res.send({ status: "ok" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, (req, res) => console.log("Listening on port 4005"));
