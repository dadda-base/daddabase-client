import { useState, useContext } from "react";
import axios from "axios";
import "../components/AddResource.css";
import { AuthContext } from "../context/auth.context";
import { Button, Container, Form } from "react-bootstrap";

const baseURL = process.env.REACT_APP_API_URL;

function AddResource(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
        const storedToken = localStorage.getItem("authToken");

    const requestBody = {
      title,
      description,
      imageUrl,
      videoUrl,
      userId: user?._id,
    };

        axios.post(baseURL + "/api/resources", requestBody, { headers: { Authorization: `Bearer ${storedToken}` }})
            .then((response) => {
                setTitle("");
                setDescription("")
                setImageUrl("")
                setVideoUrl("")
                props.refreshResources();
            })
            .catch((err) => console.log(err))
    }

  return (
    <Form onSubmit={handleSubmit} className="addResource">
      <h3 id="addResourceTitle">Add Resource</h3>
      <Container className="addResourceContainer">
        <Form.Group className="mb-3" controlId="ControlInput1">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
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
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="ControlInput2">
          <Form.Label>URL of image:</Form.Label>
          <Form.Control
            type="url"
            name="imageUrl"
            value={imageUrl}
            placeholder="url of image"
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="ControlInput3">
          <Form.Label>URL of video:</Form.Label>
          <Form.Control
            type="url"
            name="videoUrl"
            value={videoUrl}
            placeholder="url of video"
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Container>
    </Form>
  );
}

export default AddResource;
