import React, { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFunctions, httpsCallable } from 'firebase/functions';
import { TextField, Button, useTheme, Box } from "@mui/material";
import {Link} from 'react-router-dom';
import styles from "./style.module.css";
import Navbar from './Navbar';

const AdminPanel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const theme = useTheme().palette;

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
    <Box sx={{
      padding: 0, 
      overflow: "hidden", 
      backgroundColor:(theme.mode === "dark" ? theme.divider : "auto")
      }}
      >
      < Navbar/>
      <Box sx={{ 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100vh",
        padding: "50px 0px",
        width: "100%"
         }}>
      <h1>Admin Panel</h1>
      <h2>Add a new user below</h2>
      <Box
        component="form"
        onSubmit={handleRegister}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "400px"
        }}>
        <TextField
          sx={{ marginBottom: 1, width: '80%'}}
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <TextField
          sx={{ marginBottom: 1, width: '80%'}}
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <TextField
          sx={{ marginBottom: 1, width: '80%'}}
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <br />
        <Button sx={{ height: 50 }} variant="contained" type="submit">Add New User</Button>
        <br />
        <br />
        <Link to="/">Return to Home</Link> 
      </Box>

      {error && <p sx={{ color: "error.main" }}>{error}</p>}
      {registerMessage && <p sx={{ color: "success.main" }}>{registerMessage}</p>}
      </Box>
    </Box>
  );
};

export default AdminPanel;