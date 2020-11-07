import React, { useEffect, useState } from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default function PostList() {
  const [posts, setPosts] = useState({});

  async function getPosts() {
    const posts = await fetch("http://localhost:4002/posts").then((res) =>
      res.json()
    );

    setPosts(posts);
  }

  useEffect(() => {
    getPosts();
  }, []);

  function renderPosts() {
    return Object.values(posts).map((post) => (
      <div className="card m-2 p-2" key={post.id}>
        <div className="card-body">{post.title}</div>
        <CommentList comments={post.comments} />
        <CommentCreate postId={post.id} />
      </div>
    ));
  }

  return (
    <div>
      <h1>POSTS</h1>
      <div className="d-flex flex-row flex-wrap">{renderPosts()}</div>
    </div>
  );
}
