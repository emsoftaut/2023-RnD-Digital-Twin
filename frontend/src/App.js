import FactoryIoDisplay from "./FactoryIoDisplay";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="App">
      <Navbar/>
      <p><FactoryIoDisplay/></p>
    </div>
  );
};

export default App;