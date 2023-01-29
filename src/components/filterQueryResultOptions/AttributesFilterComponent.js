import { Form } from "react-bootstrap";

const AttributesFilterComponent = () => {
  return (
    <>
      {[{ level: ["noob", "intermediate"] }, { type: ["full-time", "part-time"] }].map(
        (item, index) => (
          <div key={index} className="mb-3">
            <Form.Label>{Object.keys(item)}</Form.Label>
            {item[Object.keys(item)].map((i, index) => (<Form.Check key={index} type="checkbox" id="default-checkbox" label={i} />))}
           
          </div>
        )
      )}
    </>
  );
};

export default AttributesFilterComponent;
