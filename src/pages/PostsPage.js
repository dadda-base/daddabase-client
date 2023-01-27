import "../pages/PostsPage.css";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <div className="PostsPage">
      <Link className="Link" to="/createpost">Create Post</Link>
      <div className="all-posts">
        {posts.map((post) => {
        return (
          <div className="post">
            <h1>Post Title:{post.title}</h1>
            <h4>Post description:{post.description}</h4>
          </div>
        );
        })}
        </div>
    </div>
  );
}

export default PostsPage;
