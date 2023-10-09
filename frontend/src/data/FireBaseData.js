import { useState, useEffect } from "react";
import { ref, onValue, off, get, set, remove } from "firebase/database";
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

export const setEstopMachine = async (machID, boolean) => {
  const databasePath = `factory_io/data/${machID}/coils/estop`;
  const databaseRef = ref(appDb, databasePath);

  try {
    const snapshot = await get(databaseRef);
    set(databaseRef, boolean);
    console.log("set estop called");
  } catch (error) {
    console.error("Error within estop" + error);
  }
};

export const setJQMachine = async (machID, JQ) => {
  // Get the reference to the database path where "jobsQueued" variable is stored
  const databasePath = `factory_io/data/${machID}/coils/jobsQueued`;
  const databaseRef = ref(appDb, databasePath);

  try {
    // Read the current status from the database
    const snapshot = await get(databaseRef);
    const currentStatus = snapshot.val();

    // Calculate the new status (toggle the status) and update the database
    if (JQ !== currentStatus) {
      set(databaseRef, JQ)
        .then(() => {
          console.log("Machine status updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating machine status:", error);
        });
    } else {
      // if we are trying to order the same amount of jobs as is currently set, set jobs to 0 then try again
      set(databaseRef, 0)
        .then(() => {
          console.log("looping jobs queued");
          setJQMachine(machID, JQ);
        })
        .catch((error) => {
          console.error("Error updating machine status:", error);
        });
    }
  } catch (error) {
    console.error("Error reading machine status:", error);
  }
};

export const deleteUser = async (email) => {
  // Define the database path where the user's data is stored
  const sanitizedEmail = email.replace(".", ","); // Replace dot with comma to use as key
  const databasePath = `users/${sanitizedEmail}`;
  const databaseRef = ref(appDb, databasePath);
  console.log("FireBaseData deleteuser");
  try {
    // Remove the user's data from the database
    await remove(databaseRef);
    console.log("User deleted successfully!");
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error; // Re-throw the error to be handled in the calling function
  }
};

export const createUser = async (email, name) => {
  // Define the database path where the user's data will be stored
  const sanitizedEmail = email.replace(".", ","); // Replace dot with comma to use as key
  const databasePath = `users/${sanitizedEmail}`;
  const databaseRef = ref(appDb, databasePath);

  try {
    // Write the user's name to the database
    await set(databaseRef, { name: name });
    console.log("User created successfully!");
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Re-throw the error to be handled in the calling function
  }
};

export const getSingleUser = async (email) => {
  const sanitizedEmail = email.replace(".", ",");
  const userRef = ref(appDb, `users/${sanitizedEmail}`);

  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    return snapshot.val().name;
  } else {
    return null;
  }
};

export const getUsers = (callback) => {
  const usersRef = ref(appDb, "users");
  //console.log("Users Reference:", usersRef);
  const handleDataChange = (snapshot) => {
    const data = snapshot.val();
    //console.log("Raw data:", data);
    if (data) {
      const usersArray = Object.keys(data).map((key) => ({
        email: key.replace(",", "."), // Replacing commas with dots
        name: data[key].name,
      }));
      //console.log(usersArray);
      callback(usersArray);
    }
  };

  onValue(usersRef, handleDataChange);

  return () => {
    off(usersRef, handleDataChange);
  };
};

/*
 *
 * Function to flip the value of 'running' within the current machine
 *
 */
export const toggleMachine = async (machID, boolean) => {
  // Get the reference to the database path where "running" variable is stored
  const databasePath = `factory_io/data/${machID}/coils/override`;
  const databaseRef = ref(appDb, databasePath);

  try {
    // Read the current status from the database
    //const snapshot = await get(databaseRef);
    //const currentStatus = snapshot.val();

    // Calculate the new status (toggle the status) and update the database
    //const newStatus = !currentStatus;
    set(databaseRef, boolean)
      .then(() => {
        console.log("Machine status updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating machine status:", error);
      });
  } catch (error) {
    console.error("Error reading machine status:", error);
    throw error;
  }
};

function validateMachineData(machine) {
  const requiredKeys = ["machineID", "coils", "sensors"];
  return requiredKeys.every(
    (key) =>
      machine.hasOwnProperty(key) &&
      machine[key] !== null &&
      Object.keys(machine[key]).length !== 0
  );
}
