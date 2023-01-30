import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Card, Container, Row } from "react-bootstrap";
import AddResource from "../components/AddResource";
import { LinkContainer } from "react-router-bootstrap";
import "../pages/ResourceListPage.css";
import { AuthContext } from "../context/auth.context";

const baseURL = process.env.REACT_APP_API_URL;

function ResourceListPage() {
  const [resources, setResources] = useState([])
  const { isLoggedIn} = useContext(AuthContext);

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
      {isLoggedIn &&
      <AddResource refreshResources={getAllResources} />
      }

      <Container>
        <Row xs={1} md={2} lg={3} className="g-4 mt-2">
          {resources.map((resource) => (
            <Card style={{ padding: "2vw"}} >
              <Card.Body className="resourceCard">
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

    </div>
  );
}

export default ResourceListPage;
