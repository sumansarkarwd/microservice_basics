const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  const comments = commentsByPostId[id] || [];
  res.send(comments);
});

app.post("/posts/:id/comments", async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const commentId = randomBytes(4).toString("hex");

  const comments = commentsByPostId[id] || [];

  comments.push({ id: commentId, content, status: "pending" });
  commentsByPostId[id] = comments;

  try {
    await fetch("http://localhost:4005/events", {
      method: "post",
      body: JSON.stringify({
        type: "CommentCreated",
        data: {
          id: commentId,
          content,
          postId: id,
          status: "pending",
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {}

  res.send(commentsByPostId[id]);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log("Event => ", type);

  if (type === "CommentModerated") {
    const { id, postId, status, content } = data;

    const comments = commentsByPostId[postId];
    let comment = comments.find((comment) => comment.id === id);

    comment.status = status;

    try {
      await fetch("http://localhost:4005/events", {
        method: "post",
        body: JSON.stringify({
          type: "CommentUpdated",
          data: { id, postId, status, content },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {}
  }

  res.send({});
});

app.listen(4001, () => console.log("Listening on 4001"));
