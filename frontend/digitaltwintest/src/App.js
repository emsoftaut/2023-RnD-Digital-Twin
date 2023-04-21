import React, { useState, useEffect } from "react";

import ShowIPAddresses from "./ShowIPAddresses";
import DummyDataDisplay from "./DummyDataDisplay";
import FactoryIoDisplay from "./FactoryIoDisplay";

const App = () => {
  return (
    <div className="App">
      <ShowIPAddresses/>
      <p><DummyDataDisplay/></p>
      <p><FactoryIoDisplay/></p>
    </div>
  );
};

export default App;