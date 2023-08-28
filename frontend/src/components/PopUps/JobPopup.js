import React, { useState } from "react";
import { Button, Box, useTheme } from "@mui/material";
import styles from "../style.module.css";

const JobPopup = ({ onClick, machineName, onClose }) => {
	const [jobsQueueNum, setjobsQueue] = useState();
	const theme = useTheme();

	const machineID = machineName;

	const handleSubmit = (event) => {
		event.preventDefault();
		onClick(jobsQueueNum);
	};

	const handlevalueChange = (event) => {
		setjobsQueue(event.target.value);
	};

	const handleClose = () => {
		setjobsQueue(0);
		onClose(false);
	};

	return (
		<Box
			sx={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				zIndex: 10000,
				cursor: "default",
				backgroundColor: "rgba(0, 0, 0, 0.5)",
			}}
		>
			<Box
				sx={{
					padding: "20px",
					borderRadius: "8px",
					boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.3)",
					width: "500px",
					color: theme.palette.text.primary,
					background: theme.palette.background.default,
				}}
			>
				<form onSubmit={handleSubmit}>
					<h1 sx={{ marginBottom: 16 }}>Jobs Request Form</h1>
					<h3>Machine ID: {machineID}</h3>
					<label sx={{ display: "block", marginButtom: "8px" }}>
						Number of Boxes:
						<br />
						<input sx={{ width: "100%", padding: "8px", border: "1px solid #a1a1a1", borderRadius: "4px" }} type="number" value={jobsQueueNum} onChange={handlevalueChange} />
						<br />
					</label>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-evenly",
							alignItems: "center",
							marginTop: "16px",
						}}
					>
						<button className={styles.popbutton} variant="contained" type="submit">
							SUBMIT
						</button>
						<button className={styles.popbutton} variant="contained" onClick={handleClose}>
							CLOSE
						</button>
					</Box>
				</form>
			</Box>
		</Box>
	);
};

export default JobPopup;
