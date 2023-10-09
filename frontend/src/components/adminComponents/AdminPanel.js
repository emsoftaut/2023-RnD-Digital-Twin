import React, { useEffect, useState, useContext, useRef } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useTheme, Box, Link, Paper } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import styles from "../style.module.css";
import Navbar from '../Navbar';
import Header from '../Header';
import NewUserForm from './NewUserForm';
import AuthUserList from './AuthUserList';
import AuthContext from '../AuthContext';

const AdminPanel = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const { isAdmin = false } = useContext(AuthContext) || {};
  const theme = useTheme();

  const functions = getFunctions();
  const toggleUserStatus = httpsCallable(functions, 'toggleUserStatus');
  const createUserClient = httpsCallable(functions, 'createUser');
  const deleteUserClient = httpsCallable(functions, 'deleteUser');

  const unsubscribeRef = useRef(null);

  const toggleUserStatusClient = async (user) => {
    try {
      console.log("Calling toggle user.");
      console.log("User UID", user);
      const result = await toggleUserStatus({ uid: user.uid, status: !user.disabled });
      if (result.data.success) {
        // Find the index of the user and update their status
        const updatedUsers = users.map(u => {
          if (u.uid === user.uid) {
            return { ...u, disabled: !u.disabled };
          }
          return u;
        });
        setUsers(updatedUsers); // Update the users state with the new data
      }
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  }

  const fetchAndSetUsers = async () => {
    try {
      const getAuths = httpsCallable(functions, 'getAllUsers');
      const authResult = await getAuths();
      if (authResult.data.users) {
        //console.log(authResult.data.users);
        setUsers(authResult.data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchAndSetUsers();
    }

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();  // Cleanup using ref value
      }
    };
  }, [isAdmin]);


  const handleDeleteUser = async (user) => {
    console.log("handleDeleteUser", user.email);
    try {
      const result = await deleteUserClient({ uid: user.uid, email: user.email });
      if (result.data.success) {
        const updatedUsers = users.filter(u => u.uid !== user.uid);
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    createUserClient({ email, password, name })
      .then((result) => {
        if (result.data.success) {
          //createUser(email, name); //RTDB Call to create user as a Node
          console.log("User registered successfully");
          setRegisterMessage("User registered successfully!");
          setError("");
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          fetchAndSetUsers();
        } else {
          setError("Error registering user: " + result.data.error);
          setRegisterMessage("");
        }
      })
      .catch((error) => {
        // Error registering user.
        setError("Error registering user: " + error.message); // use 'error' instead of 'result'
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
    <>
      < Navbar user={user} showProps={true} />
      <Box sx={{
        mb: 1,
        padding: 3,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "scroll",
      }}
      >
        <Box p="20px" height="90%" component={Paper} sx={{ backgroundImage: "none", display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="Admin Panel" />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Box>
              <NewUserForm
                name={name}
                password={password}
                email={email}
                handleRegister={handleRegister}
                confirmPassword={confirmPassword}
                error={error}
                setConfirmPassword={setConfirmPassword}
                setEmail={setEmail}
                setName={setName}
                setPassword={setPassword}
              />
              {error && <p className={styles.error} data-testid="password-error" sx={{ color: 'error.main' }}>{error}</p>}
              {registerMessage && <p sx={{ textAlign: 'center', color: 'success.main' }}>{registerMessage}</p>}
            </Box>
            <Box> {/* Users List Box */}
              <AuthUserList
                users={users}
                toggleUserStatus={toggleUserStatusClient}
                deleteUser={handleDeleteUser}
              />
            </Box>
            
          </Box>
          
          <Link component={RouterLink} to="/">Return to Home</Link>
        </Box>
      </Box>
    </>
  );
};

export default AdminPanel;