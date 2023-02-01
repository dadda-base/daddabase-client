import {Button,Card} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CategoryCardComponent = (props) => {
  return (
    <Card style={{ margin: "0", padding: "2vw" }}>
      <Card.Img
        variant="top"
        className="cc-image"
        crossOrigin="anonymous"
        objectFit="cover"
        style={{ maxHeight: "20vh" }}
        src={props.category.image}
      />
      <Card.Body>
        <Card.Title>{props.category.name}</Card.Title>
        <Card.Text>{props.category.description}</Card.Text>
        <LinkContainer to={'/categories/' + props.category._id}>
          <Button variant="primary">Go To Jokes</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default CategoryCardComponent;
