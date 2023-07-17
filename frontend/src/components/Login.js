
import {app} from "../firebaseConfig";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import React, {useState}  from "react";
import {useNavigate} from "react-router-dom";
import {TextField, Button} from "@mui/material";
import styles from "./style.module.css";

const Login = () => {
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
  
    const handleLogin = (e) => {
      e.preventDefault();
  
      const auth = getAuth(app); // Initialize the authentication service
  
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/"); // Redirect to the desired route upon successful login
        })
        .catch((error) => {
          setError(error.message);
        });
    };
  
    return (
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
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
  };
  
  export default Login;