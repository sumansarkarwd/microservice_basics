import React from "react";

export default function CommentList({ comments }) {
  function renderComments() {
    return comments.map((comment) => {
      let content = "";

      console.log({ status: comment.status });
      switch (comment.status) {
        case "approved":
          content = comment.content;
          break;
        case "rejected":
          content = "This comment has been rejected";
          break;
        case "pending":
          content = "This comment is awaiting moderation";
          break;

        default:
          break;
      }
      console.log({ comment });

      return <li key={comment.id}>{content}</li>;
    });
  }

  return (
    <div>
      <ul>{renderComments()}</ul>
    </div>
  );
}
