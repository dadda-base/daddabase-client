import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import dadJokesCC from "../data/dad-jokes-cc.jpg"

const CategoryCardComponent = () => {
  return (
    <Card style={{ width: '18rem' }}>
          <Card.Img className="card-image" variant="top" src={dadJokesCC} />
      <Card.Body>
        <Card.Title>Ultimate Dad Jokes</Card.Title>
        <Card.Text>
                  Embarrising your kids is not a curse... it's your duty!! {<br />}
                  Stock up on jokes, add your own or both!.
        </Card.Text>
        <Button variant="primary">Jokes</Button>
      </Card.Body>
    </Card>
  );
}

export default CategoryCardComponent;