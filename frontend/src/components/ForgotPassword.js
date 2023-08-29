import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { TextField, Button, Box, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState(null);
  const theme = useTheme();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    const authInstance = getAuth();
    sendPasswordResetEmail(authInstance, email)
      .then(() => {
        setIsEmailSent(true);
      })
      .catch((error) => {
        setError("Error sending password reset email. Please try again.");
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
        {isEmailSent ? (
          <p>An email has been sent to reset your password. Please check your inbox.</p>
        ) : (
          <>
            <h2>Reset Password</h2>
            <Box
              component="form"
              onSubmit={handleResetPassword}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "100%",
                maxWidth: "400px"
              }}
            >
              <TextField
                sx={{ marginBottom: 1, width: '80%'  }}
                label="Email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <br />
              <Button variant="contained" type="submit">
                Reset Password
              </Button>
            </Box>
            {error && <p>{error}</p>}
            <br />
            <Link to="/login">Return to Login</Link> {/* Add the "Return to Home" link */}
          </>
        )}
      </Box>
    </Box>
  );
};

export default ForgotPassword;
