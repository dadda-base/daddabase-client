import "../pages/ProfileEditPage.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";

function ProfileEditPage() {
  const { user } = useContext(AuthContext);
  const baseURL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${baseURL}/api/users/${user._id}`,
        { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        const user = response.data;
        setName(user.name);
        setUsername(user.username);
        setProfileImage(user.profileImage);
      })
      .catch((error) => console.log(error));
  }, [user._id]);

  const api = axios.create({
    baseURL: `${baseURL}/api`
  });

  const uploadImage = (file) => {
    return api.put(baseURL + "/api/users/" + user._id + "/upload", file)
      .then(res => res.data)
      .catch((err) => {
        throw err;
      });
  };

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("profileImage", e.target.files[0]);
    setIsUploadingImage(true);

    uploadImage(uploadData)
      .then(response => {
        setProfileImage(response.secure_url);
      })
      .catch(err => console.log("Error while uploading the file: ", err))
      .finally(() => {
        setIsUploadingImage(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { name, username, profileImage };

    axios
      .put(`${baseURL}/api/users/${user._id}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` }
      })
      .then((response) => {
        setName("");
        setUsername("");
        setProfileImage("");
        navigate(`/profiles/${user._id}`);

      })
      .catch((error) => console.log(error));
  };

  return (
    <Form onSubmit={handleSubmit} className="editProfile">
      <h3>Edit the Profile</h3>
      <Container className="editProfileContainer">
        <Form.Group className="mb-3" controlId="ControlInput1">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter new name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="ControlInput1">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter new username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="ControlInput1">
          <Form.Label>Profile Image: (only support .jpg, .jpeg and .png)</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => handleFileUpload(e)} />
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

export default ProfileEditPage;
