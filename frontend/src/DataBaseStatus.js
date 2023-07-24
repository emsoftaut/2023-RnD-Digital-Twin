import { useEffect, useState } from "react";
import { appDb, appAuth } from "./firebaseConfig"; // Import appDb from firebaseConfig.js
import { getDatabase, ref, onValue, off } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const DatabaseStatus = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [user, setUser] = useState(null); // To store the authenticated user
  
    useEffect(() => {
      const authInstance = getAuth(appAuth); // Initialize the authentication service
      const database = appDb; // Initialize the Realtime Database
  
      // Check if the user is authenticated
      const unsubscribe = onAuthStateChanged(authInstance, (user) => {
        setUser(user);
      });
  
      // Realtime Database connection check
      const connectedRef = ref(database, ".info/connected");
  
      const handleConnectionChange = (snap) => {
        setIsConnected(snap.val() === true);
      };
  
      onValue(connectedRef, handleConnectionChange);
  
      return () => {
        off(connectedRef, "value", handleConnectionChange);
        unsubscribe();
      };
    }, []);
  
    return (
      <div>
        {user ? ( // Check if the user is authenticated
          <div>
            {isConnected ? (
              <p>Connected to the Realtime Database</p>
            ) : (
              <p>Not connected to the Realtime Database</p>
            )}
          </div>
        ) : (
          <p>Please log in to see the database status.</p>
        )}
      </div>
    );
  };
  
  export default DatabaseStatus;
