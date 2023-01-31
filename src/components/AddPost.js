import "../components/AddPost.css";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from "react-bootstrap";
const baseURL = process.env.REACT_APP_API_URL;

function AddPost(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { storedToken, authenticateUser, user } = useContext(AuthContext);


  const handleSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");
    
    const requestBody = { title, description, userId: user?._id };

    axios.post(`${baseURL}/api/posts`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        setTitle("");
        setDescription("")
        props.refreshPosts();
      })
      .catch((err) => console.log(err))
  }

  return (
    <Form onSubmit={handleSubmit} className="addPost">
      <h3 id="addPostTitle">Add Post</h3>
      <Container className="addPostContainer">
        <Form.Group className="mb-3" controlId="ControlInput1">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="ControlTextarea1">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            type="text"
            name="description"
            value={description}
            placeholder="What's the resource about?"
            onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Container>
    </Form>
  );
}
export default AddPost;
