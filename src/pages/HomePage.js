import "../pages/HomePage.css";
import ProductCarouselComponent from "../components/ProductCarouselComponent";
import CategoryCardComponent from "../components/CategoryCardComponent";

function HomePage() {
  return (
    <div className="HomePage">
      <ProductCarouselComponent />
      <CategoryCardComponent />
    </div>
  );
}

export default HomePage;
