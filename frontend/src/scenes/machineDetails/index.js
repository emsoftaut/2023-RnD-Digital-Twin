import { Box } from "@mui/material";
import MachineTabs from "../../components/MachineTabs";
import Header from "../../components/Header";
import * as React from 'react';

const MachineDetails = () => {
    return (
        <Box width="100%" m="20px">
            <Header title="Machine Details" subtitle="{Machine 1}" />
            <Box height="75vh">
            <MachineTabs/>
            </Box>
        </Box>
    );
};

export default MachineDetails;