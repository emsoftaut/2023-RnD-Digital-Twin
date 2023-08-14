import React, { useState } from "react";
import "./JobPopup.css";

const JobPopup = ({ onClick, machineName }) => {
	const [jobsQueueNum, setjobsQueue] = useState();

	const machineID = machineName;

	const handleSubmit = (event) => {
		event.preventDefault();
		onClick(jobsQueueNum, machineID);
	};

	const handlevalueChange = (event) => {
		setjobsQueue(event.target.value);
	};

	return (
		<div className="popup">
			<div className="popup-inner">
				<button className="popup-cb">Close</button>
				<h1>Job Request</h1>
				<form onSubmit={handleSubmit}>
					<label>
						Machine ID: {machineName}
						<br />
						Number of Boxes:
						<input type="number" value={jobsQueueNum} onChange={handlevalueChange} />
					</label>
					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
};

export default JobPopup;
