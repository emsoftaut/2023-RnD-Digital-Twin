import React, { useState } from "react";
import { TextField, Button, useTheme, Box } from "@mui/material";
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
		onClose(null);
	};

	return (
		<div className="popup">
			<div className="popup-content">
				<form className="form" onSubmit={handleSubmit}>
					<h1 className="popup-title">Order Form</h1>
					<h4>Machine ID: {machineName}</h4>
					<label className="form-label">
						Number of Boxes:
						<input className="form-input" type="number" value={jobsQueueNum} onChange={handlevalueChange} />
					</label>
					<div className="form-button-group">
						<button className="form-submit-button" type="submit">
							Submit
						</button>
						<button className="close-button" onClick={handleClose}>
							Close
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default JobPopup;
