import "../pages/ResourceDetailsPage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";

const baseURL = process.env.REACT_APP_API_URL;

function ResourceDetailsPage() {
  const [resource, setResource] = useState(null);

  const {resourceId} = useParams();
    
  const getResource = () => {        
    axios
      .get(baseURL + "/api/resources/" + resourceId)
      .then((response) => {
        const resource = response.data;
        setResource(resource);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getResource()
  }, [])
  
  return (
    <div className="ResourceDetailsPage">
      {resource && (
        <>
          <h1>{resource.title}</h1>
          <p style={{ maxWidth: "400px" }}>{resource.description} </p>
      <img src={resource.imageUrl} alt="" />
      {/* if statement and show article, img or video */}
      { resource.imageUrl?  
        <img src={resource.imageUrl} alt="" /> : <></>
      }
      { resource.videoUrl? 
        <ReactPlayer url={resource.videoUrl} playing={false} controls={true} />
        : <></>
      }
        </>
      )}
 
      <Link to="/resources">
        <button>Back to resources</button>
      </Link>

      <Link to={`/resources/edit/${resourceId}`}>
        <button>Edit Resource</button>
      </Link> 
    </div>
  );
}

export default ResourceDetailsPage;
