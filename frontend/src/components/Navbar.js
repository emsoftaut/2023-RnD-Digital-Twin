import React, { useContext, useState, useEffect } from "react";
import { ColorModeContext } from "../theme";
import { Box, IconButton, Popover, useTheme, Button } from "@mui/material";
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { authInstance } from "../firebaseConfig";
import { getFunctions, httpsCallable } from "firebase/functions";
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
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
                {isAdmin &&
                    <Link to="/admin">
                        <Button sx={{
                            height: 50,
                            marginRight: "10px",
                        }}
                            color="info"
                            variant="contained"
                            type="submit"
                            disableElevation>
                            Admin Panel
                        </Button>
                    </Link>}
                <IconButton
                    onClick={colorMode.toggleColorMode}
                    aria-label="Display Mode Toggle">
                    {theme.palette.mode === 'dark' ? (
                        <LightModeOutlinedIcon />
                    ) : (
                        <DarkModeOutlinedIcon />
                    )}
                </IconButton>
                {isAuthenticated && (
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
                )}
            </Box>
        </Box>
    );
}

export default Navbar;