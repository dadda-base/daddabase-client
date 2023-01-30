import { useContext, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import axios from "axios"

function LogInPageComponent(props) {
  const baseURL = process.env.REACT_APP_API_URL;
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const { storeToken, storeUser, authenticateUser } = useContext(AuthContext);

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
      // with the JWT string ->  response.data.authToken
        console.log('JWT token', response.data.authToken );
      
        storeToken(response.data.authToken);
        storeUser(response.data.user)
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
                  placeholder="Username"
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
                placeholder="choose a password"
                required
                name="password"
                onChange={handlePassword}
              />
            </Form.Group>
         {  /* <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="keep me logged in"
                name="doNotLogOut"
              />
            </Form.Group>*/}
            <Row className="pb-2">
              <Col>
                Don't have an account?
                <Link to={"/signup"}> Sign up! </Link>
              </Col>
            </Row>
            <Button type="submit">
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Login
            </Button>
            <Alert show={true} variant="danger">
              eg. invalid credentials
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LogInPageComponent;

