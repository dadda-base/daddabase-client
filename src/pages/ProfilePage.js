import "../pages/ProfilePage.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PostsPage from "./PostsPage";

function ProfilePage() {
  const baseURL = process.env.REACT_APP_API_URL;
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const { storedToken, authenticateUser } = useContext(AuthContext);
  const { userId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const getUserProfile = () => {
    axios
      .get(`${baseURL}/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneProfile = response.data;
        console.log(oneProfile.posts)
        console.log(oneProfile.resources)
        setProfile(oneProfile)
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUserProfile();
  }, []);

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
    <>
    <div className="ProfilePage">
      {isLoggedIn && (
        <>
          <img className="profile-image" src={profile.profileImage} alt="" />
          <h1>{profile.username}</h1>

          <Link to={`/profiles/${user._id}/edit`}> Edit Profile</Link>
          <button onClick={deleteUser}> Delete Profile</button>
        </>
        )}
      </div>
      </>
  );
}

export default ProfilePage;
