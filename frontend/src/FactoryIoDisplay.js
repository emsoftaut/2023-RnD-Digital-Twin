import { useState } from "react";
import { appDb } from "./firebaseConfig";
import { ref, set } from "firebase/database";

const FactoryIoDisplay = () => {
  const [status, setStatus] = useState("");
  const [temperature, setTemperature] = useState("");
  const [beltSpeed, setBeltSpeed] = useState("");
  const [jobsQueued, setJobsQueued] = useState("");
  const [jobsDone, setJobsDone] = useState("");
  const [running, setRunning] = useState("");

  const handleDataUpdate = () => {
    const database = ref(appDb, "factory_io/data"); // Reference to the database location where you want to store the data

    const data = {
      status: status,
      temperature: temperature,
      beltSpeed: beltSpeed,
      jobsQueued: jobsQueued,
      jobsDone: jobsDone,
      running: running,
    };

    set(database, data)
      .then(() => {
        console.log("Data updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  return (
    <div>
      <h1>Machine Data</h1>
      <div id="buttonDiv">
        <button className="testButtonOn" style={{backgroundColor: colors.redAccent[400]}} onClick={() => turnOnConveyor('0')}>Conveyor 0: ON</button>
        <button className="testButtonOff" style={{backgroundColor: colors.greenAccent[400]}} onClick={() => turnOffConveyor('0')}>Conveyor 0: OFF</button>
        <br />
        <button className="testButtonOn" style={{backgroundColor: colors.redAccent[400]}} onClick={() => turnOnConveyor('1')}>Conveyor 1: ON</button>
        <button className="testButtonOff" style={{backgroundColor: colors.greenAccent[400]}} onClick={() => turnOffConveyor('1')}>Conveyor 1: OFF</button>
        <br />
        <button className="testButtonOn" style={{backgroundColor: colors.redAccent[400]}} onClick={() => turnOnConveyor('2')}>Conveyor 2: ON</button>
        <button className="testButtonOff" style={{backgroundColor: colors.greenAccent[400]}} onClick={() => turnOffConveyor('2')}>Conveyor 2: OFF</button>
        <br />
        <button className="testButtonOn" style={{backgroundColor: colors.redAccent[400]}} onClick={() => turnOnConveyor('3')}>Conveyor 3: ON</button>
        <button className="testButtonOff" style={{backgroundColor: colors.greenAccent[400]}} onClick={() => turnOffConveyor('3')}>Conveyor 3: OFF</button>
        <br />

      </div>
      <button onClick={handleDataUpdate}>Update Jobs Queued</button>
    </div>
  );
};

export default FactoryIoDisplay;
