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
const baseURL = process.env.REACT_APP_API_URL;

function SignUpPage() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };
    // Make an axios request to the API
    // If the POST request is a successful redirect to the login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${baseURL}/auth/signup`, requestBody)
      .then((response) => {
        console.log(baseURL);
        navigate("/logIn");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={8}>
          <h1>Sign Up</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Name"
                name="name"
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
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  required
                  name="email"
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
                minLenght={6}
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
            <Form.Group controlId="formBasicPasswordRepeat">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="confirm password"
                required
                name="confirmPassword"
                minLenght={6}
              />
              <Form.Control.Feedback type="invalid">
                Passwords did not match!{" "}
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
              Submit
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

  {
    /*<div className="SignUpPage">
      <h1>Sign Up</h1>

      <form className="form" onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input 
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />

        <label>Password:</label>
        <input 
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <label>Name:</label>
        <input 
          type="text"
          name="name"
          value={name}
          onChange={handleName}
        />

        <button type="submit">Sign Up</button>
      </form>

      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  */
  }
}

export default SignUpPage;
