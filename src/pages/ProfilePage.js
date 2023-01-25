import "../pages/ProfilePage.css";
import { useContext } from "react";                     // <== IMPORT 
import { AuthContext } from "../context/auth.context";

function ProfilePage() {

  const { isLoggedIn, user} = useContext(AuthContext);

  return (
    <div className="ProfilePage">
     {isLoggedIn && 
     <>
       <h1>{user.name}</h1>
       <h1>{user.email}</h1>
       </>
     }
    </div>
  );
}

export default ProfilePage;
