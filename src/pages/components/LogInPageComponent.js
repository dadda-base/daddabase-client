import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import axios from "axios"

function LogInPageComponent(props) {
  const baseURL = process.env.REACT_APP_API_URL;
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const { storeToken, storeUser, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);


  const handleLoginSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(email, password)
    const requestBody = { email, password };
 
    axios.post(`${baseURL}/auth/login`, requestBody)
      .then((response) => {
      // Request to the server's endpoint `/auth/login` returns a response
      // with the JWT string ->  response.data.authToken
        console.log('JWT token', response.data.authToken );
      
        storeToken(response.data.authToken);
        storeUser(response.data.user)
        authenticateUser();
        navigate('/');                               
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  }
  
  return (
   <h1>Lohin</h1>
    
  );
}

export default LogInPageComponent;

