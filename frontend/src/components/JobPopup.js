import React from "react";
import "./JobPopup.css";

function JobPopup(props) {
	return props.trigger ? (
		<div className="popup">
			<div className="popup-inner">
				<button className="popup-cb" onClick={() => props.setTrigger(false)}>
					close
				</button>
				<h1>Job Request</h1>
				<form>
					<label>
						Machine Number:
						<input type="number" name="machineID" />
					</label>
					<br />
					<label>
						Number of Box Request:
						<input type="number" name="jobRequest" />
					</label>
				</form>

				{props.children}
			</div>
		</div>
	) : (
		""
	);
}

export default JobPopup;
