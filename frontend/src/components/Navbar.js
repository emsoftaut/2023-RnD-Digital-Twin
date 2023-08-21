import React, { useContext, useState, useEffect } from "react";
import { ColorModeContext } from "../theme";
import { Box, IconButton, Popover, useTheme, Button } from "@mui/material";
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { authInstance } from "../firebaseConfig";
import { getFunctions, httpsCallable } from "firebase/functions";
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { useLocation } from "react-router-dom";
import DropdownProfile from "./DropdownProfile";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const Navbar = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const auth = authInstance;
    const functions = getFunctions();
    const location = useLocation();

    useEffect(() => {
        // Listen for auth state changes
        console.log(onAuthStateChanged);
        onAuthStateChanged(auth, (user) => {
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
    }, [auth, functions]);

    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", padding: 2, backgroundColor: (theme.palette.mode === "dark") ? theme.palette.grey[900] : theme.palette.primary.main }}>
            <Box display="flex" height={50}>
                {theme.palette.mode === 'dark' ? (
                    <img src="./logo-dark.png" alt="logo" style={{ margin: 5 + 'px', marginBottom: 5 + 'px', objectFit: "cover" }} />
                ) : (
                    <img src="./logo-light.png" alt="logo" style={{ margin: 5 + 'px', marginBottom: 5 + 'px', objectFit: "cover" }} />
                )}
            </Box>
            <Box display="flex">
                {isAdmin && location.pathname !== '/login' ? (
                    <Link to="/admin" data-testid="admin-panel-button">
                        <Button sx={{
                            height: 50,
                            marginRight: "10px",
                        }}
                            label="Admin Panel"
                            color="info"
                            variant="contained"
                            type="submit"
                            aria-label="Admin Panel"
                            disableElevation
                            >
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
                    <PopupState variant="popover" popupId="profilePopup">
                    {(popupState) => (
                        <>
                            <IconButton aria-label="Profile" {...bindTrigger(popupState)}>
                                <PersonOutlinedIcon />
                            </IconButton>
                            <Popover 
                            {...bindPopover(popupState)} 
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                                }}
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}>
                                <DropdownProfile/>
                            </Popover>
                        </>
                    )}
                    </PopupState>
                ):null}
            </Box>
        </Box>
    );
}

export default Navbar;