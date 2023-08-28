import { useState } from "react";
import { Box, Button, Table, TableBody, TableHead, TableRow, TableCell, LinearProgress, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import JobPopup from "../PopUps/JobPopup";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { toggleMachine, useMachineData, setJQMachine } from "../../data/FireBaseData";
import WarningPopUp from "../PopUps/WarningPopUp";

export const PopUpButton = ({ machID, showpop }) => {
	const [showPopup, setshowPopup] = useState(showpop);

	const handlePopupClick = (jQ) => {
		if (jQ > 0) {
			setJQMachine(machID, parseInt(jQ));
		}
		setshowPopup(false);
	};

	const handlePopupClose = (popup) => {
		setshowPopup(popup);
	};

	return (
		<Button variant="contained" onClick={() => setshowPopup(true)}>
			Order
			{showPopup && <JobPopup onClick={handlePopupClick} machineName={machID} onClose={handlePopupClose} />}
		</Button>
	);
};

export const MachineButton = (props) => {
	let { machID, running, method, jQ } = props;
	let innerIcon = method === "toggle" ? running ? <PauseIcon /> : <PlayArrowIcon /> : <StopIcon />;
	let innerText = method === "toggle" ? (running ? "Pause" : "Resume") : "Stop";
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const handleClick = () => {
		method === "toggle" ? toggleMachine(machID) : cancelFunction();
	};

	const cancelFunction = () => {
		if (method !== "toggle" && !isPopupOpen) {
			setIsPopupOpen(true);
		}
	};

	return (
		<Button 
		startIcon={innerIcon} 
		disableElevation 
		variant="contained" 
		color="grey" 
		onClick={handleClick}
		disabled={(jQ > 0) ? false: true}>
			<Typography variant="p">{innerText}</Typography>
			{isPopupOpen && method !== "toggle" && <WarningPopUp machID={machID} onCancel={() => setIsPopupOpen(false)} onClose={() => setIsPopupOpen(false)} />}
		</Button>
	);
};

export const ProgressBar = ({ done, queued }) => {
	let convertValue = (done / queued) * 100;
	return (
		<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
			<Box sx={{ width: "100%", mr: 1 }}>
				<LinearProgress variant="determinate" value={convertValue} />
			</Box>
			<Box sx={{ minWidth: 60 }}>
				<Typography variant="p">
					{done} / {queued}
				</Typography>
			</Box>
		</Box>
	);
};

const AllMachineTable = () => {
	const { machineData } = useMachineData();
	const [showPopup] = useState(false);
	const [error, setError] = useState("");

	if (error) {
		setError(error);
		return <p>Error: {error}</p>; 
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
						<TableCell align="center">Job Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{machineData.map((machine) => (
						<TableRow>
							<TableCell>
								<Link to={"/" + machine.machID}>{machine.machID}</Link>
							</TableCell>
							<TableCell>{machine.sensors.running === true ? "Running" : "Not Running"}</TableCell>
							<TableCell>{machine.lastModified}</TableCell>
							<TableCell>
								<ProgressBar done={machine.sensors.jobsDone} queued={machine.coils.jobsQueued || "0"} />
							</TableCell>
							<TableCell align="right">{machine.sensors.averageSpeed || "0"}</TableCell>
							<TableCell align="right">{machine.sensors.WaterLevel || "0"}</TableCell>
							<TableCell>
								<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
									<PopUpButton machID={machine.machineID} onClick={() => showPopup(false)} />
									<MachineButton machID={machine.machineID} running={machine.sensors.running} method={"toggle"} jQ={machine.coils.jobsQueued || "0"} />
									<MachineButton machID={machine.machineID} running={machine.sensors.running} method={"cancel"} jQ={machine.coils.jobsQueued || "0"} />
								</Box>
							</TableCell>
							<TableCell></TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Box>
	);
};

export default AllMachineTable;
