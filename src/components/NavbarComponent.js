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

const NavbarComponent = (props) => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="me-5" href="/">
            <img className="logo" src={logo} alt="error" />
            DaddaBase
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <h5>Together we can go FATHER!</h5>
          </Nav>
          <Nav>
            <LinkContainer to="/bonus1">
              <Nav.Link>
                Bonus
                <span className="position-absolute top-1 start-10 translate-middle p-2 border bg-danger border-light rounded-circle"></span>
              </Nav.Link>
            </LinkContainer>
            <Nav.Link href="/posts">Posts</Nav.Link>
            <Nav.Link href="/resources">Resources</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
            {isLoggedIn && (
              <>
                <NavDropdown title={props.profile.name} id="collasible-nav-dropdown">
                  <NavDropdown.Item
                    as={Link}
                    eventKey={`/profiles/${props.profile._id}`}
                    to={`/profiles/${props.profile._id}`}
                  >
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  {/*<NavDropdown.Item to>*/}
                  <Button onClick={logOutUser}>Log Out</Button>
                  {/* <NavDropdown.Item>*/}
                    <Button onClick={logOutUser}>Log Out</Button>
                </NavDropdown>
              </>
            )}
            {!isLoggedIn && (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <Nav.Link>Sign up</Nav.Link>
                </LinkContainer>
              </>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
