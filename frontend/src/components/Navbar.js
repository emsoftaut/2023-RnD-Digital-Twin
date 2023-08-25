import React, { useContext } from "react";
import { ColorModeContext } from "../theme";
import { Box, IconButton, Popover, useTheme, Button } from "@mui/material";
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Link } from 'react-router-dom';
import DropdownProfile from "./DropdownProfile";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AuthContext from "./AuthContext";

const Navbar = ({user, showProps = false}) => {
    const { isAdmin = false } = useContext(AuthContext) || {};
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

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
                {isAdmin && user ? (
                    <Link to="/admin">
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
                    </Link>):<div/>}
                <IconButton
                    onClick={colorMode.toggleColorMode}
                    aria-label="Display Mode Toggle">
                    {theme.palette.mode === 'dark' ? (
                        <LightModeOutlinedIcon />
                    ) : (
                        <DarkModeOutlinedIcon />
                    )}
                </IconButton>
                {user && showProps ? (
                    <PopupState variant="popover" popupId="profilePopup">
                    {(popupState) => (
                        <>
                            <IconButton aria-label="Profile" data-testid="profile-button"{...bindTrigger(popupState)}>
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
                                <DropdownProfile user={user} isAdmin={isAdmin}/>
                            </Popover>
                        </>
                    )}
                    </PopupState>
                ):<div/>}
            </Box>
        </Box>
    );
}

export default Navbar;