import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState();
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchPosts = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}posts`);
    const data = await response.json();
    setPosts(data);
    console.log(data);
  };

  const addPost = async () => {
    const newPost = {
      title: title,
      content: content,
    };
    await fetch(`${process.env.REACT_APP_API}post`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newPost),
    });
    setTitle("");
    setContent("");
    alert("Post created!");
    fetchPosts();
    setShowCreatePost(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return !showCreatePost ? (
    <div className="posts-container">
      <div className="top-row">
        <h1>My Posts</h1>
        <button onClick={() => setShowCreatePost(true)}>Create new post</button>
      </div>
      {posts?.map((post) => (
        <div key={post._id} className="post-container">
          <h2>{post.title}</h2>
          <div className="date-info">
            <span>{post.postedBy}</span>
            <span>
              {new Date(post.createdAt).toLocaleString().slice(0, -3)}
            </span>
          </div>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  ) : (
    <div className="create-post-container">
      <div className="top-row">
        <h1>Create a new post</h1>
        <button onClick={() => setShowCreatePost(false)} className="close-btn">
          x
        </button>
      </div>
      <label>
        <h3>Title</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        <h3>Content</h3>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
      <button onClick={() => addPost()}>Add post to database</button>
    </div>
  );
}

export default App;
