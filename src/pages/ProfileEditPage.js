import "../pages/ProfileEditPage.css";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProfileEditPage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const baseURL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const requestBody = { username, profileImage };
    const storedToken = localStorage.getItem("authToken");

    axios
      .put(`${baseURL}/api/users/${user._id}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` }
      })
      .then((response) => {
        navigate(`/profiles/${user._id}`);
        console.log(`new ${username}, ${profileImage} user: ${user._id}`)
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="ProfileEditPage">
      {isLoggedIn && (
        <>
          <h1>{user.name}</h1>
          <h1>{user.email}</h1>
          <h1>{user._id}</h1>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              name="profileImage"
              value={profileImage}
              onChange={(e) => setProfileImage(e.target.value)}
            />

            <input type="submit" value="Submit" />
          </form>
        </>
      )}
    </div>
  );
}

export default ProfileEditPage;
