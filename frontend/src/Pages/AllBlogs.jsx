import api from "../Common/axiosConfig";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Common/AuthContext";

export default function AllBlogs() {
  const {user} = useContext(AuthContext)
  const [posts, setPosts] = useState([]);

  console.log(user)

  useEffect(() => {
    api.get("posts/").then((res) => setPosts(res.data)).catch((e)=> {
      console.log(e)
    });
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