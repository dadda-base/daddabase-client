import "../pages/ProfilePage.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios'
import { LinkContainer } from "react-router-bootstrap";
import dayjs from 'dayjs';
const baseURL = process.env.REACT_APP_API_URL;



function ProfilePage(props) {
  const { isLoggedIn, user } = useContext(AuthContext);
  const { storedToken, authenticateUser } = useContext(AuthContext);
  const [profile, setProfile] = useState([])


  const getProfile = () => {
    axios
      .get(baseURL + "/api/users/" + user._id, {
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

  const renderTime = (time) => {
    return dayjs(time).format('YYYY/MM/DD')
  }

  let now = new Date(dayjs());
  let dueDay = new Date(profile?.dueDayOfBaby);
  
  let remainDay = Math.round((dueDay.getTime() - now.getTime()) / (1000*60*60*24))

  return (
    <div className="ProfilePage">


      <Card style={{ width: '18rem' }} className="profileCard">
        {isLoggedIn && (
          <>
            <Card.Img variant="top" src={profile.profileImage} alt="" />

            <Card.Body>
              <Card.Title>User Name: <strong>{profile.username}</strong></Card.Title>
              <Card.Text>Name: <strong>{profile.name}</strong></Card.Text>
              <Card.Text>Email: <strong>{profile.email}</strong></Card.Text>
              {profile.dadLevel &&
                <Card.Text>Dad level: <strong>{profile.dadLevel}</strong></Card.Text>
              }
              {remainDay > 0 
                ?
                <Card.Text>Due Day of baby:<br /><strong>{renderTime(profile.dueDayOfBaby)}</strong></Card.Text>
                :
                <></>
              }
              <LinkContainer to={`/profiles/${profile._id}/edit`}>
                <Button variant="primary">Edit Profile</Button>
              </LinkContainer> <br />
              <Button className="ms-2" variant="danger" onClick={props.callbackToDeleteUser}>Delete Profile</Button>
            </Card.Body>
          </>
        )}
      </Card>

      <div className="listContainer">
        <ListGroup as="ul">
          <ListGroup.Item as="li" active>
            <h4>My Resources</h4>
          </ListGroup.Item>

          {profile.resources &&
            profile.resources.map((resource) => {
              return (
                <ListGroup.Item as="li" className="profileListBar" key={resource._id}>
                  <Link to={`/resources/${resource._id}`} className="profileList">
                    <h5>Title: {resource.title}</h5>
                  </Link>
                </ListGroup.Item>
              )
            })
          }
        </ListGroup>

        <ListGroup as="ul" className="listGroup">
          <ListGroup.Item as="li" variant="success">
            <h4>My Posts</h4>
          </ListGroup.Item>

          {profile.posts &&
            profile.posts.map((post) => {
              return (
                <ListGroup.Item className="profileListBar" as="li" key={post._id}>
                  <Link to={`/posts/${post._id}`} className="profileList">
                    <h5>Title: {post.title}</h5>
                  </Link>
                </ListGroup.Item>
              )
            })
          }
        </ListGroup>
      </div>
    </div>

  );
}

export default ProfilePage;
