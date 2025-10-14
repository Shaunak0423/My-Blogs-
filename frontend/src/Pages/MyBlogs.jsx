import { useState, useEffect, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import NewPost from "../Components/NewPost";
import api from "../Common/axiosConfig";
import { AuthContext } from "../Common/AuthContext";
import "../Styles/MyBlogs.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

export default function MyBlogs() {
  const [myPosts, setMyPosts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [image , setImage] = useState(null)
  const { user } = useContext(AuthContext);

  const fetchMyPosts = () => {
    api
      .get("my-posts/")
      .then((res) => setMyPosts(res.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const deletePost = async (id) => {
  const confirmed = window.confirm("Are you sure you want to delete this post?");

  if (!confirmed) {
    return;
  }

  try {
    await api.delete(`posts/${id}/`);
    fetchMyPosts();
  } catch (error) {
    console.log("Error deleting post:", error);
  }
};

  const handleEditClick = (post) => {
    setCurrentPost(post);
    setEditTitle(post.title);
    setEditContent(post.content);
    setImage(post.image)
    setShowEditModal(true);
  };

  const handleEditSave = async () => {
  try {
    const formData = new FormData();
    formData.append("title", editTitle);
    formData.append("content", editContent);

    if (image instanceof File) {
      formData.append("image", image);
    }

    await api.put(`posts/${currentPost.id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setShowEditModal(false);
    fetchMyPosts();
  } catch (error) {
    console.log("Error updating post:", error.response?.data || error);
  }
};


  const handleCloseModal = () => {
    setShowEditModal(false);
    setCurrentPost(null);
    setEditTitle("");
    setEditContent("");
  };

  return (
    <div className="container">
      <div className="my_bloc_container">
        <h2>📝 My Blogs</h2>
        <NewPost onPostCreated={fetchMyPosts} />

        {myPosts.length > 0 ? (
          myPosts.map((p) => (
            <div key={p.id} className="my_posts_container">
              {
                console.log(p.image)
              }
              <img src={p.image.startsWith("http") ? p.image : `${process.env.REACT_APP_BACKEND_URL}${p.image}`} alt="Blog" className="my_blog_image" />
              <h3>{p.title}</h3>
              <p>{p.content}</p>
              <div className="myblogbuttoncontainer">
              <button className="delete_button_myblogs" onClick={() => handleEditClick(p)}>
                Edit <FiEdit/>
              </button>
              <button
              className="delete_button_myblogs"
                onClick={() => deletePost(p.id)}
              >
                Delete <RiDeleteBin6Line/>
              </button>
              </div>
            </div>
          ))
        ) : (
          <p>No posts yet — add a post!</p>
        )}

        <Modal show={showEditModal} onHide={handleCloseModal} className="modal_class_myblogs">
          <Modal.Header closeButton>
            <Modal.Title>Edit Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
              </Form.Group>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="newPosts_form_inputs"
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleEditSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      {
        console.log(myPosts)
      }
    </div>
    
  );
}