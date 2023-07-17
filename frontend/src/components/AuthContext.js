import React, { createContext, useState } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../firebaseConfig";
import { useNavigate } from "react-router-dom"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    const auth = getAuth(app); // Initialize the authentication service

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setUser(auth.currentUser); // Set the authenticated user
        setError(null);
        navigate("/"); // Redirect to the desired route upon successful login
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleLogout = () => {
    const auth = getAuth(app); // Initialize the authentication service

    signOut(auth)
      .then(() => {
        setUser(null); // Clear the user's session
        setError(null);
        navigate('/login'); // Redirect to the login page after logout
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;