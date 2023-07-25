import React from "react";
import { useState } from "react";
import { useTheme, Box, Button, Paper } from "@mui/material";
import Header from "../../components/Header";
import AllMachineTable from "../../components/AllMachineTable";
import JobPopup from "../../components/JobPopup";

const Homepage = () => {
	const [buttonPopup, setButtonPopup] = useState(false);

	const theme = useTheme().palette;
	return (
		<Box
			sx={{
				mb: 1,
				padding: 3,
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				overflow: "hidden",
				overflowY: "scroll",
				backgroundColor: theme.mode === "dark" ? theme.divider : "auto",
			}}
		>
			<Box p="20px" height="90%" component={Paper}>
				<Box display="flex" justifyContent="space-between" alignItems="center">
					<Header title="All Machines" subtitle="{timestamp}" />
					<Button sx={{ height: 50 }} variant="contained" color="error">
						TURN OFF ALL MACHINES
					</Button>
				</Box>
				<AllMachineTable />
				{/* popup code */}
				<br></br>
				<button onClick={() => setButtonPopup(true)}>Pop up!!!</button>
				<JobPopup trigger={buttonPopup} setTrigger={setButtonPopup}>
					<h3>I popped up</h3>
				</JobPopup>
			</Box>
		</Box>
	);
};

export default Homepage;
