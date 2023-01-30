import "../pages/ProfilePage.css";
import { useContext, useEffect, useState} from "react";
import { AuthContext } from "../context/auth.context";
import { Link} from "react-router-dom";
import axios from 'axios'
const baseURL = process.env.REACT_APP_API_URL;

function ProfilePage(props) {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const { storedToken, authenticateUser } = useContext(AuthContext);
  const [profile, setProfile] = useState([])
  console.log(profile)
    const getProfile = () => {
      axios.get(baseURL + "/api/users/" + user._id, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
        .then((res) => {
          setProfile(res.data)
        })
        .catch((error) => console.log(error));
    }
  
    useEffect(() => {
      getProfile();
    }, [])
  


  return (
    <>
      <div className="ProfilePage">
        {isLoggedIn && (
          <>
            <img className="profile-image" src={profile.profileImage} alt="" />
            <h1>{profile.username}</h1>

            <Link to={`/profiles/${profile._id}/edit`}> Edit Profile</Link>
            <button onClick={props.callbackToDeleteUser}> Delete Profile</button>
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
