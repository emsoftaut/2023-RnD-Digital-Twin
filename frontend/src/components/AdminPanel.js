import React, { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFunctions, httpsCallable } from 'firebase/functions';
import {TextField, Button} from "@mui/material";
import {Link} from 'react-router-dom';
import styles from "./style.module.css";

const AdminPanel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const auth = getAuth();
  const functions = getFunctions();

  useEffect(() => {
    const checkAdmin = httpsCallable(functions, 'checkAdmin');
    checkAdmin().then((result) => {
      setIsAdmin(result.data.isAdmin);
    });
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();

    if(password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User registered successfully.
        console.log("User registered: ", userCredential.user);
        setRegisterMessage("User registered successfully!");
        setError("");
      })
      .catch((error) => {
        // Error registering user.
        setError("Error registering user: " + error.message);
        setRegisterMessage("");
      });
  };

  if (!isAdmin) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>
          You are not authorized to view this page.
        </p>
      </div>)
  }

  return (
    <div>
      <div className={styles.container}>
      <h1 className={styles.title}>Admin Panel</h1>
      <form className={styles.form} onSubmit={handleRegister}>
        <TextField
          className={styles.input}
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <TextField
          className={styles.input}
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <TextField
          className={styles.input}
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <br />
        <Button className={styles.button} variant="contained" type="submit">Add New User</Button>
        <br />
        <Link to="/">Return to Home</Link> 
      </form>

      {error && <p className={styles.error}>{error}</p>}
      {registerMessage && <p className={styles.success}>{registerMessage}</p>}
      </div>
    </div>
  );
};

export default AdminPanel;