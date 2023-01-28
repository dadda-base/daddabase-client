import "../pages/HomePage.css";
import SectionCarouselComponent from "../components/SectionCarouselComponent";
import CategoryCardComponent from "../components/CategoryCardComponent";

function HomePage() {
  return (
    <div className="HomePage">
      <SectionCarouselComponent />
      <CategoryCardComponent />
    </div>
  );
}

export default HomePage;
