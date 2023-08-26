import React from "react";
import { setJQMachine } from "../machineComponents/AllMachineTable";
import { Button, Box, useTheme } from "@mui/material";

const WarningPopUp = ({ machID, onCancel, onClose }) => {
	const theme = useTheme();

	const machineName = machID;

	const handleCancel = () => {
		setJQMachine(machineName, parseInt(0));
		console.log("Cancelling jobs");
		onCancel();
	};

	const handleClose = () => {
		console.log("Closing popup");
		onClose();
	};

	return (
		<Box
			sx={{
				position: "fixed",
				top: "0",
				left: "0",
				width: "100%",
				height: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				zIndex: "1000000",
				cursor: "default",
				backgroundColor: "rgba(0, 0, 0, 0.5)",
			}}
		>
			<Box
				sx={{
					//background: "white",
					padding: "20px",
					borderradius: "5px",
					boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
					textAlign: "center",
					color: "red",
					background: theme.palette.background.default,
				}}
			>
				<h1 sx={{ margin: 0 }}>Machine: {machineName} Warning!</h1>
				<p>This action cannot be undone. Are you sure you want to proceed?</p>
				<h3>{machID}</h3>
				<Box
					sx={{
						margin: "0 10px",
						padding: "10px 20px",
						border: "none",
						borderRadius: "5px",
						alignItems: "space-evenly",
					}}
				>
					<Button sx={{ cursor: "pointer" }} onClick={handleCancel}>
						Cancel
					</Button>
					<Button sx={{ cursor: "pointer" }} onClick={handleClose}>
						Close
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default WarningPopUp;
