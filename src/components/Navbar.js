import "../components/Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../data/daddabase-logo.png"
import { AuthContext } from "../context/auth.context";
import { useContext} from 'react';
import { ThemeContext } from './../context/theme.context';

function Navbar() {

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const value = useContext(ThemeContext);

  return (
    <div className={`Navbar ${value}`}>
      <div className="Navbar-brand">
        <img className={"Navbar-logo"} src={logo} alt="not working" />
        <div>
          <h1 className="Navbar-brandname">DaddaBase</h1>
          <span> we've got your back!</span>
        </div>
      </div>

      {isLoggedIn && (
        <div className="navlinks">
          <NavLink className="NavLink" to="/">
            Home
          </NavLink>
          <NavLink className="NavLink" to={`/profiles/${user._id}`}>
            Profile
          </NavLink>
          <NavLink className="NavLink" to="/resources">
            Resources
          </NavLink>
          <NavLink className="NavLink" to="/posts">
            Posts
          </NavLink>
          <button className="logout-button" onClick={logOutUser}>
            Log Out
          </button>
          <h5>{`Account Owner: ${user && user.name}`}</h5>
        </div>
      )}

      {!isLoggedIn && (
        <div className="navlinks">
          <NavLink className="NavLink" to="/login">
            Log In
          </NavLink>
          <NavLink className="NavLink" to="/signUp">
            Sign Up
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default Navbar;
