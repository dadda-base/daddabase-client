import "../pages/PostDetailsPage.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTextArea,
} from "mdb-react-ui-kit";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";

const baseURL = process.env.REACT_APP_API_URL;

function PostDetailsPage() {
  const storedToken = localStorage.getItem("authToken");
  const [post, setPost] = useState(null);

  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState([])
  const [comment, setComment] = useState("")
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
  console.log(post?.user._id);
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

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    getPost()
  }, [])

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      {post &&
        <MDBContainer className="py-5" style={{ maxWidth: "1000px" }}>
          <MDBRow className="justify-content-center">
            <MDBCol md="12" lg="10" xl="8">
              <MDBCard>
                <MDBCardBody>
                  <div className="d-flex flex-start align-items-center">
                    <MDBCardImage
                      className="rounded-circle shadow-1-strong me-3"
                      src={post.user.profileImage}
                      alt="avatar"
                      width="60"
                      height="60"
                    />
                    <div>
                      <h6 className="fw-bold text-primary mb-1">{post.user.username}</h6>
                      <p className="text-muted small mb-0">
                        {/* Shared publicly - Jan 2020 */}
                      </p>
                    </div>
                  </div>
                  <h3 className="mt-3 mb-4 pb-2">{post.title}</h3>
                  <p className="mt-3 mb-4 pb-2" style={{ textAlign: "start" }}>
                    {post.description}
                  </p>

                  {/* <div className="small d-flex justify-content-start">
                  <a href="#!" className="d-flex align-items-center me-3">
                    <MDBIcon far icon="thumbs-up me-2" />
                    <p className="mb-0">Like</p>
                  </a>
                  <a href="#!" className="d-flex align-items-center me-3">
                    <MDBIcon far icon="comment-dots me-2" />
                    <p className="mb-0">Comment</p>
                  </a>
                  <a href="#!" className="d-flex align-items-center me-3">
                    <MDBIcon fas icon="share me-2" />
                    <p className="mb-0">Share</p>
                  </a>
                </div> */}
                </MDBCardBody>

                <MDBCardFooter
                  className="py-3 border-0"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="d-flex flex-start w-100">
                    <MDBCardImage
                      className="rounded-circle shadow-1-strong me-3"
                      src={profile.profileImage}
                      alt="avatar"
                      width="40"
                      height="40"
                    />
                    <MDBTextArea 
                      type="text"
                      name="comment"
                      value={comment}
                      placeholder="leave your comment"
                      label='Message' 
                      id='comment' 
                      rows={4} 
                      style={{ backgroundColor: '#fff' }} 
                      wrapperClass="w-100" />
                  </div>
                  <div className="float-end mt-2 pt-1">
                    <MDBBtn size="sm" className="me-1">Post comment</MDBBtn>

                    <MDBBtn outline size="sm">
                      <LinkContainer to="/posts">
                        <Nav.Link>Cancel</Nav.Link>
                      </LinkContainer>
                    </MDBBtn>
                  </div>
                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      }
    </section>
  );
}

export default PostDetailsPage;