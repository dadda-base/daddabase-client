import { Alert, Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import CartItemComponent from "../components/CartItemComponent";

const CartPage = () => {
  return (
    <Container fluid>
      <Row className="mt-4">
        <Col md={8}>
          <h1>Shopping Cart</h1>
          <ListGroup variant="flush">
            {/*Dummy data for testing */}
            {Array.from({ length: 3 }).map((item, index) => (
              <CartItemComponent key={index} />
            ))}
          </ListGroup>
          <Alert variant="info"> Cart is currently empty</Alert>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>Subtotal (3 Items)</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Price <span className="fw-bold">$453</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <LinkContainer to="/cart">
                <Button style={{ width: "100%" }}>Proceed To Checkout</Button>
              </LinkContainer>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
