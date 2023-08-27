import { useState, useEffect } from "react";
import { ref, onValue, off, get, set } from "firebase/database";
import { appDb } from "../firebaseConfig";

export const useMachineData = () => {
  const [machineData, setMachineData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const machineRef = ref(appDb, "factory_io/data");

    const handleDataChange = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dataArray = Object.values(data)
          .filter(validateMachineData)
          .map((machine) => ({
            machID: machine.machineID,
            ...machine,
          }));
        setMachineData(dataArray);
      }
    };

    onValue(machineRef, handleDataChange, (err) => setError(err));

    return () => {
      off(machineRef, handleDataChange);
    };
  }, []);

  return { machineData, error };
};

export const toggleMachine = async (machID) => {
  // Get the reference to the database path where "running" variable is stored
  const databasePath = `factory_io/data/${machID}/coils/running`;
  const databaseRef = ref(appDb, databasePath);

  try {
    // Read the current status from the database
    const snapshot = await get(databaseRef);
    const currentStatus = snapshot.val();

    // Calculate the new status (toggle the status) and update the database
    const newStatus = !currentStatus;
    set(databaseRef, newStatus)
      .then(() => {
        console.log("Machine status updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating machine status:", error);
      });
  } catch (error) {
    console.error("Error reading machine status:", error);
  }
}

function validateMachineData(machine) {
  const requiredKeys = ['machineID', 'coils', 'lastModified', 'sensors'];
  return requiredKeys.every(key => machine.hasOwnProperty(key)
    && machine[key] !== null
    && Object.keys(machine[key]).length !== 0);
}