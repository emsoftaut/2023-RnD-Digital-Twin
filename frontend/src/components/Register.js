import { appAuth } from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { TextField, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import styles from "./style.module.css";

const Register = () => {
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

    const handleRegister = (e) => {
      e.preventDefault();
    
      const authInstance = getAuth(appAuth); // Initialize the authentication service
    
      createUserWithEmailAndPassword(authInstance, email, password)
        .then((userCredential) => {
          console.log(userCredential.user);
    
          // Initialize the database service
          const db = getDatabase();
          
          // Create a reference to the user's document in the database
          const userRef = ref(db, 'users/' + userCredential.user.uid);
          
          // Set the user's initial data
          set(userRef, {
            email: userCredential.user.email,
            approved: false
          });
    
          navigate("/login"); // Redirect to the login page after successful registration
        })
        .catch((error) => {
          setError(`Error creating user: ${error.message}`);
        });
    };

    
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Digital Twin Registration</h2>
        <form className={styles.form} onSubmit={handleRegister}>
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
            Register
          </Button>
          <br />
          <Link to="/login">Already have an account? Log in here</Link>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
  };
  
  export default Register;
