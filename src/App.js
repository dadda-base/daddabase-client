import "./App.css";
import { Routes, Route } from "react-router-dom";

///////Our Components///////////
///Components/////
import Navbar from "./components/Navbar";
/////pages///////
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import ErrorPage from "./pages/ErrorPage";
import ProfilePage from "./pages/ProfilePage";
import ResourceListPage from "./pages/ResourceListPage";
import PostsPage from "./pages/PostsPage";
import Footer from "./components/Footer";
import ResourceDetailsPage from "./pages/ResourceDetailsPage";
import ProfileEditPage from "./pages/ProfileEditPage"
import CreatePostPage from "./pages/CreatePostPage";
import EditResourcePage from "./pages/EditResourcePage";
/////////////////////////////////

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/signup"} element={<SignUpPage />} />
        <Route path={"/logIn"} element={<LogInPage />} />

        <Route path={`/profiles/:userId`} element={<ProfilePage />} />
        <Route path={"/profiles/:userId/edit"} element={<ProfileEditPage />} />
        <Route path={"/resources"} element={<ResourceListPage />} />
        <Route path={"/resources/:resourceId"} element={<ResourceDetailsPage />} />
        <Route path={"/resources/edit/:resourceId"} element={<EditResourcePage />} />
        <Route path={"/posts"} element={<PostsPage />} />
        <Route path={"/createpost"} element={<CreatePostPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
