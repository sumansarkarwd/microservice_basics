const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};

const handleEvent = (eventData) => {
  const { type, data } = eventData;

  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    posts[postId].comments.push({
      id,
      content,
      postId,
      status,
    });
  }

  if (type === "CommentUpdated") {
    const { id, postId, status, content } = data;

    const comments = posts[postId].comments;
    let comment = comments.find((comment) => comment.id === id);

    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (req, res) => {
  return res.send(posts);
});

app.post("/events", (req, res) => {
  const eventData = req.body;
  console.log("Event => ", eventData.type);

  handleEvent(eventData);

  res.send({});
});

app.listen(4002, async () => {
  console.log("Listeing on post 4002");
  const events = await fetch("http://localhost:4005/events").then((res) =>
    res.json()
  );

  for (const event of events) {
    handleEvent(event);
  }
});
