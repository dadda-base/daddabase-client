import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import dadJokesCC from "../data/dad-jokes-cc.jpg"

const CategoryCardComponent = () => {
  return (
    <Card style={{ width: '15vw' }}>
          <Card.Img style={{height: "10vw"}} variant="top" src={dadJokesCC} />
      <Card.Body>
        <Card.Title>Ultimate Dad Jokes</Card.Title>
        <Card.Text>
                  Embarrising your kids is your duty!!.
        </Card.Text>
        <Button variant="primary">Jokes</Button>
      </Card.Body>
    </Card>
  );
}

export default CategoryCardComponent;