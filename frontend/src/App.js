import FactoryIoDisplay from "./FactoryIoDisplay";
import Homepage from "./Homepage";
import Navbar from "./components/Navbar";
import { ColorModeContext, useMode } from "./theme.js";
import { CssBaseline, ThemeProvider } from "@mui/material";

const App = () => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Navbar />
          <p><Homepage/></p>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;