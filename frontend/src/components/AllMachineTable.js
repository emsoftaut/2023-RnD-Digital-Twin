import {useState, useEffect} from 'react';
import { Box, Button, Table, TableBody, TableHead, TableRow, TableCell, LinearProgress, Typography } from "@mui/material";
import {appDb} from "../firebaseConfig";
import {ref, get, set, onValue, off } from "firebase/database";
import { Link } from 'react-router-dom';

async function toggleMachine(machID) {
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

const MachineButton = ({machID, running}) => {
    let innerText = running ? "stop" : "start";
    let colorText = running ? "error" : "primary"

    const handleClick = () => {
        toggleMachine(machID);
    }

    return (
        <Button 
        variant= "contained" 
        color={colorText}
        onClick={handleClick}
        >{innerText}</Button>
    )
}

const ProgressBar = ({ done, queued }) => {
    let convertValue = done / queued * 100;
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress variant="determinate" value={convertValue} />
            </Box>
            <Box sx={{ minWidth: 60 }}>
                <Typography variant="p">{done} / {queued}</Typography>
            </Box>
        </Box>
    );
};


function validateMachineData(machine) {
    const requiredKeys = ['machineID', 'coils', 'lastModified', 'sensors'];
    return requiredKeys.every(key => machine.hasOwnProperty(key) 
      && machine[key] !== null 
      && Object.keys(machine[key]).length !== 0);
}

const AllMachineTable = () => {
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

        onValue(machineRef, handleDataChange);

        return () => {
            off(machineRef, "value", handleDataChange);
        };
    }, []);

    if(error) {
        setError(error);
        return <p>Error: {error}</p>
    }

    return (
        <Box sx={{ overflowX: "scroll" }}>
            <Table size="small" stickyHeader width="max-content">
                <TableHead>
                    <TableRow>
                        <TableCell>Machine #</TableCell>
                        <TableCell>Job Status</TableCell>
                        <TableCell>Last Modified</TableCell>
                        <TableCell>Job Progress</TableCell>
                        <TableCell align="right">Belt Speed</TableCell>
                        <TableCell align="right">Temperature</TableCell>
                        <TableCell>Start/Stop</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {machineData.map((machine) =>
                        <TableRow>
                            <TableCell>
                                <Link to={"/"+machine.machID}>{machine.machID}</Link>
                                </TableCell>
                            <TableCell>{machine.sensors.machineStatus === 1 ? "Running" : "Not Running"}</TableCell>
                            <TableCell>{machine.lastModified}</TableCell>
                            <TableCell><ProgressBar done={machine.sensors.jobsDone} queued={machine.coils.jobsQueued || "0"} /></TableCell>
                            <TableCell align="right">{machine.coils.beltSpeed || "0"}</TableCell>
                            <TableCell align="right">{machine.sensors.temperature || "0"}</TableCell>
                            <TableCell><MachineButton machID={machine.machineID} running={machine.coils.running}/></TableCell>
                        </TableRow>)}
                </TableBody>
            </Table>
        </Box>);

};

export default AllMachineTable;