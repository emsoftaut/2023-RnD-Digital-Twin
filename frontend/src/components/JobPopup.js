// // import React from "react";
// // import "./JobPopup.css";

// // function JobPopup(props) {
// // 	return props.trigger ? (
// // 		<div className="popup">
// // 			<div className="popup-inner">
// // 				<button className="popup-cb" onClick={() => props.setTrigger(false)}>
// // 					close
// // 				</button>
// // 				<h1>Job Request</h1>
// // 				<form>
// // 					<label>
// // 						Machine Number:
// // 						<input type="number" name="machineID" />
// // 					</label>
// // 					<br />
// // 					<label>
// // 						Number of Box Request:
// // 						<input type="number" name="jobRequest" />
// // 					</label>
// // 				</form>

// // 				{props.children}
// // 			</div>
// // 		</div>
// // 	) : (
// // 		""
// // 	);
// // }

// // export default JobPopup;

// import React, { useState } from "react";
// import "./JobPopup.css";

// function JobPopup(props) {
// 	const [inputValue, setInputValue] = useState("");
// 	const [outputValue, setOutputValue] = useState("");

// 	const handleInputChange = (event) => {
// 		setInputValue(event.target.value);
// 	};

// 	const handleSubmit = (event) => {
// 		event.preventDefault();
// 		// Here, you can process the input value as needed.
// 		// For this example, we'll just set the outputValue to the input value.
// 		setOutputValue(inputValue);
// 	};

// 	return props.trigger ? (
// 		<div className="popup">
// 			<div className="popup-inner">
// 				<button className="popup-cb" onClick={() => props.setTrigger(false)}>
// 					close
// 				</button>
// 				<h1>Job Request</h1>
// 				<form onSubmit={handleSubmit}>
// 					<label>
// 						Machine Number:
// 						<input type="number" value={inputValue} onChange={handleInputChange} step="1" />
// 						<br />
// 						Number of Box Request:
// 						<input type="number" name="jobRequest" />
// 					</label>
// 					<br />
// 					<button type="submit">Submit</button>
// 				</form>
// 				{outputValue && (
// 					<div>
// 						<p>Output:</p>
// 						<p>{outputValue}</p>
// 					</div>
// 				)}

// 				{props.children}
// 			</div>
// 		</div>
// 	) : (
// 		""
// 	);
// }

// export default JobPopup;

import React, { useState } from "react";
import "./JobPopup.css";

const JobPopup = (props, { title }) => {
	const [inputValue, setInputValue] = useState("");
	const [outputValue, setOutputValue] = useState("");

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// Here, you can process the input value as needed.
		// set the outputValue to the input value.
		setOutputValue(inputValue);
	};

	return props.trigger ? (
		<div className="popup">
			<div className="popup-inner">
				<button className="popup-cb" onClick={() => props.setTrigger(false)}>
					close
				</button>
				<h1>Job Request</h1>
				<form onSubmit={handleSubmit}>
					<label>
						<h3>{title}</h3>
						<br />
						Number of Box Request:
						<input type="number" value={inputValue} onChange={handleInputChange} step="1" />
					</label>
					<br />
					<button type="submit" onClick={() => props.setTrigger(false)}>
						Submit
					</button>
				</form>
				{outputValue && (
					<div>
						<p>Output:</p>
						<p>Sending JQ to F/IO {outputValue}</p>
					</div>
				)}
				{props.children}
			</div>
		</div>
	) : (
		""
	);
};

export default JobPopup;
