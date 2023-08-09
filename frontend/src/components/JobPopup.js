import React, { useState } from "react";
import "./JobPopup.css";

const JobPopup = ({ onClose, machineName }) => {
	const [jobsQueueNum, setjobsQueue] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		onClose(jobsQueueNum);
	};

	const handlevalueChange = (event) => {
		setjobsQueue(event.target.value);
	};

	return (
		<div className="popup">
			<div className="popup-inner">
				<button className="popup-cb" onClick={() => onClose(null)}>
					Close
				</button>
				<h1>Job Request</h1>
				<form onSubmit={handleSubmit}>
					<label>
						Machine ID: {machineName}
						<br />
						Number of Boxes:
						<input type="text" value={jobsQueueNum} onChange={handlevalueChange} />
					</label>
					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
};

export default JobPopup;
