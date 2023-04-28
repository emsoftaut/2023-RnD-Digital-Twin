import { useEffect, useState } from "react";
import database from "./firebaseConfig";
import { set, ref, onValue, off } from "firebase/database";
const FactoryIoDisplay = () => {
    const [machineData, setMachineData] = useState(null);

    useEffect(() => {
        const machineRef = ref(database, "factory_io/machines/elevatorAdvanced");

        const handleDataChange = (snapshot) => {
            setMachineData(snapshot.val());
        };

        onValue(machineRef, handleDataChange);

        return () => {
            off(machineRef, "value", handleDataChange);
        };

    }, []);


    function testClick () {
      const machineRef = ref(database, "factory_io/machines/elevatorAdvanced/coils/Conveyor0/value");
      set(machineRef, 1);
    }

    return  (
        <div>
        <h1>Machine Data</h1>
        <button className="button" onClick={testClick}></button>
        {machineData ? (
          <>
            <p>elevatorAdvanced</p>
            <p>{machineData.coils.Conveyor0.name} : {machineData.coils.Conveyor0.value}</p>
            <p>{machineData.coils.Conveyor1.name} : {machineData.coils.Conveyor1.value}</p>
            <p>{machineData.coils.Conveyor2.name} : {machineData.coils.Conveyor2.value}</p>
            <p>{machineData.coils.Conveyor3.name} : {machineData.coils.Conveyor3.value}</p>
          </>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
      );
};

export default FactoryIoDisplay;