import {
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import logo from "../data/daddabase-logo.png";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import "../components/NavbarComponent.css"

const NavbarComponent = (props) => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container >
        <LinkContainer to="/">
          <Navbar.Brand className="me-5" href="/">
            <img className="logo" src={logo} alt="error" />
            DaddaBase
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <span>Together, we can go FATHER!</span>
          </Nav>
          {isLoggedIn && (
              <>
                <NavDropdown title={props.profile.name} id="collasible-nav-dropdown">
                  <Container className="dropdown">
                    <Link to={`/profiles/${props.profile._id}`}>
                      <Button variant="success">My Profile</Button>
                    </Link>
                    <Button onClick={logOutUser}>Log Out</Button>
                  </Container>
                </NavDropdown>
              </>
            )}
            {!isLoggedIn && (
              <>
                <LinkContainer to="/login" className="loginLink">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup" className="signupLink">
                  <Nav.Link>Sign up</Nav.Link>
                </LinkContainer>
              </>
            )}
          <Nav>
            <LinkContainer to="/posts">
              <Nav.Link className="Navlink">
                Posts
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/resources">
              <Nav.Link className="Navlink">
                Resources
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/products">
              <Nav.Link className="Navlink">
                Products
              </Nav.Link>
            </LinkContainer>

            

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
