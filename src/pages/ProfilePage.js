import "../pages/ProfilePage.css";
import { useContext} from "react";
import { AuthContext } from "../context/auth.context";
import { Link} from "react-router-dom";


function ProfilePage(props) {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  
  return (
    <>
      <div className="ProfilePage">
        {isLoggedIn && (
          <>
            <img className="profile-image" src={props.profile.profileImage} alt="" />
            <h1>{props.profile.username}</h1>

            <Link to={`/profiles/${user._id}/edit`}> Edit Profile</Link>
            <button onClick={props.callbackToDeleteUser}> Delete Profile</button>
          </>
        )}
        {props.profile.resources &&
          props.profile.resources.map((resource) => {
            return (
              <div className="ResourceCard card">
                <Link to={`/resources/${resource._id}`}>
                  <h3>{resource.title}</h3>
                </Link>
              </div>
            )
          })
        }
        {props.profile.posts &&
          props.profile.posts.map((post) => {
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
