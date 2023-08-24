import React, { useState } from "react";
import "./WarningPopUp.css";

function WarningPopUp({ onCancel, onClose }) {
	const [isOpen, setIsOpen] = useState(true);

	const handleCancel = () => {
		setIsOpen(false);
		onCancel();
	};

	const handleClose = () => {
		setIsOpen(false);
		onClose();
	};

	return (
		<div className={`popup ${isOpen ? "open" : ""}`}>
			<div className="popup-content">
				<h2>Cancel the work?</h2>
				<p>Do you want to cancel the work in progress?</p>
				<div className="popup-buttons">
					<button onClick={handleCancel}>Cancel</button>
					<button onClick={handleClose}>Close</button>
				</div>
			</div>
		</div>
	);
}

export default WarningPopUp;
