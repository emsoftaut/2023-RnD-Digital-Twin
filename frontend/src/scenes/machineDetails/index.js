import { Box, Button, Paper, useTheme } from "@mui/material";
import MachineTabs from "../../components/machineComponents/MachineTabs";
import Header from "../../components/Header";
import * as React from 'react';

const MachineDetails = ({title}) => {
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
            <Box p="20px" height="110%" component={Paper}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Header title="Machine Details" subtitle={"Machine #"+title} />
                    <Button sx={{ height: 50 }} variant="contained" color="error">stop</Button>
                </Box>
                <MachineTabs machineID={title} mode={theme}/>
            </Box>
        </Box>
    );
};

export default MachineDetails;