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
  const [dadLevel, setDadLevel] = useState("");
  const [partnerIsPregnant, setPartnerIsPregnant] = useState(false);
  const [dueDayOfBaby, setDueDayOfBaby] = useState("");
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
        setDadLevel(user.dadLevel);
        setPartnerIsPregnant(user.partnerIsPregnant);
        setDueDayOfBaby(user.dueDayOfBaby)
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

    const requestBody = { name, username, profileImage, dadLevel, partnerIsPregnant, dueDayOfBaby};

    axios
      .put(`${baseURL}/api/users/${user._id}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` }
      })
      .then((response) => {
        console.log(response);
        setName("");
        setUsername("");
        setProfileImage("");
        setDadLevel("")
        setDueDayOfBaby("")
        setPartnerIsPregnant(false)
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

        <Form.Group className="mb-3" controlId="ControlInput1">
          <Form.Label>Dad level:</Form.Label>
          <label>
            <input
              type="radio"
              name="dadLevel"
              value="First-Timer"
              onChange={(e) => setDadLevel(e.target.value)}
            />
            First-Timer
          </label>

          <label>
            <input
              type="radio"
              name="dadLevel"
              value="Intermmediate"
              onChange={(e) => setDadLevel(e.target.value)}
            />
            Intermmediate
          </label>

          <label>
            <input
              type="radio"
              name="dadLevel"
              value="Veteran"
              onChange={(e) => setDadLevel(e.target.value)}
            />
            Veteran
          </label>
        </Form.Group>

        <Form.Group className="mb-3" controlId="ControlInput1">
          <Form.Label>Is your partner pregnant?</Form.Label>
          <label>
            <input
              type="radio"
              name="partnerIsPregnant"
              value={true}
              onChange={(e) => setPartnerIsPregnant(e.target.value)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="partnerIsPregnant"
              value={false}
              onChange={(e) => setPartnerIsPregnant(e.target.value)}
            />
            No
          </label>

        </Form.Group>

        <Form.Group className="mb-3" controlId="ControlInput1">
          <Form.Label>Due Day of baby:</Form.Label>
          <Form.Control
            type="date"
            name="dueDayOfBaby"
            value={dueDayOfBaby}
            onChange={(e) => setDueDayOfBaby(e.target.value)}
            placeholder="What's your level?" />
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
