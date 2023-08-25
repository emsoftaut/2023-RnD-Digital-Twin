import React, { createContext, useState } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { appAuth } from "../firebaseConfig"; // Use 'auth' from firebaseConfig.js
import { useNavigate } from "react-router-dom"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (email, password) => {
    const authInstance = getAuth(appAuth); // Initialize the authentication service

    signInWithEmailAndPassword(authInstance, email, password)
      .then(() => {
        setUser(authInstance.currentUser); // Set the authenticated user
        setError(null);
        navigate("/"); // Redirect to the desired route upon successful login
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const setUserManually = (user) => {
    setUser(user);
  }

  const handleLogout = () => {
    const authInstance = getAuth(appAuth); // Initialize the authentication service

    signOut(authInstance)
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
        setUserManually,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
