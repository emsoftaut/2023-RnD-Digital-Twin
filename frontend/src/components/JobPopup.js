import React, { useState } from "react";
import { Button, useTheme, Box } from "@mui/material";
import "./JobPopup.css";

const JobPopup = ({ onClick, machineName, onClose }) => {
	const [jobsQueueNum, setjobsQueue] = useState();

	const machineID = machineName;
	const theme = useTheme().palette;

	const handleSubmit = (event) => {
		event.preventDefault();
		onClick(jobsQueueNum, machineID);
	};

	const handlevalueChange = (event) => {
		setjobsQueue(event.target.value);
	};

	const handleClose = () => {
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
				backgroundColor: "rgba(0, 0, 0, 0.5)",
			}}
		>
			<Box
				sx={{
					padding: "20px",
					borderRadius: "8px",
					boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.3)",
					width: "500px",
					color: "black",
					//backgroundColor: "white",
					backgroundColor: theme.background,
				}}
			>
				<form onSubmit={handleSubmit}>
					<h1 sx={{ marginBottom: 16 }}>Order Form</h1>
					<h4>Machine ID: {machineName}</h4>
					<label sx={{ display: "block", marginButtom: "8px" }}>
						Number of Boxes:
						<br />
						<input sx={{ width: "100%", padding: "8px", border: "1px solid #a1a1a1", borderRadius: "4px" }} type="number" value={jobsQueueNum} onChange={handlevalueChange} />
					</label>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-evenly",
							alignItems: "center",
							marginTop: "16px",
						}}
					>
						<Button sx={{ color: "white", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer" }} variant="contained" type="submit">
							Submit
						</Button>
						<Button
							sx={{
								color: "white",
								border: "none",
								padding: "8px 16px",
								borderRadius: "4px",
								cursor: "pointer",
							}}
							variant="contained"
							onClick={handleClose}
						>
							Close
						</Button>
					</Box>
				</form>
			</Box>
		</Box>

		// <div className="popup">
		// 	<div className="popup-content">
		// 		<form className="form" onSubmit={handleSubmit}>
		// 			<h1 className="popup-title">Order Form</h1>
		// 			<h4>Machine ID: {machineName}</h4>
		// 			<label className="form-label">
		// 				Number of Boxes:
		// 				<input className="form-input" type="number" value={jobsQueueNum} onChange={handlevalueChange} />
		// 			</label>
		// 			<div className="form-button-group">
		// 				<button className="form-submit-button" type="submit">
		// 					Submit
		// 				</button>
		// 				<button className="close-button" onClick={handleClose}>
		// 					Close
		// 				</button>
		// 			</div>
		// 		</form>
		// 	</div>
		// </div>
	);
};

export default JobPopup;
