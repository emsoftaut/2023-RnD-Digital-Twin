import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, signOut, browserLocalPersistence, setUser } from "firebase/auth";
import { appAuth } from "../firebaseConfig"; // Use 'auth' from firebaseConfig.js
import { useNavigate } from "react-router-dom";
import { getFunctions, httpsCallable } from "firebase/functions";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const authInstance = getAuth(appAuth);
  
    const unsubscribe = onAuthStateChanged(authInstance, async (authUser) => {
      if (authUser) {
        setUser(authUser);
        await checkUserAdminStatus(authUser); 
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });
  
    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  const checkUserAdminStatus = async (user) => {
    if (user) {
        const checkAdmin = httpsCallable(getFunctions(), 'checkAdmin');
        const result = await checkAdmin();
        console.log('Is Admin Result:', result);
        setIsAdmin(result.data.isAdmin);
    } else {
        setIsAdmin(false);
    }
 };

 const handleLogin = async (email, password) => {
  const authInstance = getAuth(appAuth);
  setPersistence(authInstance, browserLocalPersistence);
  try {
      const userCredential = await signInWithEmailAndPassword(authInstance, email, password);
      console.log(userCredential.user);
      setUserManually(userCredential.user);

      await checkUserAdminStatus(userCredential.user);  // Use the function here
      
      navigate("/"); // Redirect to the desired route upon successful login
  } catch (error) {
      setError(`Invalid Username or Password.`);
  }
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
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
