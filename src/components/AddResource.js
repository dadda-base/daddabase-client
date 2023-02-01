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
    const [isUploadingImage, setIsUploadingImage] = useState(false);

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

        axios.post(baseURL + "/api/resources", requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
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
                        onChange={(e) => setVideoUrl(e.target.value)}
                    />
                </Form.Group>

                {isUploadingImage
                    ? <Button variant="primary" type="submit" disabled>
                        Uploading...
                    </Button>
                    : <Button variant="primary" type="submit">
                        Submit
                    </Button>
                }
            </Container>
        </Form>
    );
}

export default AddResource;
