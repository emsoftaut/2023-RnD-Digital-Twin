import React, { useContext, useState } from "react";
import DropdownProfile from "../../components/DropdownProfile";
import { ColorModeContext, tokens } from "../../theme";
import { Box, IconButton, useTheme } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AuthContext from "../../components/AuthContext";

const Navbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const [openProfile, setOpenProfile] = useState(false);


    const handleProfileClick = () => {
        setOpenProfile((prev) => !prev); // Toggle the openProfile state
      };


    return (
        <Box display="flex" justifyContent="space-between" padding={2}>
            <Box display="flex">
                {theme.palette.mode === 'dark' ? (
                    <img 
                    src="./logo-dark.png" 
                    alt="adas" width={50} 
                    style={{ marginTop: 5 + 'px', marginBottom: 5 + 'px' }} 
                    />
                ) : (
                    <img 
                    src="./logo-light.png" 
                    alt="adas" width={50} 
                    style={{ marginTop: 5 + 'px', marginBottom: 5 + 'px' }} 
                    />
                )}
            </Box>
            <Box display="flex">
                <IconButton 
                onClick={colorMode.toggleColorMode} 
                aria-label="Display Mode Toggle">
                    {theme.palette.mode === 'dark' ? (
                        <LightModeOutlinedIcon/>
                    ) : (
                        <DarkModeOutlinedIcon/>
                    )}
                </IconButton>
                <IconButton aria-label="Settings">
                    <SettingsOutlinedIcon />
                </IconButton>
                <IconButton aria-label="Profile" onClick={handleProfileClick}>
                    <PersonOutlinedIcon />
                </IconButton>
                {
                    openProfile && ( <DropdownProfile/>)
                }
            </Box>
        </Box>
    );
}

export default Navbar;