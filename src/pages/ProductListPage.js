import { Button, ListGroup, Container, Col, Row } from "react-bootstrap";
import SortOptionsComponent from "../components/SortOptionsComponent";
import AttributesFilterComponent from "../components/filterQueryResultOptions/AttributesFilterComponent";
import PriceFilterComponent from "../components/filterQueryResultOptions/PriceFilterComponent";
import RatingFilterComponent from "../components/filterQueryResultOptions/RatingFilterComponent";
import CategoryFilterComponent from "../components/filterQueryResultOptions/CategoryFilterComponent";
import ProductForListComponent from "../components/ProductForListComponent";
import PaginationComponent from "../components/PaginationComponent";

const ProductListPage = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item className="mb-3 mt-3">
              <SortOptionsComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              <PriceFilterComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              <RatingFilterComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              <CategoryFilterComponent />
            </ListGroup.Item>
            <ListGroup.Item>
              <AttributesFilterComponent />
            </ListGroup.Item>

            <ListGroup.Item>
              <Button variant="primary">Filter</Button>
              <Button variant="danger">Reset Filters</Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={9}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
            {Array.from({ length: 5 }).map((_, index) => (
              <ProductForListComponent
                key={index}
                images={["jokes", "music", "resources", "posts", "merch"]}
                index={index}
              />
            ))}
          </div>
          <PaginationComponent />
        </Col>
      </Row>
    </Container>
  );
};
export default ProductListPage;
