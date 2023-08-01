import React, { useContext, useState, useEffect } from "react";
import DropdownProfile from "../../components/DropdownProfile";
import { ColorModeContext } from "../../theme";
import { Box, IconButton, useTheme } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

import { getFunctions, httpsCallable } from "firebase/functions";
import { Link } from 'react-router-dom';
import { authInstance  } from "../../firebaseConfig";

const Navbar = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const [openProfile, setOpenProfile] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    //const navigate = useNavigate();
    const auth = authInstance;
    const functions = getFunctions();

    useEffect(() => {
        const checkAdmin = httpsCallable(functions, 'checkAdmin');
        checkAdmin().then((result) => {
            setIsAdmin(result.data.isAdmin);
        });
    }, []);


    const handleProfileClick = () => {
        setOpenProfile((prev) => !prev); // Toggle the openProfile state
      };


    return (
        <Box sx={{display: "flex", justifyContent: "space-between", padding: 2, backgroundColor: (theme.palette.mode === "dark") ? theme.palette.grey[900] : theme.palette.primary.main}}>
            <Box display="flex">
                {theme.palette.mode === 'dark' ? (
                    <img src="./logo-dark.png" alt="logo" width={50} style={{ marginTop: 5 + 'px', marginBottom: 5 + 'px' }} />
                ) : (
                    <img src="./logo-light.png" alt="logo" width={50} style={{ marginTop: 5 + 'px', marginBottom: 5 + 'px' }} />
                )}
            </Box>
            <Box display="flex">
                {isAdmin && 
                <Link to="/admin">
                    <IconButton>Admin Panel</IconButton>
                </Link>}
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