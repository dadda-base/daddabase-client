import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./ResourceCard.css"

function ResourceCard({ title, description, imageUrl, videoUrl, _id }) {

  return (
    <Card style={{ margin: "0", padding: "2vw" }}>
      <Card.Body class="resourceCard">
        <LinkContainer to={`/resources/${_id}`}>
          <Card.Title>{title}</Card.Title>
        </LinkContainer>
      </Card.Body>

    </Card>
  );
}

export default ResourceCard;