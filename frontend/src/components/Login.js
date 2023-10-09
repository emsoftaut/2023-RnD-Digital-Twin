import React, { useContext, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { TextField, Button, Box, Link, useTheme } from "@mui/material";
import AuthContext from "./AuthContext";
import Navbar from "./Navbar";

const errorStyles = {
  color: '#ffffff',
  fontSize: '14px',
  marginTop: '10px',
  textAlign: 'center',
  backgroundColor: '#ff0026',
  border: '1px solid #ffffff',
  padding: '8px',
  borderRadius: '5px',
  width: '300px',
};

const Login = ({ user }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isAdmin = false } = useContext(AuthContext) || {};
  const {handleLogin: handleLoginFromContext} = useContext(AuthContext);
  
  const localHandleLogin = async (e) => {
    e.preventDefault();
    const errorMessage = await handleLoginFromContext(email, password);
    if (errorMessage) {
        setError(errorMessage); // Set error locally in the Login component
    }
  };
  

  return (
    <Box sx={{
      padding: 0,
      overflow: "hidden",
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
          onSubmit={localHandleLogin}
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
          <Link component={RouterLink} onClick={() => navigate("/forgot-password")} to="/forgot-password">Forgot Password?</Link>
        </Box>
        {error && <p sx={errorStyles}>{error}</p>}
      </Box>
    </Box>
  );
};

export default Login;