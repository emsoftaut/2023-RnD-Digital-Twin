import React from "react";
import { Typography, Box, useTheme, Tab, Tabs } from "@mui/material";
import { tokens } from "../theme";

const MachineTabs = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [value, setValue] = React.useState('summary');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box display={"flex"} sx={{ width: '100%' }} justifyContent={"space-between"}>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="machine page tabs"
                sx={{
                    "& Tab": {
                        color: colors.secondaryVar,
                    }
                }}
            >
                <Tab value="summary" label="Summary"/>
                <Tab value="temp" label="Temperature Settings" />
                <Tab value="detect" label="Detection Settings" />
                <Tab value="server" label="Server Settings" />
                <Tab value="angle" label="Angle Settings" />
                <Tab value="inout" label="Input/Output" />
            </Tabs>
        </Box>
    );
}

export default MachineTabs;