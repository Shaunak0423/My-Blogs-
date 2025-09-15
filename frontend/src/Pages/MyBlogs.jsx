import { useState, useEffect } from "react";
import NewPost from "../Components/NewPost";
import api from "../Common/axiosConfig";

export default function MyBlogs() {
  const [myPosts, setMyPosts] = useState([]);

  const fetchMyPosts = () => {
    api.get("my-posts/").then((res) => setMyPosts(res.data));
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const deletePost = async (id) => {
    await api.delete(`posts/${id}/`);
    fetchMyPosts();
  };

  return (
    <div>
      <h2>📝 My Blogs</h2>
      <NewPost onPostCreated={fetchMyPosts} />
      {myPosts.map((p) => (
        <div key={p.id} className="border p-3 my-2">
          <h3>{p.title}</h3>
          <p>{p.content}</p>
          <button onClick={() => deletePost(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}