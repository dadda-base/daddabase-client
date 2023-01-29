import "../pages/HomePage.css";
import SectionCarouselComponent from "../components/SectionCarouselComponent";
import CategoryCardComponent from "../components/CategoryCardComponent";
import { Container, Row } from "react-bootstrap";

function HomePage() {
  {
    /* for simulating dynamic cards */
  }
  const categories = [
    { category: "Dad Jokes", description: "Stock up on Dad Jokes", image:"/images/dad-jokes-cc.jpg", route: "/dad-jokes" },
    { category: "Dad Music", description: "Rock out in style", image:"/images/dad-music-cc.jpg", route:"/dad-music"},
    { category: "Advice", description: "Get in touch with other dads", image:"/images/dad-jokes-cc.jpg", route: "/advice" },
    { category: "Dad Jokes", description: "Stock up on Dad Jokes", image: "/images/dad-jokes-cc.jpg", route: "/dad-jokes" },
    { category: "Dad Music", description: "Rock out in style", image:"/images/dad-music-cc.jpg", route: "/dad-music"},
    { category: "Advice", description: "Get in touch with other dads", image:"/images/dad-jokes-cc.jpg", route: "/dad-jokes"  }
   
  ];
  return (
    <div className="HomePage">
      <SectionCarouselComponent />
      <Container>
        <Row xs={1} md={2} lg={3} className=" g-4 mt-2">
          {categories.map((category, index) => {
            return <CategoryCardComponent key={index}  index={index} category={category} />;
          })}
        </Row>
</Container>
    </div>
  );
}

export default HomePage;
