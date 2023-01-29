import { Col, ListGroup, Row, Image, Button, Form } from "react-bootstrap";


const CartItemComponent = () => {
  return (
    <>
          <ListGroup.Item>
              <Row>
                  <Col md={2}>
                      <Image  crossOrigin="anonymous" src="/images/dad-jokes-cc.jpg" fluid />
                  </Col>
                  <Col md={2}>
                      <h4> Product Name</h4>
                  </Col>
                  <Col md={2}>
                      <b>$300</b>
                  </Col>
                  <Col md={3}>
                      <Form.Select>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                      </Form.Select>
                  </Col>
                  <Col md={3}>
                      <Button type="button" variant="secondary" onClick={() => { window.confirm("Are you sure?") }}><i className="bi bi-trash"></i></Button>
                      <br />
                  </Col>
              </Row>
      </ListGroup.Item>
    </>
  );
};

export default CartItemComponent;