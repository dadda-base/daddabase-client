import "../pages/SignUpPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Row,
  Container,
  Col,
  Form,
  Button,
  InputGroup,
  Spinner,
  Alert,
} from "react-bootstrap";

function SignUpPage() {
  const baseURL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    const requestBody = { email, password, name };
    console.log(email)
    axios.post(`${baseURL}/auth/signup`, requestBody)
      .then((response) => {
        console.log(`axios response:${response}`)
        navigate('/logIn');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={8}>
          <h1>Sign Up</h1>
          <Form noValidate validated={validated} onSubmit={handleSignUpSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Name"
                name="name"
                onChange={handleName}
              />
              <Form.Control.Feedback type="invalid">
                Enter a name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>email</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="email"
                  aria-describedby="inputGroupPrepend"
                  required
                  name="email"
                  onChange={handleEmail}
                />
                <Form.Control.Feedback type="invalid">
                  enter a valid email address
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="choose a password"
                required
                name="password"
                minlenght={6}
                onChange={handlePassword}
              />
              <Form.Text>
                {" "}
                password must have at least 6 characters long and contain 1
                uppercase and one lowercase
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                password must have at least 6 characters long and contain 1
                uppercase and one lowercase{" "}
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="pb-2">
              <Col>
                Do you have an account already?
                <Link to={"/login"}> Login </Link>
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
              Sign up
            </Button>
            <Alert show={true} variant="danger">
              eg. User with this email already exists!
            </Alert>
            <Alert show={true} variant="info">
              eg. User created
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );

}

export default SignUpPage;
