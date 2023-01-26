import "../pages/ProfilePage.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ProfilePage() {
  const baseURL = process.env.REACT_APP_API_URL;
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const { storedToken, authenticateUser } = useContext(AuthContext);
  const { userId } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const getUserProfile = () => {
    axios
      .get(`${baseURL}/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneProfile = response.data;
        setProfileImage(oneProfile.username);
        setUsername(oneProfile.profileImage);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUserProfile();
  }, [username, profileImage]);

  const deleteUser = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .delete(`${baseURL}/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/");
        logOutUser();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="ProfilePage">
      {isLoggedIn && (
        <>
          <h1>{user.name}</h1>
          <h1>{user.email}</h1>
          <h1>{user._id}</h1>
          <h1>UserName:{username}</h1>
          <h1>profile Image:{profileImage}</h1>

          <Link to={`/profiles/${user._id}/edit`}> Edit Profile</Link>
          <button onClick={deleteUser}> Delete Profile</button>
        </>
      )}
    </div>
  );
}

export default ProfilePage;
