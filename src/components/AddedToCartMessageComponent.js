import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AddedToCartMessagePage() {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="success" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>
          Added to cart!
        </Alert.Heading>
        <p>
          <Button className="me-1" variant="success">Continue Shopping</Button>
          <Link to="/cart">
            <Button variant="danger">To Cart</Button>
          </Link>
        </p>
      </Alert>
    );
  }
  return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}
