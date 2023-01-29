import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  Image,
  ListGroup,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import AddedToCartMessageComponent from "../components/AddedToCartMessageComponent";
import { Rating } from "react-simple-star-rating";
import ImageZoom from "js-image-zoom";
import { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";

const ProductDetailsPage = () => {
    {/*var options = {
        scale: 2,
        offset: { vertical: 0, horizontal: 0 }
    }
    useEffect(() => {
        new ImageZoom(document.getElementById("first"), options)
        new ImageZoom(document.getElementById("second"), options)
        new ImageZoom(document.getElementById("third"), options)
        new ImageZoom(document.getElementById("forth").options)
    })
*/}
  const { productId } = useParams();
  console.log(productId);
  return (
    <Container>
      <AddedToCartMessageComponent />
      <Row className="mt-5">
              <Col style={{ zIndex: "1" }} crossOrigin="anonymous"md={4}>
          <div id="first">
            <Image crossOrigin="anonymous" fluid src="/images/dad-music-cc.jpg" alt="" />
          </div>
          <br />
          <div id="second">
            <Image crossOrigin="anonymous" fluid src="/images/dad-jokes-cc.jpg" alt="" />
          </div>
          <br />
          <div id="third">
            <Image crossOrigin="anonymous" fluid src="/images/merch-category.png" alt="" />
          </div>
          <br />
          <div id="fourth">
            <Image crossOrigin="anonymous" fluid src="/images/merch-category.png" alt="" />
          </div>
          <br />
        </Col>
        <Col md={8}>
          <Row>
            <Col md={8}>
              <ListGroup.Item>
                <h1>Product Title</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating readonly size={20} initialValue={3} /> (3)
              </ListGroup.Item>
              <ListGroup.Item>
                Price<span className="fw-bold">$324</span>
              </ListGroup.Item>
              <ListGroup.Item>
                description lorem ipsum jasdjasg jdhd{" "}
              </ListGroup.Item>
              <ListGroup.Item>
                Status <span className="fw-bold">In Stock</span>
              </ListGroup.Item>
            </Col>
            <Col md={4}>
              Quantity:
              <Form.Select size="lg">
                <option>1</option>
                <option value="1">2</option>
                <option value="2">3</option>
                <option value="3">4</option>
              </Form.Select>
              <ListGroup.Item>
                Price<span className="fw-bold">$324</span>
                          </ListGroup.Item>
                          <LinkContainer to="/cart">
              <Button style={{ width: "100%" }} variant="danger">
                Add to cart
                              </Button>
                              </LinkContainer>
            </Col>
          </Row>
          <Row>
            <Col className="mt-5">
              <h5>REVIEWS</h5>
              <ListGroup variant="flush">
                {/* some dummy content for testing */}
                {Array.from({ length: 15 }).map((_, index) => (
                  <ListGroup.Item key={index}>
                    John Doe <br />
                    <Rating readonly size={20} initialValue={4} /> <br />
                    20-09-2020 <br />
                    example review
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <hr />
            Send Review Form
            <Alert variant="success">success message</Alert>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Write review</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
              <Form.Select aria-label="default select example">
                <option value="5"> 5- Excellent</option>
                <option value="4"> 4- Very Good</option>
                <option value="3"> 3- Average </option>
                <option value="2"> 2- Poor</option>
                <option value="1"> 1- Useless</option>
              </Form.Select>
              <Button className="mt-3 mb-3" variant="warning">
                Submit Review
              </Button>
            </Form>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailsPage;
