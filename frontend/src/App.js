import ShowIPAddresses from "./ShowIPAddresses";
import DummyDataDisplay from "./DummyDataDisplay";
import FactoryIoDisplay from "./FactoryIoDisplay";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="App">
      <Navbar/>
      <ShowIPAddresses/>
      <p><DummyDataDisplay/></p>
      <p><FactoryIoDisplay/></p>
    </div>
  );
};

export default App;