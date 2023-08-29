import React, { useEffect, useState } from 'react';
import { useTheme, Box, Button, Paper } from "@mui/material";
import Header from "../../components/Header";
import AllMachineTable from "../../components/machineComponents/AllMachineTable";
import { useMachineData, toggleMachine } from "../../data/FireBaseData"

async function cancelAll() {
	console.log('cancellAll'); //replace with function that asks all machine's jQ to 0 in firebaseData
}

const CancelAllButton = () => {
    const { machineData, error } = useMachineData();
    if (error) {
        return <p>Error: {error.message}</p>; // Adjust error display as needed
    }
    const allOff = (machineData.every((machine) => machine.coils.running === false) ? true : false);
    
    const handleClick = () => {
        machineData.filter((m) => m.coils.running === true).map(filteredM => toggleMachine(filteredM.machineID));
        machineData.map(m => m.coils.jobsQueued = 0); //replace w cancelJobs function
        cancelAll();
    }

    return(
        <Button sx={{ height: 50 }} 
        variant="contained" 
        color="error" 
        disableElevation 
        disabled={allOff}
        onClick={handleClick}>
            STOP ALL MACHINES
        </Button>
    )
}

const Homepage = () => {
    const theme = useTheme().palette;
    const [timestamp, setTimeStamp] = useState(new Date().toLocaleString('en-NZ'));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeStamp(new Date().toLocaleString('en-NZ'));
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <Box sx={{
            mb: 1,
            padding: 3,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            overflowY: "scroll",
            backgroundColor: (theme.mode === "dark" ? theme.divider : "auto")
        }} >
            <Box p="20px" height="90%" component={Paper}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Header title="All Machines" subtitle={timestamp} />
                    <CancelAllButton/>
                </Box>
                <AllMachineTable />
            </Box>
        </Box>
    );
};

export default Homepage;
