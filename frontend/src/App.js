import {app} from "./firebaseConfig";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme.js";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Navbar from "./scenes/global/Navbar";
import MachineDetails from "./scenes/machineDetails";
import Login from "./components/Login";
import {useState, useEffect} from "react";
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";

const App = () => {
  const [theme, colorMode] = useMode();
  const [user,setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(app); // Initialize the authentication service

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const PrivateRoute = ({ element, path}) => {
    if(!user) {
      return <Navigate to="/login" />;
    } 
    return <Route path={path} element={element} />;
  }

  const handleLogin = (email, password) => {
    const auth = getAuth(app); // Initialize the authentication service

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setUser(auth.currentUser); // Set the authenticated user
      })
      .catch((error) => {
        console.log("Login error:", error.message);
      });
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {user ? (
        <main className="content">
          <Navbar />
          <div className="app">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/machineDetails" element={<MachineDetails/>}/>
            </Routes>
          </div>
        </main>
        ) : (
          <Login />
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};



export default App;