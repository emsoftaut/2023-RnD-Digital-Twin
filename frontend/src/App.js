import {appAuth} from "./firebaseConfig";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./scenes/global/Sidebar";
import { ColorModeContext, useMode } from "./theme.js";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Dashboard from "./scenes/dashboard";
import Navbar from "./scenes/global/Navbar";
import MachineDetails from "./scenes/machineDetails";
import Login from "./components/Login";
import {useState, useEffect} from "react";
import {getAuth, onAuthStateChanged } from "firebase/auth";
import mockData from "./data/mockData.json";

const App = () => {
  const [theme, colorMode] = useMode();
  const [user,setUser] = useState(null);

  useEffect(() => {
    const authInstance = getAuth(appAuth); // Initialize the authentication service

    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
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
              {mockData.map(data=> <Route path={"machineDetails"+data.path} element={<MachineDetails title={data.title}/>}/>)}
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