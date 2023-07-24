import { useEffect, useState } from "react";
import database from "./firebaseConfig";
import { ref, onValue, off } from "firebase/database";

const FactoryIoDisplay = () => {
  const [machineData, setMachineData] = useState(null);

  useEffect(() => {
      const machineRef = ref(database, "factory_io/machines/machine_1");

      const handleDataChange = (snapshot) => {
          setMachineData(snapshot.val());
      };

      onValue(machineRef, handleDataChange);

      return () => {
          off(machineRef, "value", handleDataChange);
      };

  }, []);

    return  (
        <div>
        <h1>Machine Data</h1>
        {machineData ? (
          <>
            <p>Temperature: {machineData.temperature}</p>
            <p>Humidity: {machineData.humidity}</p>
            <p>Timestamp: {machineData.timestamp}</p>
          </>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
      );
};

export default FactoryIoDisplay;