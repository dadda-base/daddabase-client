import "../pages/CreatePostPage.css";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CreatePostPage() {
  const baseURL = process.env.REACT_APP_API_URL;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();
  const { storedToken, authenticateUser ,user } = useContext(AuthContext);
  const handleTitle = (e) => setTitle(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value)
    const handleCreatePostSubmit = (e) => {
        e.preventDefault();
        const requestBody = { title, description, userId: user._id };

        axios.post(`${baseURL}/api/posts`, requestBody, {
            headers: { Authorization: `Bearer ${storedToken}` }
        })
                .then((response) => {
                    // Request to the server's endpoint `/auth/login` returns a response
                    // with the JWT string ->  response.data.authToken
                    navigate("/posts");
                })
                .catch((error) => {
                    const errorDescription = error.response.data.message;
                    setErrorMessage(errorDescription);
                })
    }
    return (
      <div className="CreatePostPage">
        <h1>Create a post</h1>
        <form className="form" onSubmit={handleCreatePostSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleTitle}
          />

          <label>description:</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleDescription}
          />

          <button type="submit">Submit Post</button>
        </form>
      </div>
    );
}
export default CreatePostPage;
