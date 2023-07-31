
import {appAuth, appDb} from "../firebaseConfig";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import React, {useContext, useState}  from "react";
import {useNavigate, Link} from "react-router-dom";
import {TextField, Button} from "@mui/material";
import styles from "./style.module.css";
import AuthContext from "./AuthContext";
import ForgotPassword from "./ForgotPassword";

const Login = () => {
    const {setUserManually} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };

    const handleForgotPasswordClick = () => {
      navigate("/forgot-password");
    };
  
    const handleLogin = (e) => {
      e.preventDefault();
  
      const authInstance = getAuth(appAuth); // Initialize the authentication service
      //const dbInstance = getAuth(appDb);
  
      signInWithEmailAndPassword(authInstance, email, password)
        .then((userCredential) => {
          console.log(userCredential.user);
          setUserManually(userCredential.user);
          navigate("/"); // Redirect to the desired route upon successful login
        })
        .catch((error) => {
          setError(`Invalid Username or Password.`);
        });
        
    };
  
    return (
      <div>
        <div className={styles.container}>
        <h2 className={styles.title}>Digital Twin Login</h2>
        <form className={styles.form} onSubmit={handleLogin}>
          <TextField
            className={styles.input}
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <br />
          <TextField
            className={styles.input}
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <br />
          <Button className={styles.button} variant="contained" type="submit">
            Log In
          </Button>
          <br />
          <Link onClick={handleForgotPasswordClick} to="/forgot-password">Forgot Password?</Link>
        </form>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
  };
  
  export default Login;