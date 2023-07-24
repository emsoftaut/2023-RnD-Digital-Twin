import React, { useState } from 'react';
import FactoryIoDisplay from '../../FactoryIoDisplay';
import DatabaseStatus from '../../DataBaseStatus';
import { useTheme, Box, Button, Paper} from "@mui/material";
import Header from "../../components/Header";
import AllMachineTable from "../../components/AllMachineTable";

const Homepage = () => {
    const theme = useTheme().palette;
    return (
        <Box sx={{
            mb: 1,
            padding: 3,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            overflowY: "scroll",
            backgroundColor: (theme.mode === "dark" ? theme.divider : "auto")
        }} >
            <Box p="20px" height="90%" component={Paper}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Header title="All Machines" subtitle="{timestamp}" />
                    <Button sx={{ height: 50 }} variant="contained" color="error">TURN OFF ALL MACHINES</Button>
                </Box>

                <AllMachineTable />
            </Box>
        </Box>
    );
};

export default Homepage;
