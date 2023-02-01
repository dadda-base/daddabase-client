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


  const onChange = () => {
    const password = document.querySelector("input[name=password]")
    const confirmPassword = document.querySelector("input[name=confirmPassword]")
    console.log(confirmPassword, password)
    if (confirmPassword.value === password.value) {
      confirmPassword.setCustomValidity("")
    }
    else {
      confirmPassword.setCustomValidity("Passwords didn't match")
    }
  }

  const handleSignupSubmit = (e) => {
    // const form = event.currentTarget;
    //  if (form.checkValidity() === false) {

    //     event.stopPropagation();

    //   }
    e.preventDefault();
    const requestBody = { email, password, name };

    axios.post(`${baseURL}/auth/signup`, requestBody)
      .then((response) => {
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
          <Form onSubmit={handleSignupSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={handleName}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>email</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  required
                  type="email"
                  placeholder="email"
                  name="email"
                  value={email}
                  onChange={handleEmail}
                />
              </InputGroup>
              
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="choose a password"
                name="password"
                value={password}
                minlenght={6}
                onChange={handlePassword}
              />
              <Form.Text>
                {" "}
                password must have at least 6 characters long and contain 1
                uppercase and one lowercase
              </Form.Text>
             
            </Form.Group>
            <Form.Group controlId="formBasicPasswordRepeat">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="confirm password"
                required
                name="confirmPassword"
                minlenght={6}
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                passwords don't match
              </Form.Control.Feedback>
            </Form.Group>
            <Row className="pb-2">
              <Col>
                Do you have an account already?
                <Link to={"/login"}> Login </Link>
              </Col>
            </Row>
            <Button type="submit">
              {/* <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              /> */}
              Sign up
            </Button>
            {/* <Alert show={true} variant="danger">
              eg. User with this email already exists!
            </Alert>
            <Alert show={true} variant="info">
              eg. User created
            </Alert> */}
          </Form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </Col>
      </Row>
    </Container>
  );

}

export default SignUpPage;
