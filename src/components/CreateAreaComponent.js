import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import "./CreateAreaComponent.css";
import { Container, Row, Col, Card } from "react-bootstrap";
const CreateAreaComponent = (props) => {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [isExpanded, setExpanded] = useState([]);

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
    });
    event.preventDefault();
  }

  return (
    <Container className="to-do-list">
      <Row>
        <Col>
          <Card className="create-note" style={{ maxHeight: "200px" }}>
            <input
              type="text"
              name="title"
              placeholder="title"
              onChange={handleChange}
              value={note.title}
            />
            <textarea
              name="content"
              placeholder="make a note"
              onChange={handleChange}
              value={note.content}
            />
            <Fab onClick={submitNote}>
              <AddIcon />
            </Fab>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateAreaComponent;
