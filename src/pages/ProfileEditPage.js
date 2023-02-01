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


  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { name, username, profileImage };

    axios
      .put(`${baseURL}/api/users/${user._id}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` }
      })
      .then((response) => {
        navigate(`/profiles/${user._id}`);
        console.log(`new ${name}  ${username}, ${profileImage} user: ${user._id}`)
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
                    <Form.Label>Profile Image:</Form.Label>
                    <Form.Control
                        type="text"
                        name="profileImage"
                        value={profileImage}
                        onChange={(e) => setProfileImage(e.target.value)}
                        placeholder="Enter new profile image url" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Container>
        </Form>

    
  );
}

export default ProfileEditPage;
