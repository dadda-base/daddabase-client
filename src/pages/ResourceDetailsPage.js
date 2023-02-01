import "../pages/ResourceDetailsPage.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import ReactPlayer from "react-player";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const baseURL = process.env.REACT_APP_API_URL;

function ResourceDetailsPage() {
  const storedToken = localStorage.getItem("authToken");
  const [resource, setResource] = useState(null);

  const { user } = useContext(AuthContext);
  const userId = user?._id

  const { resourceId } = useParams();
  const navigate = useNavigate();

  const getResource = () => {
    axios
      .get(baseURL + "/api/resources/" + resourceId ,
      { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        const resource = response.data;
        setResource(resource);
      })
      .catch((error) => console.log(error));
  };

  const deleteResource = () => {
    axios
      .delete(baseURL + "/api/resources/" + resourceId,
      { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(() => {
        navigate("/resources");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getResource()
  }, [])

  // console.log('userId:' + user._id);
  return (
    <div className="ResourceDetailsPage">
      <Card style={{ width: '80vw' }} className="ResourceDetailsCard">
        {resource ? (
          <>
            {resource.imageUrl ?
              <Card.Img variant="top" style={{maxHeight: "10vh", maxWidth: "10vw"}} src={resource.imageUrl} alt="" /> : <></>
            }
            {resource.videoUrl ?
              <ReactPlayer className="resourceVideo" url={resource.videoUrl} playing={false} controls={true} width="60vw" height="50vh"/>
              : <></>
            }
            <Card.Body className="ResourceDetails">
              <Card.Title><h1>Title: {resource.title}</h1></Card.Title>
              <Card.Text><p>{resource.description}</p></Card.Text>


              <Link to="/resources">
                <Button variant="primary">All resources</Button>
              </Link>

              {userId &&
                userId == resource.user?._id
                ?
                <>
                  <Link to={`/resources/edit/${resourceId}`}>
                    <Button className="ms-3" variant="success">Edit resource</Button>
                  </Link>

                  <Button className="ms-3" variant="danger" id="deleteButton" onClick={deleteResource}>Delete</Button>
                </>
                : <></>
              }
            </Card.Body>
          </>
        )
          : <h1>loading........</h1>
        }
      </Card>
    </div>
  );
}

export default ResourceDetailsPage;
