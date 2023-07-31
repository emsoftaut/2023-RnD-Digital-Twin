import React from "react";
import "./JobPopup.css";

function JobPopup(props) {
	return (props.trigger) ? (
		<div className="popup">
			<div className="popup-inner">
			<button className="popup-cb" onClick={() => props.setTrigger(false)}>
					close
				</button>
				{props.children}
			</div>
		</div>
	) : (
		""
	);
}

export default JobPopup;
