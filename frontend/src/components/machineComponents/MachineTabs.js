import React from "react";
import { Box, useTheme, Tab, Tabs } from "@mui/material";
import { tokens } from "../../theme";
import MachineCharts from "./MachineCharts";

const MachineTabs = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [value, setValue] = React.useState('summary');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const jobsDone = 50;
    const jobsQueued = 100;

    return (
        <Box sx={{ width: '100%',  overflowX: "scroll" }} justifyContent={"space-between"}>
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
                <Tab value="summary" label="Summary"/>
                <Tab value="temp" label="Temperature Settings" />
                <Tab value="detect" label="Detection Settings" />
                <Tab value="server" label="Server Settings" />
                <Tab value="angle" label="Angle Settings" />
                <Tab value="inout" label="Input/Output" />
                <Tab value="visualize" label="Real Time Analytics" />
            </Tabs>
            {value === "visualize" && (
        <Box>
                {value === "visualize" && (
                <MachineCharts jobsDone={jobsDone} jobsQueued={jobsQueued} />
      )}
        </Box>
      )}
        </Box>
    );
}

export default MachineTabs;