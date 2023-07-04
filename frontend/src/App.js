import FactoryIoDisplay from "./FactoryIoDisplay";
import Homepage from "./scenes/dashboard/Homepage";
import Navbar from "./scenes/global/Navbar";
import Sidebar from "./scenes/global/Sidebar";
import { ColorModeContext, useMode } from "./theme.js";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
//import MachineDetail from "./scenes/machinedetail";

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
              <Route path="/" element={<Homepage />} />
              {/*<Route path="/machineDetail" element={<MachineDetail/>}/>*/}
            </Routes>
          </div>
        </main>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;