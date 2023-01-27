import axios from "axios";
import { useEffect, useState } from "react";
import AddResource from "../components/AddResource";
import ResourceCard from "../components/ResourceCard";
import "../pages/ResourceListPage.css";

const baseURL= process.env.REACT_APP_API_URL;

function ResourceListPage() {
  const [resources, setResources] = useState([])

  const getAllResources = () => {
    axios.get(baseURL + "/api/resources")
      .then((res) => {
        setResources(res.data)
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getAllResources();
  }, [])

  return (
    <div className="ResourceListPage">
      <AddResource refreshResources={getAllResources} />
<div className="allResources">
      {resources.map((resource) => (
          <ResourceCard key={resource._id} {...resource} />
      ))} 
      </div>    
    </div>
  );
}

export default ResourceListPage;
