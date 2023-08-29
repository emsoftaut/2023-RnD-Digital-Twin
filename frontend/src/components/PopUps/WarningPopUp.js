import React from "react";
import { setJQMachine } from "../../data/FireBaseData";
import styles from "../style.module.css";
import { Button, Box, useTheme } from "@mui/material";

const WarningPopUp = ({ machID, onCancel, onClose }) => {
	const theme = useTheme();

	const handleCancel = () => {
		setJQMachine(machID, 0);
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
					padding: "20px",
					borderRadius: "15px",
					boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
					textAlign: "center",
					color: "red",
					background: theme.palette.background.default,
				}}
			>
				<h1 sx={{ margin: 0 }}>Warning!</h1>
				<p>This action cannot be undone. Are you sure you want to proceed?</p>
				<Box
					sx={{
						margin: "0 10px",
						padding: "10px 5px",
						borderRadius: "5px",
					}}
				>
					<Button sx={styles.Button} variant="contained" onClick={handleCancel}>
						Yes
					</Button>{" "}
					<Button sx={styles.Button} variant="contained" onClick={handleClose}>
						No
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default WarningPopUp;
