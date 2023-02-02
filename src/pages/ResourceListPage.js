import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Card, Container, Row } from "react-bootstrap";
import AddResource from "../components/AddResource";
import { LinkContainer } from "react-router-bootstrap";
import "../pages/ResourceListPage.css";
import { AuthContext } from "../context/auth.context";
import Search from "../components/Search";

const baseURL = process.env.REACT_APP_API_URL;

function ResourceListPage() {
  const [resources, setResources] = useState([])
  const { isLoggedIn } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");
  const [searchQuery, setSearchQuery] = useState("");

  const resourcesToDisplay = resources.filter((resource) => {
    return resource.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getAllResources = () => {
    axios.get(baseURL + "/api/resources",
      { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((res) => {
        setResources(res.data.reverse())
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
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Row xs={1} md={2} lg={3} className="g-4 mt-2">
          {resourcesToDisplay.length > 0 ?
            resourcesToDisplay.map((resource) => {
              return (
                <Card style={{ padding: "0 2vw 3vh" }} >
                  <Card.Body className="resourceCard">
                    <h1>{resource.title}</h1>
                    <p>{resource.description}</p>
                    <LinkContainer id="resourceButton" to={`/resources/${resource._id}`}>
                      <Button variant="primary">Details</Button>
                    </LinkContainer>
                  </Card.Body>
                </Card>
              )
            }) :
            <p>Oops!There is no more post to show</p>
          }
        </Row>
      </Container>

    </div>
  );
}

export default ResourceListPage;
