import React, { useEffect, useState } from "react";
import { Box, Button, Paper } from "@mui/material";
import Header from "../../components/Header";
import AllMachineTable from "../../components/machineComponents/AllMachineTable";
import { useMachineData, toggleMachine, setJQMachine, setEstopMachine } from "../../data/FireBaseData";
import WarningPopUp from "../../components/PopUps/WarningPopUp";

export const CancelAllButton = () => {
	const [showWarning, setShowWarning] = useState(false);

	const { machineData, error } = useMachineData();
	if (error) {
		return <p>Error: {error.message}</p>; // Adjust error display as needed
	}
	const allOff = machineData.every((machine) => machine.coils.estop === true) ? true : false;

	const handleShowWarning = () => {
		setShowWarning(true);
	};

	const handleHideWarning = () => {
		setShowWarning(false);
	};

	const handleStopAllMachines = () => {
		const res = machineData.map((m) => {
			setJQMachine(m.machineID, 0);
			toggleMachine(m.machineID, false);
			setEstopMachine(m.machineID, true);
		});
		handleHideWarning();
	};

	return (
		<>
			<Button sx={{ height: 50 }} variant="contained" color="error" disabled={allOff} onClick={handleShowWarning}>
				STOP ALL MACHINES
			</Button>
			{showWarning && <WarningPopUp onCancel={handleHideWarning} onClose={handleHideWarning} onConfirm={handleStopAllMachines} />}
		</>
	);
};

const Homepage = ({ machines }) => {
	const [timestamp, setTimeStamp] = useState(new Date().toLocaleString("en-NZ"));
	useEffect(() => {
		const interval = setInterval(() => {
			setTimeStamp(new Date().toLocaleString("en-NZ"));
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<Box
			sx={{
				mb: 1,
				padding: 3,
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				overflow: "hidden",
				overflowY: "scroll",
			}}
		>
			<Box p="20px" height="90%" component={Paper} sx={{ backgroundImage: "none" }}>
				<Box display="flex" justifyContent="space-between" alignItems="center">
					<Header title="All Machines" subtitle={timestamp} />
					<CancelAllButton />
				</Box>
				<AllMachineTable machines={machines} />
			</Box>
		</Box>
	);
};

export default Homepage;
