import React from "react";
import { Box, useTheme, Tab, Tabs } from "@mui/material";
import { tokens } from "../../theme";
import MachineCharts from "./MachineCharts";

const MachineTabs = ({ machineID, mode, machines }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [value, setValue] = React.useState('visualize');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', height: '100%', overflowX: "scroll" }} justifyContent={"space-between"}>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="machine page tabs"
                sx={{
                    "& Tab": {
                        color: colors.secondary,
                    }
                }}
            >
                <Tab value="visualize" label="Real Time Analytics" />
                <Tab value="summary" label="Summary" />
                <Tab value="temp" label="Temperature Settings" />
                <Tab value="detect" label="Detection Settings" />
                <Tab value="server" label="Server Settings" />
                <Tab value="angle" label="Angle Settings" />
                <Tab value="inout" label="Input/Output" />
            </Tabs>
            {value === "visualize" && (
                <Box>
                    {value === "visualize" && (
                        <MachineCharts machineID={machineID} mode={mode} machines={machines}/>
                    )}
                </Box>
            )}
        </Box>
    );
}

export default MachineTabs;