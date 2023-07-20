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
      <h1>Factory IO Display</h1>
      <div>
        <label>Status:</label>
        <input type="text" value={status} disabled />
      </div>
      <div>
        <label>Temperature:</label>
        <input type="text" value={temperature} disabled />
      </div>
      <div>
        <label>Belt Speed:</label>
        <input type="text" value={beltSpeed} disabled />
      </div>
      <div>
        <label>Jobs Queued:</label>
        <input
          type="text"
          value={jobsQueued}
          onChange={(e) => setJobsQueued(e.target.value)}
        />
      </div>
      <div>
        <label>Jobs Done:</label>
        <input type="text" value={jobsDone} disabled />
      </div>
      <div>
        <label>Running:</label>
        <input type="text" value={running} disabled />
      </div>
      <button onClick={handleDataUpdate}>Update Jobs Queued</button>
    </div>
  );
};

export default FactoryIoDisplay;
