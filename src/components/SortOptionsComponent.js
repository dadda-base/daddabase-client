import { Form } from "react-bootstrap";

const SortOptionsComponent = () => {
  return (
    <Form.Select aria-label="Default select example">
      <option>Bonus</option>
      <option value="price_1">Price: Ascending</option>
      <option value="price_-1">Price: Descending</option>
      <option value="rating_-1">Customer Rating</option>
      <option value="name_1">Name A-Z</option>
      <option value="name_-1">Name Z-A</option>
    </Form.Select>
  );
};

export default SortOptionsComponent;
