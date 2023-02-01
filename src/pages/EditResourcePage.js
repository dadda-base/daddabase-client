import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./EditResourcePage.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const baseURL = process.env.REACT_APP_API_URL;

function EditResourcePage() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [videoUrl, setVideoUrl] = useState("")
    const storedToken = localStorage.getItem("authToken");

    const { resourceId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(baseURL + "/api/resources/" + resourceId,
            { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                const resource = response.data;
                setTitle(resource.title);
                setDescription(resource.description);
                setImageUrl(resource.imageUrl);
                setVideoUrl(resource.videoUrl);
            })
            .catch((error) => console.log(error));
        //project id change then update
    }, [resourceId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestBody = { title, description, imageUrl, videoUrl };

        axios
            .put(baseURL + "/api/resources/" + resourceId, requestBody,
            { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                navigate("/resources/" + resourceId)
            });
    };


    return (
        <Form onSubmit={handleSubmit} className="editResource">
            <h3 id="editResourceTitle">Edit the Resource</h3>
            <Container className="editResourceContainer">
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

                <Form.Group className="mb-3" controlId="ControlInput2">
                    <Form.Label>URL of image:</Form.Label>
                    <Form.Control
                        type="url"
                        name="imageUrl"
                        value={imageUrl}
                        placeholder="url of image"
                        onChange={(e) => setImageUrl(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="ControlInput3">
                    <Form.Label>URL of video:</Form.Label>
                    <Form.Control
                        type="url"
                        name="videoUrl"
                        value={videoUrl}
                        placeholder="url of video"
                        onChange={(e) => setVideoUrl(e.target.value)} />
                </Form.Group>


                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Container>
        </Form>
        
    );
}

export default EditResourcePage;