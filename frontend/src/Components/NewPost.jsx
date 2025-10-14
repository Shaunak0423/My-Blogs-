import React, { useContext, useState } from "react";
import api from "../Common/axiosConfig";
import {Container} from 'react-bootstrap'
import '../Styles/NewPosts.css'
import { AuthContext } from "../Common/AuthContext";

function NewPost({ onPostCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const {user, token} = useContext(AuthContext)

  const handleSubmit = async (e) => {
  e.preventDefault();

  if(title === '' || content === ""){
    alert("Please enter title and content")
    return false
  }
  else
  {
        const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) {
        formData.append("image", image);
      }


      try {
        await api.post("posts/", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTitle("");
        setContent("");
        setImage(null);
        onPostCreated();
      } catch (error) {
        console.log(error);
      }
    }
};

  return (
    <form onSubmit={handleSubmit} className="newPoste_form">
      <div className="newPosts_label_input">
        <label>Blog Title</label>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="newPosts_form_inputs"
      />
      </div>
      <div className="newPosts_label_input">
        <label>Blog Content</label>
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="newPosts_form_inputs"
      />
      </div>
      <div className="newPosts_label_input">
        <label>Blog Image (If Any)</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="newPosts_form_inputs"
      />
      </div>
      <button type="submit" className="newPosts_form_button">Add Post</button>
    </form>
  );
}

export default NewPost;
