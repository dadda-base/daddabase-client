import "../pages/PostDetailsPage.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import ReactPlayer from "react-player";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

const baseURL = process.env.REACT_APP_API_URL;

function PostDetailsPage() {
  const storedToken = localStorage.getItem("authToken");
  const [post, setPost] = useState(null);

  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState([])
  const userId = user?._id

  const { postId } = useParams();
  const navigate = useNavigate();

  const getPost = () => {
    axios
      .get(baseURL + "/api/posts/" + postId,
        { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        const post = response.data;
        setPost(post);
      })
      .catch((error) => console.log(error));
  };

  const getUser = () => {
    axios
      .get(baseURL + "/api/users/" + user._id, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setProfile(res.data)
      })
      .catch((error) => console.log(error));
  }

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
    getUser()
  }, [])

  useEffect(() => {
    getPost()
  }, [])

  console.log('userId:' + profile.profileImage);
  return (
    <section className="gradient-custom vh-100">
    {post ? (
      <MDBContainer className="py-5" style={{ maxWidth: "1000px" }}>
        <MDBRow className="justify-content-center">
          <MDBCol md="12" lg="10" xl="8">
            <MDBCard>
              <MDBCardBody className="p-4">
                <MDBTypography tag="h4" className="text-center mb-4 pb-2">
                  {post.title}
                </MDBTypography>

                <MDBRow>
                  <MDBCol>
                    <div className="d-flex flex-start">
                      <MDBCardImage
                        className="rounded-circle shadow-1-strong me-3"
                        src={profile.profileImage}
                        alt="avatar"
                        width="65"
                        height="65"
                      />

                      <div className="flex-grow-1 flex-shrink-1">
                        <div>
                          <div className="d-flex justify-content-between align-items-center">
                            <p className="mb-1">
                              {profile.username}{" "}
                              {/* <span className="small">- 2 hours ago</span> */}
                            </p>
                            <a href="#!">
                              <MDBIcon fas icon="reply fa-xs" />
                              <span className="small"> reply</span>
                            </a>
                          </div>
                          <p className="small mb-0">
                            {post.description}
                          </p>
                        </div>




                      </div>
                    </div>


                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      )
    : <h1>loading........</h1>
  }
    </section>
  )
}
    
    {/* <div className="PostDetailsPage">
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
    </div> */}
    


export default PostDetailsPage;