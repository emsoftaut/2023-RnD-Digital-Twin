import { Box, Button, Table, TableBody, TableHead, TableRow, TableCell, LinearProgress, Typography } from "@mui/material";
import mockData from "../data/mockData.json";

function toggleMachine(machID) {
    console.log("machID");
}

const MachineButton = ({machID, status}) => {
    let innerText = status ? "stop" : "start";
    let colorText = status ? "error" : "primary"
    return (
        <Button 
        variant= "contained" 
        color={colorText}
        onClick={toggleMachine(machID)}
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

const AllMachineTable = () => {
    return (
        <Box sx={{ overflowX: "scroll" }}>
            <Table size="small" stickyHeader width="max-content">
                <TableHead>
                    <TableRow>
                        <TableCell>Machine #</TableCell>
                        <TableCell>Job Status</TableCell>
                        <TableCell>Job Start Time</TableCell>
                        <TableCell>Job Progress</TableCell>
                        <TableCell align="right">Box Speed</TableCell>
                        <TableCell align="right">Temperature</TableCell>
                        <TableCell>Start/Stop</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mockData.map(data =>
                        <TableRow>
                            <TableCell>{data.title}</TableCell>
                            <TableCell>{data.info.status ? "Running" : "Not Running"}</TableCell>
                            <TableCell>{"2am"}</TableCell>
                            <TableCell><ProgressBar done={data.info.jobsDone} queued={data.info.jobsQueued} /></TableCell>
                            <TableCell align="right">{data.info.conveyorSpeed}</TableCell>
                            <TableCell align="right">{data.info.temperature}</TableCell>
                            <TableCell><MachineButton machID={data.title} status={data.info.status}/></TableCell>
                        </TableRow>)}
                </TableBody>
            </Table>
        </Box>);

};


export default AllMachineTable;