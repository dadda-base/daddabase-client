import SectionCarouselComponent from "../components/SectionCarouselComponent";
import CategoryCardComponent from "../components/CategoryCardComponent";
import { Container, Row } from "react-bootstrap";
import axios from 'axios';
import { useEffect, useState } from "react";


function HomePage() {
  const [categories, setCategories] = useState([]);
  const baseURL = process.env.REACT_APP_API_URL;
  const getAllCategories = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");
    // Send the token through the request "Authorization" Headers
    axios
      .get(`${baseURL}/api/categories`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        setCategories(response.data);
      })
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="HomePage">
      <SectionCarouselComponent />
      <Container>
        <Row xs={1} md={2} lg={3} className=" g-4 mt-2">
          {categories.map((category) => {
            return <CategoryCardComponent key={category._id} category={category} />;
          })}
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
