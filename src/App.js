import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/auth.context";
import axios from "axios";

///////Our Components///////////
///Components/////
import CategoryCardComponent from "./components/CategoryCardComponent";
import NavbarComponent from "./components/NavbarComponent";
/////pages///////
import EditResourcePage from "./pages/EditResourcePage";
import ErrorPage from "./pages/ErrorPage";
import Footer from "./components/FooterComponent";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import PostsPage from "./pages/PostsPage";
import ProductListPage from "./pages/ProductListPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileEditPage from "./pages/ProfileEditPage";
import RandomDadJokePage from "./pages/RandomDadJokePage";
import ResourceDetailsPage from "./pages/ResourceDetailsPage";
import ResourceListPage from "./pages/ResourceListPage";
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
      {/*Auth Routes */}
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/signup"} element={<SignUpPage />} />
        <Route path={"/login"} element={<LogInPage />} />
        {/* profile routes */}
        <Route path={`/profiles/:userId`} element={<ProfilePage profile={profile} callbackToDeleteUser={deleteUser} />}/>
        <Route path={"/profiles/:userId/edit"} element={<ProfileEditPage />} />
        {/* resource routes */}
        <Route path={"/resources"} element={<ResourceListPage />} />
        <Route path={"/resources/:resourceId"} element={<ResourceDetailsPage />}/>
        <Route path={"/resources/edit/:resourceId"} element={<EditResourcePage />} />
        


        <Route path="/posts" element={<PostsPage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/categories/:categoryId" element={<CategoryCardComponent />}/>
        <Route path="/random-dad-jokes" element={<RandomDadJokePage />} />

        {/* all undefined routes */}
        <Route path="*" element={<ErrorPage />} />

        
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
