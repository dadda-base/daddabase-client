import LogInPageComponent from "../components/LogInPageComponent"
import axios from 'axios'
const baseURL = process.env.REACT_APP_API_URL;
const logInApiUserRequest = async (email, password) => {
  const { data } = await axios.post(baseURL + "/auth/login", { email, password});
  return data;
}

function LogInPage() {


  return (
    <LogInPageComponent callbackToLogInApiUserRequest={logInApiUserRequest}/>
  )
}

export default LogInPage;

