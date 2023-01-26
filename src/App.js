import "./App.css";
import image from "./data/daddabase-hompage.png"
import { Routes, Route /*useNavigate*/ } from "react-router-dom";
//import { axios, useState, useEffect } from 'react';

///////Our Components///////////
///Components/////
import Navbar from "./components/Navbar";
/////pages///////
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import LogOutPage from "./pages/LogOutPage";
import ErrorPage from "./pages/ErrorPage";
import ProfilePage from "./pages/ProfilePage";
import ResourceListPage from "./pages/ResourceListPage";
import PostsPage from "./pages/PostsPage";
import Footer from "./components/Footer";
import ResourceDetailsPage from "./pages/ResourceDetailsPage";
/////////////////////////////////

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/signup"} element={<SignUpPage />} />
        <Route path={"/logIn"} element={<LogInPage />} />
        <Route path={"/logout"} element={<LogOutPage />} />
        <Route path={"/profiles/:userId"} element={<ProfilePage />} />
        <Route path={"/resources"} element={<ResourceListPage />} />
        <Route path={"/resources/:resourceId"} element={<ResourceDetailsPage />} />
        <Route path={"/posts"} element={<PostsPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
