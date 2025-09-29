import React, { useState } from "react";
import api from "../Common/axiosConfig";

function NewPost({ onPostCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image); // only add if user uploads
    }

    await api.post("posts/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setTitle("");
    setContent("");
    setImage(null);
    onPostCreated();
    } catch (error) {
      console.log(error)
    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit">Add Post</button>
    </form>
  );
}

export default NewPost;
