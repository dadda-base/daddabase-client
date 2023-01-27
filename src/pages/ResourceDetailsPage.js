import "../pages/ResourceDetailsPage.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import ReactPlayer from "react-player";

const baseURL = process.env.REACT_APP_API_URL;

function ResourceDetailsPage() {
  const [resource, setResource] = useState(null);

  const { user } = useContext(AuthContext);
  const userId = user._id

  const {resourceId} = useParams();
  const navigate = useNavigate(); 
    
  const getResource = () => {        
    axios
      .get(baseURL + "/api/resources/" + resourceId)
      .then((response) => {
        const resource = response.data;
        setResource(resource);
      })
      .catch((error) => console.log(error));
  };

  const deleteResource = () => {
    axios
      .delete(baseURL + "/api/resources/" + resourceId)
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
      {resource ? 
      
      
      (
        <>
          <h1>{resource.title}</h1>
          <p style={{ maxWidth: "400px" }}>{resource.description} </p>
      {/* if statement and show article, img or video */}
      { resource.imageUrl?  
        <img src={resource.imageUrl} alt="" /> : <></>
      }
      { resource.videoUrl? 
        <ReactPlayer url={resource.videoUrl} width="50vw" height="40vh" playing={false} controls={true} />
        : <></>
      }
        </>
      )
      : <h1>loading........</h1>
      }
      <Link to="/resources">
        <button>Back to resources</button>
      </Link>

      {resource &&
        userId == resource.user._id
      ? 
        <>
        <Link to={`/resources/edit/${resourceId}`}>
        <button>Edit Resource</button>
      </Link> 

      <button onClick={deleteResource}>Delete</button>
        </>
       : <></>
      }
      
      

    </div>
  );
}

export default ResourceDetailsPage;
