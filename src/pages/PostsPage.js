import "../pages/PostsPage.css";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Button, Card, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AddPost from "../components/AddPost";

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const baseURL = process.env.REACT_APP_API_URL;
  const getAllPosts = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");
    // Send the token through the request "Authorization" Headers
    axios
      .get(`${baseURL}/api/posts`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        setPosts(response.data);
      })
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="PostListPage">
      <AddPost style={{position: "absolute", top: "0"}} refreshPosts={getAllPosts} />

      <Container>
        <Row xs={1} md={2} lg={3} className="g-4 mt-2">
          {posts.map((post) => (
            <Card style={{ padding: "2vw" }} >
              <Card.Body className="postCard">
                <h2>{post.title}</h2>
                <p>{post.description}</p>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default PostsPage;
