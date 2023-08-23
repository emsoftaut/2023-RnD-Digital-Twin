
import {appAuth, appDb} from "../firebaseConfig";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import React, {useContext, useState}  from "react";
import {useNavigate, Link as RouterLink} from "react-router-dom";
import {TextField, Button, Box, Link, useTheme } from "@mui/material";
import AuthContext from "./AuthContext";
import Navbar from "./Navbar";

const Login = () => {
    const {setUserManually} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const theme = useTheme();
  
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
      <Box sx={{
        padding: 0, 
        overflow: "hidden", 
        backgroundColor: (theme.palette.mode === "dark" ? theme.palette.divider : "auto"),
      }}>
        <Navbar />
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
          <br/>
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
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br/>
            <TextField
              sx={{ marginBottom: 1, width: '80%' }}
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <Button sx={{ height: 50 }} variant="contained" type="submit">Log In</Button>
            <br />
            <Link component={RouterLink} onClick={() => navigate("/forgot-password")} to="/forgot-password">Forgot Password?</Link>
          </Box>
          {error && <p sx={{ color: "error.main" }}>{error}</p>}
        </Box>
      </Box>
    );
  };
  
  export default Login;