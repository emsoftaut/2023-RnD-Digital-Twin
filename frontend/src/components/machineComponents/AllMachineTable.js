import { useState } from "react";
import { Box, Button, Table, TableBody, TableHead, TableRow, TableCell, tableCellClasses, LinearProgress, Typography, Link, useTheme, styled } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
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
		<Button color="inherit" startIcon={innerIcon} variant="contained" onClick={handleClick} disabled={jQ > 0 ? false : true} sx={{ width: 100 }}>
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: `${theme.palette.mode === "dark" ? theme.palette.common.black : theme.palette.primary.main}`,
		color: theme.palette.primary.contrastText,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

const AllMachineTable = () => {
	const { machineData } = useMachineData();
	const [showPopup] = useState(false);
	const theme = useTheme();
	const [error, setError] = useState("");

	if (error) {
		setError(error);
		return <p>Error: {error}</p>;
	}

	return (
		<Box sx={{ overflowX: "scroll" }}>
			<Table size="small" stickyHeader width="max-content">
				<TableHead sx={{ backgroundColor: theme.mode === "dark" ? "auto" : theme.primary }}>
					<StyledTableRow>
						<StyledTableCell>Machine #</StyledTableCell>
						<StyledTableCell>Job Status</StyledTableCell>
						<StyledTableCell>Last Modified</StyledTableCell>
						<StyledTableCell>Job Progress</StyledTableCell>
						<StyledTableCell align="right">Belt Speed</StyledTableCell>
						<StyledTableCell align="right">Temperature</StyledTableCell>
						<StyledTableCell align="center">Job Actions</StyledTableCell>
					</StyledTableRow>
				</TableHead>
				<TableBody>
					{machineData.map((machine) => (
						<StyledTableRow>
							<StyledTableCell>
								<Link component={RouterLink} to={"/" + machine.machID}>
									{machine.machID}
								</Link>
							</StyledTableCell>
							<StyledTableCell>{machine.coils.override === true ? "Running" : "Not Running"}</StyledTableCell>
							<StyledTableCell>{machine.lastModified}</StyledTableCell>
							<StyledTableCell>
								<ProgressBar done={machine.sensors.jobsDone} queued={machine.coils.jobsQueued || "0"} />
							</StyledTableCell>
							<StyledTableCell align="right">{machine.sensors.averageSpeed || "0"}</StyledTableCell>
							<StyledTableCell align="right">{machine.sensors.waterLevel || "0"}</StyledTableCell>
							<StyledTableCell>
								<Box sx={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
									<PopUpButton machID={machine.machineID} onClick={() => showPopup(false)} />
									<MachineButton machID={machine.machineID} running={machine.coils.override} method={"toggle"} jQ={machine.coils.jobsQueued || "0"} />
									<MachineButton machID={machine.machineID} running={machine.coils.override} method={"cancel"} jQ={machine.coils.jobsQueued || "0"} />
								</Box>
							</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</Box>
	);
};

export default AllMachineTable;
