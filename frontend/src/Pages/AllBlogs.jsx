import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Common/AuthContext";
import { Modal, Button } from "react-bootstrap";
import '../Styles/AllBlogs.css';
import { TiPen } from "react-icons/ti";
import { TbClockCheck } from "react-icons/tb";

export default function AllBlogs() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [show, setShow] = useState(false);

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
          { p.image &&
            <img src={p.image} alt={p.title} className="allBlog_image"/>
          }
          <h3>{p.title}</h3>
          <p>{p.content.substring(0, 100)}...</p>
          <div className="authorAndCreatedAtDiv">
          <small className="author_name_all_blogs">Author :  {p.author_username}  <TiPen className="authorNameIcon"/></small>
          <p className="author_name_all_blogs">Created At : {p.created_at.split("T")[0]} <TbClockCheck className="authorNameIcon"/></p>
          </div>
          <br />
          <button className="read_more_button" onClick={() => handleShow(p)}>
            Read More
          </button>
        </div>
      ))}

      <Modal show={show} onHide={handleClose} className="model_class">
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body className="allBlogs_model_body">
          <h2 className="blog_title_all_blogs">{selectedPost?.title}</h2>
          <img src={selectedPost?.image} className="all_blogs_model_image"/>
          <p className="all_blogs_content_para">{selectedPost?.content}</p>
          <div className="authorAndCreatedAtDiv">
          <small className="author_name_all_blogs">Author:  {selectedPost?.author_username}  <TiPen className="authorNameIcon"/></small>
          <p className="author_name_all_blogs">Created At: {selectedPost?.created_at.split("T")[0]} <TbClockCheck className="authorNameIcon"/></p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {
        console.log(posts)
      }
    </div>
  );
}
