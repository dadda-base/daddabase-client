import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AuthContext } from "../context/auth.context";
import "../pages/RandomDadJokePage.css"

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
  }, []);

  return (
    <div className="dadJokePage">
    <Container className="dadJoke">
    <Button variant="primary" onClick={getDadJoke}>Want more?</Button>
     
      <br />
      <br />      
      <h5>{joke}</h5>    
    </Container>
    </div>
  );
}

export default RandomDadJokePage;
