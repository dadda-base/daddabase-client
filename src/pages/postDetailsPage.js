import "../pages/PostDetailsPage.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import ReactPlayer from "react-player";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const baseURL = process.env.REACT_APP_API_URL;

function PostDetailsPage() {
  const storedToken = localStorage.getItem("authToken");
  const [post, setPost] = useState(null);

  const { user } = useContext(AuthContext);
  const userId = user?._id

  const { postId } = useParams();
  const navigate = useNavigate();

  const getPost = () => {
    axios
      .get(baseURL + "/api/posts/" + postId ,
      { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        const post = response.data;
        setPost(post);
      })
      .catch((error) => console.log(error));
  };

  const deletePost = () => {
    axios
      .delete(baseURL + "/api/posts/" + postId,
      { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(() => {
        navigate("/posts");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPost()
  }, [])

  console.log('userId:' + user._id);
  return (
    <div className="PostDetailsPage">
      <Card style={{ width: '80vw' }} className="PostDetailsCard">
        {post ? (
          <>
            <Card.Body className="PostDetails">
              <Card.Title><h1>Title: {post.title}</h1></Card.Title>
              <Card.Text><p>{post.description}</p></Card.Text>


              <Link to="/posts">
                <Button variant="primary">All posts</Button>
              </Link>

              {userId &&
                userId == post.user?._id
                ?
                <>
                  <Link to={`/posts/edit/${postId}`}>
                    <Button variant="success">Edit post</Button>
                  </Link>

                  <Button variant="danger" id="deleteButton" onClick={deletePost}>Delete</Button>
                </>
                : <></>
              }
            </Card.Body>
          </>
        )
          : <h1>loading........</h1>
        }
      </Card>
    </div>
  );
}

export default PostDetailsPage;
