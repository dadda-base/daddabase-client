import "../pages/PostDetailsPage.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTextArea,
} from "mdb-react-ui-kit";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Container, Nav } from "react-bootstrap";
const dayjs = require('dayjs');

const baseURL = process.env.REACT_APP_API_URL;

function PostDetailsPage() {
  const storedToken = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [profile, setProfile] = useState([]);
  const [content, setContent] = useState("");

  const userId = user?._id;

  const { postId } = useParams();
  const navigate = useNavigate();

  const getPost = () => {
    axios
      .get(baseURL + "/api/posts/" + postId,
        { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        const post = response.data;
        setContent(post.content)
        setPost(post);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getPost()
  }, [postId])

  const replyTime = dayjs(Date()).format('YYYY/MM/DD HH:mm');

  const renderTime = (time) => {
    return dayjs(time).format('YYYY/MM/DD HH:mm')
  }

  const getUser = () => {
    axios
      .get(baseURL + "/api/users/" + userId, {
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

  const uploadComment = (requestBody) => {
    axios
      .post(baseURL + "/api/posts/" + postId, requestBody,
        { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        setContent("")
        getPost()
      });
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


  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { username: profile.username, profileImage: profile.profileImage, content, replyTime };
    uploadComment(requestBody)

  };


  return (
    <section className="100%" style={{ backgroundColor: "#eee" }}>
      {post &&

        <MDBContainer className="py-5" style={{ maxWidth: "1000px" }} >
          <MDBRow className="justify-content-center">
            <MDBCol md="12" lg="10" xl="8">
              <MDBCard>
                <MDBCardBody className="topic">
                  <div className="d-flex flex-start align-items-center">
                    <MDBCardImage
                      className="rounded-circle shadow-1-strong me-3"
                      src={post.user.profileImage}
                      alt="avatar"
                      width="60"
                      height="60"
                    />
                    <div>
                      <h4 className="fw-bold text-primary mb-1">{post.user.username}</h4>
                      <p className="text-muted small mb-0">
                        {renderTime(post.createTime)}
                      </p>
                    </div>
                  </div>
                  <h3 className="mt-3 mb-4 pb-2">{post.title}</h3>
                  <p className="mt-3 mb-4 pb-2" style={{ textAlign: "start" }}>
                    {post.description}
                  </p>
                </MDBCardBody>


                {post.comment
                  ?
                  post.comment.map((e) =>
                    <MDBCardBody key={e._id}>
                      <hr />
                      {post?.user.username == e?.username
                        ?
                        <Container className="authorContainer">
                          <div className="commentUser">
                            <MDBCardImage
                              className="rounded-circle shadow-1-strong me-3"
                              src={e.profileImage}
                              alt="avatar"
                              width="40"
                              height="40"
                            />
                            <div>
                              <h6 className="fw-bold text-primary mb-1">{e.username}</h6>
                              <p className="text-muted small mb-0">
                                {renderTime(e.replyTime)}
                              </p>
                            </div>
                          </div>

                          <p className="mt-3 mb-4 pb-2" style={{ textAlign: "start" }}>
                            {e.content}
                          </p>
                        </Container>
                        :
                        <Container className="commentContainer">
                          <div className="commentUser">
                            <MDBCardImage
                              className="rounded-circle shadow-1-strong me-3"
                              src={e.profileImage}
                              alt="avatar"
                              width="40"
                              height="40"
                            />
                            <div>
                              <h6 className="fw-bold text-primary mb-1">{e.username}</h6>
                              <p className="text-muted small mb-0">
                              {renderTime(e.replyTime)}
                              </p>
                            </div>
                          </div>

                          <p className="mt-3 mb-4 pb-2" style={{ textAlign: "start" }}>
                            {e.content}
                          </p>
                        </Container>
                      }

                    </MDBCardBody>
                  )
                  : <></>
                }

                <form onSubmit={handleSubmit}>
                  <MDBCardFooter
                    className="py-3 border-0 postFooter"
                    style={{ backgroundColor: "#f8f9fa" }}

                  >
                    <div className="d-flex flex-start w-100">
                      <MDBCardImage
                        className="rounded-circle shadow-1-strong me-3"
                        src={profile?.profileImage}
                        alt="avatar"
                        width="40"
                        height="40"
                      />
                      <MDBTextArea
                        type="text"
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="leave your comment"
                        label='Message'
                        id='content'
                        rows={4}
                        style={{ backgroundColor: '#fff' }}
                        wrapperClass="w-100" />
                    </div>
                    <div className="float-end mt-2 pt-1">

                      {userId == post.user?._id
                        ?
                        <>
                          <Button size="sm" variant="danger" id="deletePostBtn" onClick={deletePost}>Delete</Button>
                        </>
                        : <></>
                      }
                      <Button size="sm" className="me-1" type="submit" >
                        Post comment
                      </Button>

                      <MDBBtn outline size="sm">
                        <LinkContainer to="/posts">
                          <Nav.Link>Cancel</Nav.Link>
                        </LinkContainer>
                      </MDBBtn>

                    </div>
                  </MDBCardFooter>
                </form>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>

      }
    </section>
  );
}

export default PostDetailsPage;