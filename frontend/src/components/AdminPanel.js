import React, { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFunctions, httpsCallable } from 'firebase/functions';

const AdminPanel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const auth = getAuth();
  const functions = getFunctions();

  useEffect(() => {
    const checkAdmin = httpsCallable(functions, 'checkAdmin');
    checkAdmin().then((result) => {
      setIsAdmin(result.data.isAdmin);
    });
  }, []);

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

  if (!isAdmin) {
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