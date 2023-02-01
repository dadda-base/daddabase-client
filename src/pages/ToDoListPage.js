import { Container, Col, Row, Navbar, Image } from "react-bootstrap";
import CreateAreaComponent from "../components/CreateAreaComponent";
import { useState } from "react";
import NoteComponent from "../components/NoteComponent";

function ToDoListPage() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
    }
    
    function deleteNote(id) {
        setNotes(prevNotes => {
            return prevNotes.filter((note, index) => {
                return index !== id;
                console.log(notes)
            })
        })
    }
  console.log(notes);
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Row>
            <Col>
              <h1 style={{color: "#fff"}}>Do It! Cos she'll kill you if you don't...</h1>
            </Col>
          </Row>
        </Container>
      </Navbar>
          <CreateAreaComponent onAdd={addNote}  />
          {notes.map((note, index) => {
              return(
                  <NoteComponent key={index} id={index}  note={note} callbackToDeleteNote={deleteNote}/>
              )
          })}
    </>
  );
}

export default ToDoListPage;
