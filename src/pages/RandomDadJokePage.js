import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AuthContext } from "../context/auth.context";

function RandomDadJokePage() {
  const baseURL = process.env.REACT_APP_API_URL;
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const { storedToken, authenticateUser } = useContext(AuthContext);
  const [joke, setJoke] = useState("");

  const getDadJoke = () => {
    axios
      .get(baseURL + "/api/random-dad-jokes", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        const joke = res.data[Math.floor(Math.random() * res.data.length)].joke;
        setJoke(joke);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getDadJoke();
  }, [<RandomDadJokePage />]);

  return (
    <Container>
      <Row>
        <Col md={9}>
          <h5>{joke}</h5>
        </Col>
        <Col md={3}>
          <LinkContainer to="/random-dad-jokes">
            <Button className="mt-5">Want more?</Button>
          </LinkContainer>
        </Col>
      </Row>
    </Container>
  );
}

export default RandomDadJokePage;
