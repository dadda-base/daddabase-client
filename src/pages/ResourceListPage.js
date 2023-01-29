import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Container, Nav, Row } from "react-bootstrap";
import AddResource from "../components/AddResource";
import { LinkContainer } from "react-router-bootstrap";
import "../pages/ResourceListPage.css";

const baseURL = process.env.REACT_APP_API_URL;

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

      <Container>
        <Row xs={1} md={2} lg={3} className="g-4 mt-2">
          {resources.map((resource) => (
            <Card style={{ padding: "2vw"}} className="resourceCard">
              <Card.Body >
                <h1>{resource.title}</h1>
                <p>{resource.description}</p>
                <LinkContainer to={`/resources/${resource._id}`}>
                  <Button variant="primary">Details</Button>
                </LinkContainer>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>

      {/* <div className="allResources">
        {resources.map((resource) => (
          <ResourceCard key={resource._id} {...resource} />
        ))}
      </div> */}
    </div>
  );
}

export default ResourceListPage;
