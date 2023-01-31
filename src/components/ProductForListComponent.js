import { Card, Col, Button, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const ProductForListComponent = (props) => {
  console.log(props.product._id)
  return (
    <Card style={{ marginTop: "30px", marginBottom: "50px", minWidth: "60vw"}}>
      <Row>
        <Col lg={5}>
          <Card.Img  variant="top" src={props.product.images}/>
        </Col>
        <Col lg={7}>
          <Card.Body>
            <Card.Title>{props.product.title}</Card.Title>
            <Card.Text>
              {props.product.description}
            </Card.Text>
            <Card.Text>
              <LinkContainer to="/">
                <Button variant="danger">Link to amazon</Button>
            </LinkContainer>
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductForListComponent;
