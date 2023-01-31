import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/auth.context";
import axios from "axios";

///////Our Components///////////
///Components/////
import NavbarComponent from "./components/NavbarComponent";
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
import EditResourcePage from "./pages/EditResourcePage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import RandomDadJokePage from "./pages/RandomDadJokePage"
import CartPage from "./pages/CartPage";
import CategoryCardComponent from "./components/CategoryCardComponent";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
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
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/signup"}
          element={
            <IsAnon>
              <SignUpPage />
            </IsAnon>
          } />
        <Route path={"/login"}
          element={
            <IsAnon>
              <LogInPage />
            </IsAnon>
          } />
        <Route
          path={`/profiles/:userId`}
          element={
            <IsPrivate>
              <ProfilePage profile={profile} callbackToDeleteUser={deleteUser} />
            </IsPrivate>
          }
        />
        <Route
          path={"/profiles/:userId/edit"}
          element={
            <IsPrivate>
              <ProfileEditPage />
            </IsPrivate>
          } />
        <Route path={"/resources"} element={<ResourceListPage />} />
        <Route
          path={"/resources/:resourceId"}
          element={
            <IsPrivate>
              <ResourceDetailsPage />
            </IsPrivate>
          }
        />
        <Route
          path={"/resources/edit/:resourceId"}
          element={
            <IsPrivate>
              <EditResourcePage />
            </IsPrivate>}
        />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/categories/:categoryId"
          element={<CategoryCardComponent />}
        />
        <Route path="/random-dad-jokes" element={<RandomDadJokePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
