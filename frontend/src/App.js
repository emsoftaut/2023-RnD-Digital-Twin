import {app} from "./firebaseConfig";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme.js";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Navbar from "./scenes/global/Navbar";
import MachineDetails from "./scenes/machineDetails";
import Login from "./components/Login";
import {useState, useEffect} from "react";
import {getAuth, onAuthStateChanged } from "firebase/auth";

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