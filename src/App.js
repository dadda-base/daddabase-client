import "./App.css";
import { Routes, Route /*useNavigate*/ } from "react-router-dom";

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
import ResourcesPage from "./pages/ResourcesPage";
import PostsPage from "./pages/PostsPage";
import Footer from "./components/Footer";
import ProfileEditPage from "./pages/ProfileEditPage"
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
        <Route path={`/profiles/:userId`} element={<ProfilePage />} />
        <Route path={"/profiles/:userId/edit"} element={<ProfileEditPage />} />
        <Route path={"/resources"} element={<ResourcesPage />} />
        <Route path={"/posts"} element={<PostsPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
