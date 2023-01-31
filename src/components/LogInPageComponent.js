import { useContext, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import axios from "axios"
import "../components/LogInPageComponent.css"

function LogInPageComponent(props) {
  const baseURL = process.env.REACT_APP_API_URL;
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);


  const handleLoginSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(email, password)
    const requestBody = { email, password };
 
    axios.post(`${baseURL}/auth/login`, requestBody)
      .then((response) => {
      // Request to the server's endpoint `/auth/login` returns a response
        storeToken(response.data.authToken);
        authenticateUser();
        navigate('/');                               
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  }
  
  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={8}>
          <h1>Login</h1>
          <Form noValidate validated={validated} onSubmit={handleLoginSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>email</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="user email"
                  aria-describedby="inputGroupPrepend"
                  required
                  name="email"
                  onChange={handleEmail}

                />
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="at least 6 characters, at least one number, one lowercase and one uppercase letter"
                required
                name="password"
                onChange={handlePassword}
              />
            </Form.Group>
        
            <Row className="pb-2">
              <Col>
                Don't have an account?
                <Link to={"/signup"}> Sign up! </Link>
              </Col>
            </Row>
            <Button type="submit">
              Login
            </Button>
          </Form>
          { errorMessage && <p className="error-message">{errorMessage}</p> }
        </Col>
      </Row>
    </Container>
  );
}

export default LogInPageComponent;

