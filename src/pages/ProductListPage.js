import {Container, Col, Row } from "react-bootstrap";
import ProductForListComponent from "../components/ProductForListComponent";
import axios from 'axios';
import { useState, useEffect } from "react";


const ProductListPage = () => {

  const [products, setProducts] = useState([]);
  const baseURL = process.env.REACT_APP_API_URL;
  const getAllProducts = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");
    // Send the token through the request "Authorization" Headers
    axios
      .get(`${baseURL}/api/products`)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Container fluid>
      <Row>
        <Col>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
            {products.map((product) => (
              <ProductForListComponent key={product._id}  product={product} />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default ProductListPage;
