import {
  Badge,
  Button,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
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
            <InputGroup>
              <DropdownButton id="dropdown-basic-button" title="Bonus">
                <Dropdown.Item>Bonus 1</Dropdown.Item>
                <Dropdown.Item>Bonus 2</Dropdown.Item>
                <Dropdown.Item>Bonus 3</Dropdown.Item>
              </DropdownButton>
              <Form.Control type="text" placeholder="Bonus" />
              <Button variant="warning">
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
          </Nav>
          <Nav>
            <LinkContainer to="/bonus1">
              <Nav.Link>
                Bonus
                <span className="position-absolute top-1 start-10 translate-middle p-2 border bg-danger border-light rounded-circle"></span>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/posts">
              <Nav.Link>
                Posts
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/resources">
              <Nav.Link>
                Resources
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/products">
              <Nav.Link>
                Products
              </Nav.Link>
            </LinkContainer>


            {isLoggedIn && (
              <>
                <NavDropdown title={props.profile.name} id="collasible-nav-dropdown">
                  <NavDropdown.Item
                    as={Link}
                    eventKey={`/profiless/${props.profile._id}`}
                    to={`/profiles/${props.profile._id}`}
                  >
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  {/*<NavDropdown.Item to>*/}
                  <Button onClick={logOutUser}>Log Out</Button>
                  {/* <NavDropdown.Item>*/}
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

            <LinkContainer to="/cart">
              <Nav.Link>
                <Badge pill bg="danger">
                  2
                </Badge>
                <i className="bi bi-cart4"></i>
                <span className="ms-1">Bonus</span>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
