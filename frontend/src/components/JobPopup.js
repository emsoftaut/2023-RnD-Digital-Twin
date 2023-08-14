import React, { useState } from "react";
import "./JobPopup.css";

const JobPopup = ({ onClick, machineName, onClose }) => {
	const [jobsQueueNum, setjobsQueue] = useState();
	const machineID = machineName;

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
			<div className="popup-inner">
				<form onSubmit={handleSubmit}>
					<h1>Job Request</h1>
					<label>
						Machine ID: {machineName}
						<br />
						<br />
						Number of Boxes:
						<input type="number" value={jobsQueueNum} onChange={handlevalueChange} />
					</label>
					<button type="submit">Submit</button>
					<button className="popup-cb" onClick={handleClose}>
						Close
					</button>
				</form>
			</div>
		</div>
	);
};

export default JobPopup;
