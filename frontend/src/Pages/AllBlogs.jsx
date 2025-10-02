import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Common/AuthContext";
import { Modal, Button } from "react-bootstrap";   // 👈 Bootstrap modal
import '../Styles/AllBlogs.css';

export default function AllBlogs() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // post to show
  const [show, setShow] = useState(false); // modal state

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/posts/")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((e) => console.error(e));
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (post) => {
    setSelectedPost(post);
    setShow(true);
  };

  return (
    <div className="all_blogs_main">
      <h2>🌍 All Blogs</h2>
      {posts.map((p) => (
        <div key={p.id} className="blog_content">
          <h3>{p.title}</h3>
          <p>{p.content.substring(0, 100)}...</p> {/* preview */}
          <small>By {p.author_username}</small>
          <br />
          <button className="read_more_button" onClick={() => handleShow(p)}>
            Read More
          </button>
        </div>
      ))}

      {/* Bootstrap Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedPost?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedPost?.content}</p>
          <small>By {selectedPost?.author_username}</small>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
