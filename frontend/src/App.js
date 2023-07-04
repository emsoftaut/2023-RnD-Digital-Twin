import FactoryIoDisplay from "./FactoryIoDisplay";
import Navbar from "./scenes/global/Navbar";
import Sidebar from "./scenes/global/Sidebar";
import { ColorModeContext, useMode } from "./theme.js";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import MachineDetails from "./scenes/machineDetails";

const App = () => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;