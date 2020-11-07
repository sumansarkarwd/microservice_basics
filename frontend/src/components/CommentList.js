import React from "react";

export default function CommentList({ comments }) {
  function renderComments() {
    return comments.map((comment) => (
      <li key={comment.id}>{comment.content}</li>
    ));
  }

  return (
    <div>
      <ul>{renderComments()}</ul>
    </div>
  );
}
