import { appAuth } from "../firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Box, useTheme } from "@mui/material";
import { getFunctions, httpsCallable } from "firebase/functions";
import AuthContext from "./AuthContext";
import Navbar from "./Navbar";

const Login = ({ user }) => {

  const { setUserManually, setIsAdmin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const functions = getFunctions();

  const handleLogin = (e) => {
    e.preventDefault();

    const authInstance = getAuth(appAuth); // Initialize the authentication service
    
    signInWithEmailAndPassword(authInstance, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        setUserManually(userCredential.user);

        const checkAdmin = httpsCallable(functions, 'checkAdmin');
        checkAdmin().then((result) => {
          console.log('Is Admin Result:', result);
          setIsAdmin(result.data.isAdmin);
          navigate("/"); // Redirect to the desired route upon successful login
        })

      })
      .catch((error) => {
        setError(`Invalid Username or Password.`);
      });

  };

  return (
    <Box sx={{
      padding: 0,
      overflow: "hidden",
      backgroundColor: (theme.palette.mode === "dark" ? theme.palette.divider : "auto"),
    }}>
      <Navbar user={user} showProps={false} />
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100vh",
        padding: "50px 0px",
        width: "100%"
      }}>
        <h2>Digital Twin Login</h2>
        <br />
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "400px"
          }}>
          <TextField
            sx={{ marginBottom: 1, width: '80%' }}
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <TextField
            sx={{ marginBottom: 1, width: '80%' }}
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <Button sx={{ height: 50 }} variant="contained" type="submit" aria-label="Log In">Log In</Button>
          <br />
          <Link onClick={() => navigate("/forgot-password")} to="/forgot-password">Forgot Password?</Link>
        </Box>
        {error && <p sx={{ color: "error.main" }}>{error}</p>}
      </Box>
    </Box>
  );
};

export default Login;