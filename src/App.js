import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/auth.context";
import axios from "axios";

///////Our Components///////////
///Components/////
import NavbarComponent from "./components/NavbarComponent";
import RoutesWithUserChatComponent from "./components/user/RoutesWithUserChatComponent";
/////pages///////
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import ErrorPage from "./pages/ErrorPage";
import ProfilePage from "./pages/ProfilePage";
import ResourceListPage from "./pages/ResourceListPage";
import PostsPage from "./pages/PostsPage";
import Footer from "./components/FooterComponent";
import ResourceDetailsPage from "./pages/ResourceDetailsPage";
import ProfileEditPage from "./pages/ProfileEditPage";
import CreatePostPage from "./pages/CreatePostPage";
import EditResourcePage from "./pages/EditResourcePage";
import ProductListPage from "./pages/ProductListPage";
/////////////////////////////////

function App() {
  const baseURL = process.env.REACT_APP_API_URL;
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const { storedToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const getUserProfile = () => {
    isLoggedIn &&
      axios
        .get(`${baseURL}/api/users/${user._id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          const oneProfile = response.data;
          setProfile(oneProfile);
        })
        .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUserProfile();
  }, [user]);
  const deleteUser = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .delete(`${baseURL}/api/users/${user._id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/");
        logOutUser();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <NavbarComponent profile={profile} />
      <Routes>
        <Route element={<RoutesWithUserChatComponent />}>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/signup"} element={<SignUpPage />} />
          <Route path={"/logIn"} element={<LogInPage />} />
          <Route
            path={`/profiles/:userId`}
            element={
              <ProfilePage
                profile={profile}
                callbackToDeleteUser={deleteUser}
              />
            }
          />
          <Route
            path={"/profiles/:userId/edit"}
            element={<ProfileEditPage />}
          />
          <Route path={"/resources"} element={<ResourceListPage />} />
          <Route
            path={"/resources/:resourceId"}
            element={<ResourceDetailsPage />}
          />
          <Route
            path={"/resources/edit/:resourceId"}
            element={<EditResourcePage />}
          />
          <Route path={"/posts"} element={<PostsPage />} />
          <Route path={"/createpost"} element={<CreatePostPage />} />
          <Route path="/products/" element={<ProductListPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
