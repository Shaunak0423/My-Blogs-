import api from "../Common/axiosConfig";
import { useState, useEffect } from "react";

export default function AllBlogs() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("posts/").then((res) => setPosts(res.data));
  }, []);

  return (
    <div>
      <h2>🌍 All Blogs</h2>
      {posts.map((p) => (
        <div key={p.id} className="border p-3 my-2">
          <h3>{p.title}</h3>
          <p>{p.content}</p>
          <small>By {p.author_username}</small>
        </div>
      ))}
    </div>
  );
}