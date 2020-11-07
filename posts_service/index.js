const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };

  try {
    await fetch("http://localhost:4005/events", {
      method: "post",
      body: JSON.stringify({
        type: "PostCreated",
        data: { id, title },
      }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {}

  res.send(posts[id]);
});

app.post("/events", (req, res) => {
  const data = req.body;
  console.log("Recived event => ", data.type);
  res.send({});
});

app.listen(4000, () => console.log("Listening on port 4000"));
