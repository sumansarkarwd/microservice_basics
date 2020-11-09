const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log("Event => ", type);

  if (type === "CommentCreated") {
    const { id, content, postId } = data;
    const status = content.includes("java") ? "rejected" : "approved";

    try {
      await fetch("http://localhost:4005/events", {
        method: "post",
        body: JSON.stringify({
          type: "CommentModerated",
          data: {
            id,
            postId,
            content,
            status,
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {}
  }

  res.send({});
});

app.listen(4003, () => console.log("Listening on port -> 4003"));
