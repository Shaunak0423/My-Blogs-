import { useState, useEffect, useContext } from "react";
import NewPost from "../Components/NewPost";
import api from "../Common/axiosConfig";
import { AuthContext } from "../Common/AuthContext";

export default function MyBlogs() {
  const [myPosts, setMyPosts] = useState([]);
  const {user} = useContext(AuthContext)

  const fetchMyPosts = () => {
    api.get("my-posts/").then(res => setMyPosts(res.data)).catch((e=>{
      console.log(e)
    }));
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
      {myPosts.length>0 ? (myPosts.map((p) => (
        <div key={p.id} className="border p-3 my-2">
          <h3>{p.title}</h3>
          <p>{p.content}</p>
          <button onClick={() => deletePost(p.id)}>Delete</button>
        </div>
      ))) : (
        <p>No Posts Yes Add A Post</p>
      )}
    </div>
  );
}