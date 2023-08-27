import React, { useEffect, useState, useContext, useRef } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useTheme, Box } from "@mui/material";
import { Link } from 'react-router-dom';
import { createUser, getUsers } from '../../data/FireBaseData';
import styles from "../style.module.css";
import Navbar from '../Navbar';
import NewUserForm from './NewUserForm';
import AuthUserList from './AuthUserList';
import AuthContext from '../AuthContext';

const AdminPanel = ({ user }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const { isAdmin = false } = useContext(AuthContext) || {};
  const theme = useTheme();

  const auth = getAuth();
  const functions = getFunctions();
  const toggleUserStatus = httpsCallable(functions, 'toggleUserStatus');
  const createUserClient = httpsCallable(functions, 'createUser');


  const unsubscribeRef = useRef(null);

  const toggleUserStatusClient = async (user) => {
    try {
      console.log("Calling toggle user.");
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

  const fetchAndMergeUsers = async () => {
    try {
      const getAuths = httpsCallable(functions, 'getAllUsers');
      const authResult = await getAuths();
      const authUsersMap = {};

      authResult.data.users.forEach((user) => {
        authUsersMap[user.email] = user;
      });

      unsubscribeRef.current = getUsers((usersArray) => { // Use ref to store unsubscribe function
        const mergedUsers = usersArray.map((user) => ({
          ...user,
          ...authUsersMap[user.email],
        }));

        setUsers(mergedUsers);
      });
    } catch (error) {
      console.error("Error fetching and merging users:", error);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchAndMergeUsers();
    }

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();  // Cleanup using ref value
      }
    };
  }, [isAdmin]);

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    createUserClient({ email, password })
      .then((result) => {
        if (result.data.success) {
          createUser(email, name); //RTDB Call to create user as a Node
          console.log("User registered successfully");
          setRegisterMessage("User registered successfully!");
          setError("");
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
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
    <Box sx={{
      padding: 0,
      overflow: "hidden",
      backgroundColor: (theme.palette.mode === "dark" ? theme.palette.divider : "auto"),
      height: '100%'
    }}
    >
      < Navbar user={user} showProps={true} />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', height: '100%' }}>
        <h1 style={{ textAlign: 'center' }}>Admin Panel</h1>
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '90%', justifyContent: 'space-between' }}>
          <Box sx={{ flex: '1', marginRight: '20px', alignItems: 'center' }}>
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
            {error && <p sx={{ color: 'error.main' }}>{error}</p>}
            {registerMessage && <p sx={{ textAlign: 'center', color: 'success.main' }}>{registerMessage}</p>}
          </Box>
          <Box sx={{ flex: '1', marginLeft: '20px' }}> {/* Users List Box */}
            <AuthUserList users={users} toggleUserStatus={toggleUserStatusClient} />
          </Box>
        </Box>
        <br />
        <br />
        <Link to="/">Return to Home</Link>
      </Box>
    </Box>
  );
};

export default AdminPanel;