import { Link } from "react-router-dom";
import "./ResourceCard.css"

function ResourceCard ( { title, description, imageUrl, videoUrl, _id } ) {
  
  return (
    <div className="ResourceCard card">
      <Link to={`/resources/${_id}`}>
        <h3>{title}</h3>
      </Link>
      
      
    </div>
  );
}
 
export default ResourceCard;