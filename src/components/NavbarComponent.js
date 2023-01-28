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

const NavbarComponent = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="me-5" href="/">DaddaBase</Navbar.Brand>
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
            <Nav.Link href="/bonus2">Placeholder</Nav.Link>
            <Nav.Link href="/bonus3">Placeholder</Nav.Link>
            <NavDropdown title="John Doe" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} eventKey="/user/:userId" to="/user/:userId">
                My Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item to>Log Out</NavDropdown.Item>
            </NavDropdown>
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
              <Nav.Link>Sign up</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cart">
              <Nav.Link>
                <Badge pill bg="danger">
                  2
                </Badge>
                <i class="bi bi-cart4"></i>
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
