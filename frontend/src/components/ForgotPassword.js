import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { TextField, Button } from "@mui/material";
import styles from "./style.module.css";
import { useNavigate, Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState(null);

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
    <div className={styles.container}>
      {isEmailSent ? (
        <p>An email has been sent to reset your password. Please check your inbox.</p>
      ) : (
        <>
          <h2 className={styles.title}>Reset Password</h2>
          <form className={styles.form} onSubmit={handleResetPassword}>
            <TextField
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
          </form>
          {error && <p>{error}</p>}
          <br />
          <Link to="/login">Return to Login</Link> {/* Add the "Return to Home" link */}
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
