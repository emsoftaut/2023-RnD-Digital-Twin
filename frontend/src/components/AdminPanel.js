import React, { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const AdminPanel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const auth = getAuth();
  
  const handleRegister = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User registered successfully.
        console.log("User registered: ", userCredential.user);
      })
      .catch((error) => {
        // Error registering user.
        setError("Error registering user: " + error.message);
      });
  };
  
  if (auth.currentUser.uid !== "SWD43SNbitZY6vUJYMFCYAnewJS2") {
    return <p>You are not authorized to view this page.</p>;
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <form onSubmit={handleRegister}>
        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Add User</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AdminPanel;