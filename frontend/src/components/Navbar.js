import React, { useContext, useState, useEffect } from "react";
import { ColorModeContext } from "../theme";
import { Box, IconButton, useTheme } from "@mui/material";
import { authInstance } from "../firebaseConfig";
import { getFunctions, httpsCallable } from "firebase/functions";
import { Button } from "@mui/material";
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { useLocation } from "react-router-dom";
import DropdownProfile from "./DropdownProfile";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const Navbar = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const [openProfile, setOpenProfile] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const auth = authInstance;
    const functions = getFunctions();
    const location = useLocation();

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                // User is signed in, check if admin
                const checkAdmin = httpsCallable(functions, 'checkAdmin');
                checkAdmin().then((result) => {
                    setIsAdmin(result.data.isAdmin);
                });
            } else {
                // User is signed out, set isAdmin to false
                setIsAdmin(false);
                setIsAuthenticated(false);
            }
        });

        // Cleanup
        return () => unsubscribe();
    }, [auth, functions]);


    const handleProfileClick = () => {
        setOpenProfile((prev) => !prev); // Toggle the openProfile state
    };


    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", padding: 2, backgroundColor: (theme.palette.mode === "dark") ? theme.palette.grey[900] : theme.palette.primary.main }}>
            <Box display="flex">
                {theme.palette.mode === 'dark' ? (
                    <img src="./logo-dark.png" alt="logo" width={50} style={{ marginTop: 5 + 'px', marginBottom: 5 + 'px' }} />
                ) : (
                    <img src="./logo-light.png" alt="logo" width={50} style={{ marginTop: 5 + 'px', marginBottom: 5 + 'px' }} />
                )}
            </Box>
            <Box display="flex">
                {isAdmin && location.pathname !== '/login' ? (
                    <Link to="/admin">
                        <Button sx={{
                            height: 50,
                        }}
                            variant="contained"
                            type="submit">
                            Admin Panel
                        </Button>
                    </Link>):null}
                <IconButton
                    onClick={colorMode.toggleColorMode}
                    aria-label="Display Mode Toggle">
                    {theme.palette.mode === 'dark' ? (
                        <LightModeOutlinedIcon />
                    ) : (
                        <DarkModeOutlinedIcon />
                    )}
                </IconButton>
                {isAuthenticated && location.pathname !== '/login' ? (
                    <>
                        <IconButton aria-label="Settings">
                            <SettingsOutlinedIcon />
                        </IconButton>
                        <IconButton aria-label="Profile" onClick={handleProfileClick}>
                            <PersonOutlinedIcon />
                        </IconButton>
                        {
                            openProfile && (<DropdownProfile />)
                        }
                    </>
                ):null}
            </Box>
        </Box>
    );
}

export default Navbar;