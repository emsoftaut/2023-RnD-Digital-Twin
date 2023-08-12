import { Box, Button, Table, TableBody, TableHead, TableRow, TableCell, LinearProgress, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import { useMachineData, toggleMachine } from '../../data/FireBaseData';



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
                <Typography variant="body1">{done} / {queued}</Typography>
            </Box>
        </Box>
    );
};

const AllMachineTable = () => {

    const { machineData, error } = useMachineData();

  if (error) {
    return <p>Error: {error.message}</p>; // Adjust error display as needed
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
                        <TableRow key={machine.machID}>
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