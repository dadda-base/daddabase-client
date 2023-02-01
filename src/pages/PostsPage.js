import "../pages/PostsPage.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Card, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AddPost from "../components/AddPost";
import { AuthContext } from "../context/auth.context";

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const baseURL = process.env.REACT_APP_API_URL;
  const getAllPosts = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${baseURL}/api/posts`, 
      { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="PostListPage">
      {isLoggedIn && <AddPost refreshPosts={getAllPosts} />}

      <Container>
        <Row xs={1} md={2} lg={3} className="g-4 mt-2">
          {posts.map((post) => (
            <Card style={{ padding: "2vw" }}>
              <Card.Body className="postCard">
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <LinkContainer to={`/posts/${post._id}`}>
                  <Button variant="primary">Details</Button>
                </LinkContainer>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default PostsPage;
