import Carousel from "react-bootstrap/Carousel";
import { LinkContainer } from "react-router-bootstrap";

const SectionCarouselComponent = () => {

  const cursorPointer = {
    cursor: "pointer",
  }

  return (
    <Carousel>
      <Carousel.Item>
        <img
          objectfit="cover"
          crossOrigin="anonymous"
          className="d-block w-100"
          style={{ height: "30vh" }}
          src={"/images/carousel-1.webp"}
          alt="First slide"
        />
        <Carousel.Caption>
          <LinkContainer style={cursorPointer} to="/dad-jokes">
            <h1>Dad Jokes</h1>
          </LinkContainer>
          <p>Stock up on jokes</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          objectfit="cover"
          crossOrigin="anonymous"
          className="d-block w-100"
          style={{ height: "30vh" }}
          src={"/images/carousel-2.jpg"}
          alt="Second slide"
        />

        <Carousel.Caption>
        <LinkContainer style={cursorPointer} to="/resources">
            <h1>Resources</h1>
          </LinkContainer>
          <p>Help, advice, services and more.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          objectfit="cover"
          crossOrigin="anonymous"
          className="d-block w-100"
          style={{ height: "30vh" }}
          src={"/images/carousel-3.jpg"}
          alt="Third slide"
        />

        <Carousel.Caption>
          <LinkContainer style={cursorPointer} to="/dad-music">
            <h1>Dad Music</h1>
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
