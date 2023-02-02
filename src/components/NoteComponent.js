import DeleteIcon from '@mui/icons-material/Delete';

function NoteComponent(props) {

    function handleClick() {
       props.callbackToDeleteNote(props.id)
   }

    return (
        <div className="note">
            Note. 
            <h3>{props.note.title}</h3>
            <span>{props.note.content}</span>
            <button onClick={handleClick}>
                <DeleteIcon/>
            </button>
        </div>
    )
}

export default NoteComponent;