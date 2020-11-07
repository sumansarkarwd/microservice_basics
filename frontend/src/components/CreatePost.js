import React, { useState } from "react";

export default function CreatePost() {
  const [title, setTitle] = useState("");

  function handleOnSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:4000/posts", {
      body: JSON.stringify({ title }),
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTitle("");
  }

  return (
    <div>
      <h1>Create POST</h1>
      <form onSubmit={handleOnSubmit}>
        <div className="form-group">
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}
