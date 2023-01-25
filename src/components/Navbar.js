import "../components/Navbar.css";
import { NavLink } from "react-router-dom";
import logo from "../data/daddabase-logo.png"
import { useContext } from "react";                     // <== IMPORT 
import { AuthContext } from "../context/auth.context";

function Navbar() {

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div className="Navbar">
      <div className="Navbar-brand">
        <img className={"Navbar-logo"} src={logo} alt="not working" />
        <h1>DaddaBase</h1>
      </div>
      {isLoggedIn &&
        <div>
          <NavLink className="NavLink" to="/">Home</NavLink>
          <NavLink className="NavLink" to="/profiles/:userId">Profile</NavLink>
          <NavLink className="NavLink" to="/resources">Resources</NavLink>
          <NavLink className="NavLink" to="/posts">Posts</NavLink>
          <button className="logout-button" onClick={logOutUser}>Log Out</button>
          <span>{user && user.name}</span>
        </div>}
      {!isLoggedIn &&
        <div>
          <NavLink className="NavLink" to="/login">Log In</NavLink>
          <NavLink className="NavLink" to="/signUp">Sign Up</NavLink>
        </div>}
    </div>
  );
}

export default Navbar;
