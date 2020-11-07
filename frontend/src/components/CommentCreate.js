import React, { useState } from "react";

export default function CommentCreate({ postId }) {
  const [content, setContent] = useState("");

  async function createComment() {
    await fetch(`http://localhost:4001/posts/${postId}/comments`, {
      method: "post",
      body: JSON.stringify({
        content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async function handleOnSubmit(event) {
    event.preventDefault();

    await createComment();

    setContent("");
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <div className="form-group">
          <input
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary">Comment</button>
        </div>
      </form>
    </div>
  );
}
