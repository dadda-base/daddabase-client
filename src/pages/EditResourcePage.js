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
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const storedToken = localStorage.getItem("authToken");

    const { resourceId } = useParams();
    const navigate = useNavigate();

    const api = axios.create({
        baseURL: `${baseURL}/api`
    });

    const uploadImage = (file) => {
        return api.post("/upload", file)
            .then(res => res.data)
            .catch((err) => {
                throw err;
            });
    };

    const handleFileUpload = (e) => {
        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);
        setIsUploadingImage(true);

        uploadImage(uploadData)
            .then(response => {
                setImageUrl(response.secure_url);
            })
            .catch(err => console.log("Error while uploading the file: ", err))
            .finally(() => {
                setIsUploadingImage(false);
            });
    };

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
            <h3>Edit the Resource</h3>
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
                    <Form.Label>Image: <br />(only support .jpg, .jpeg and .png)</Form.Label>
                    <Form.Control id="addImage"
                        type="file"
                        onChange={(e) => handleFileUpload(e)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="ControlInput3">
                    <Form.Label>Video:</Form.Label>
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