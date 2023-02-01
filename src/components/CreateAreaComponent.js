import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import "./CreateAreaComponent.css";
import { Container, Row, Col } from "react-bootstrap";
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
    <Container>
      <Row>
        <Col>
          <form className="create-note">
            <input
              type="text"
              name="title"
              placeholder="title"
              onChange={handleChange}
              value={note.title}
            />
            <hr />
            <textarea
              name="content"
              rows="3"
              placeholder="make a note"
              onChange={handleChange}
              value={note.content}
            />
            <Fab onClick={submitNote}>
              <AddIcon />
            </Fab>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateAreaComponent;
