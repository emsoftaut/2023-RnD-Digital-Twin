import { appAuth } from "./firebaseConfig";
import { Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme.js";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { getDatabase, ref, onValue } from 'firebase/database';
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Dashboard from "./scenes/dashboard";
import MachineDetails from "./scenes/machineDetails";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./components/AuthContext";
import AdminPanel from "./components/adminComponents/AdminPanel";


const App = () => {
  const [theme, colorMode] = useMode();
  const [user, setUser] = useState(null);
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    const authInstance = getAuth(appAuth); // Initialize the authentication service
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);


  useEffect(() => {
    const db = getDatabase();
    const machinesRef = ref(db, 'factory_io/data');

    onValue(machinesRef, (snapshot) => {
      const data = snapshot.val();
      const machinesArray = Object.keys(data).map((key) => ({
        machineID: key,
        ...data[key],
      }));
      setMachines(machinesArray);
    });
  }, []);


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/" element={<PrivateRoute machines={machines} showProps={true} />}>
              <Route index element={<Dashboard />} />
              {machines.map((machine) => (
                <Route
                  key={machine.machineID}
                  path={machine.machineID}
                  element={<MachineDetails
                    title={machine.machineID}
                    machines={machines} />} />
              ))}
            </Route>
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;