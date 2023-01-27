import "../pages/ProfilePage.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ResourceCard from "../components/ResourceCard";

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
  console.log(profile.posts)
  console.log(profile.resources)
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
        {profile.resources &&
          profile.resources.map((resource) => {
            return (
              <div className="ResourceCard card">
                <Link to={`/resources/${resource._id}`}>
                  <h3>{resource.title}</h3>
                </Link>
              </div>
            )
          })
        }
        {profile.posts &&
          profile.posts.map((post) => {
            return (
              <div className="post">
                <h1>Post Title:{post.title}</h1>
                <h4>Post description:{post.description}</h4>
              </div>
            );
          })
        }

      </div>
    </>
  );
}

export default ProfilePage;
