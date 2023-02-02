import "../pages/PostsPage.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Card, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AddPost from "../components/AddPost";
import { AuthContext } from "../context/auth.context";
import Search from "../components/Search";

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const baseURL = process.env.REACT_APP_API_URL;
  const [searchQuery, setSearchQuery] = useState("");

  const postsToDisplay = posts.filter((post) => {
    return post.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getAllPosts = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${baseURL}/api/posts`,
        { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        setPosts(response.data.reverse());
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
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Row xs={1} md={2} lg={3} className="g-4 mt-2">
          {postsToDisplay.length > 0 ?
            postsToDisplay.map((post) => {
              return (
                <Card style={{ padding: "0 2vw 3vh" }}>
                  <Card.Body className="postCard">
                    <h2>{post.title}</h2>
                    <br />
                    <LinkContainer to={`/posts/${post._id}`}>
                      <Button variant="primary" id="postButton">Details</Button>
                    </LinkContainer>
                  </Card.Body>
                </Card>
              )
            }) :
            <p>Oops!There is no more post to show</p>
          }
        </Row>
      </Container>


      {/* <Container>
        <Row xs={1} md={2} lg={3} className="g-4 mt-2">
          {posts.map((post) => (
            <Card style={{ padding: "0 2vw 3vh" }}>
              <Card.Body className="postCard">
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <LinkContainer to={`/posts/${post._id}`}>
                  <Button variant="primary" id="postButton">Details</Button>
                </LinkContainer>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container> */}
    </div>
  );
}

export default PostsPage;
