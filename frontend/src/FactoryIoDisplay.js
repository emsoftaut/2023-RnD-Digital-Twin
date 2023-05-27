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


    function turnOnConveyor (conveyorId) {
      const machineRef = ref(database, `factory_io/machines/elevatorAdvanced/coils/Conveyor${conveyorId}/value`);
      set(machineRef, 1);
    }

    function turnOffConveyor (conveyorId) {
      const machineRef = ref(database, `factory_io/machines/elevatorAdvanced/coils/Conveyor${conveyorId}/value`);
      set(machineRef, 0);
    }
 
    return  (
        <div>
        <h1>Machine Data</h1>
        <div id="buttonDiv">
          <button className="testButtonOn" onClick={() => turnOnConveyor('0')}>Conveyor 0: ON</button>
          <button className="testButtonOff" onClick={() => turnOffConveyor('0')}>Conveyor 0: OFF</button>
          <br />
          <button className="testButtonOn" onClick={() => turnOnConveyor('1')}>Conveyor 1: ON</button>
          <button className="testButtonOff" onClick={() => turnOffConveyor('1')}>Conveyor 1: OFF</button>
          <br /> 
          <button className="testButtonOn" onClick={() => turnOnConveyor('2')}>Conveyor 2: ON</button>
          <button className="testButtonOff" onClick={() => turnOffConveyor('2')}>Conveyor 2: OFF</button>
          <br />
          <button className="testButtonOn" onClick={() => turnOnConveyor('3')}>Conveyor 3: ON</button>
          <button className="testButtonOff" onClick={() => turnOffConveyor('3')}>Conveyor 3: OFF</button>
          <br />

        </div>
        {machineData ? (
          <>
            <p>elevatorAdvanced</p>
            <p>{machineData.coils.Conveyor0.name} : {machineData.coils.Conveyor0.value}</p>
            <p>{machineData.coils.Conveyor1.name} : {machineData.coils.Conveyor1.value}</p>
            <p>{machineData.coils.Conveyor2.name} : {machineData.coils.Conveyor2.value}</p>
            <p>{machineData.coils.Conveyor3.name} : {machineData.coils.Conveyor3.value}</p>
          </>
        ) : (
          <p>Factory IO is currently not running...</p>
        )}
      </div>
      );
};

export default FactoryIoDisplay;