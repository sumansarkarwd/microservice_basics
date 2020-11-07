import React from "react";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";

const App = () => {
  return (
    <div className="container mt-3">
      <CreatePost />
      <hr />
      <PostList />
    </div>
  );
};

export default App;
