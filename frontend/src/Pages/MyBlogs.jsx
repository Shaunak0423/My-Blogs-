import { useState, useEffect, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import NewPost from "../Components/NewPost";
import api from "../Common/axiosConfig";
import { AuthContext } from "../Common/AuthContext";
import "../Styles/MyBlogs.css";

export default function MyBlogs() {
  const [myPosts, setMyPosts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
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
    setShowEditModal(true);
  };

  const handleEditSave = async () => {
    try {
      await api.put(`posts/${currentPost.id}/`, {
        title: editTitle,
        content: editContent,
      });
      setShowEditModal(false);
      fetchMyPosts();
    } catch (error) {
      console.log("Error updating post:", error);
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
              <img src={p.image.startsWith("http") ? p.image : `http://127.0.0.1:8000${p.image}`} alt="Blog" className="my_blog_image" />
              <h3>{p.title}</h3>
              <p>{p.content}</p>
              <div className="myblogbuttoncontainer">
              <Button variant="primary" size="sm" onClick={() => handleEditClick(p)}>
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                className="ms-2"
                onClick={() => deletePost(p.id)}
              >
                Delete
              </Button>
              </div>
            </div>
          ))
        ) : (
          <p>No posts yet — add a post!</p>
        )}

        <Modal show={showEditModal} onHide={handleCloseModal}>
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