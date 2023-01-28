import Carousel from "react-bootstrap/Carousel";
import { LinkContainer } from "react-router-bootstrap";
import carousel1 from "../data/carousel-1.webp";
import carousel2 from "../data/carousel-2.jpg";
import carousel3 from "../data/carousel-3.jpg";
const SectionCarouselComponent = () => {

  const cursorPointer = {
    cursor: "pointer",
  }
  
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ height: "30vh" }}
          src={carousel1}
          alt="First slide"
        />
        <Carousel.Caption>
          <LinkContainer style={cursorPointer} to="/dad-jokes">
            <h3>Dad Jokes</h3>
          </LinkContainer>
          <p>Stock up on jokes</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ height: "30vh" }}
          src={carousel2}
          alt="Second slide"
        />

        <Carousel.Caption>
        <LinkContainer style={cursorPointer} to="/resources">
            <h3>Resources</h3>
          </LinkContainer>
          <p>Help, advice, services and more.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ height: "30vh" }}
          src={carousel3}
          alt="Third slide"
        />

        <Carousel.Caption>
          <LinkContainer style={cursorPointer} to="/dad-music">
            <h3>Dad Music</h3>
          </LinkContainer>
          <p>
           Best music for dads
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default SectionCarouselComponent;
