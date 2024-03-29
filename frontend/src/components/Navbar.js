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

const Navbar = ({showProps = false}) => {
    const { user } = useContext(AuthContext);
    const { isAdmin = false } = useContext(AuthContext) || {};
    const theme = useTheme().palette;
    const colorMode = useContext(ColorModeContext);

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: 2,
            backgroundColor: (theme.mode === "dark") ? theme.background.paper : theme.primary.main,
        }}>
            <Box display="flex" height={50}>
                {theme.mode === 'dark' ? (
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
                            color="primary"
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
                    {theme.mode === 'dark' ? (
                        <LightModeOutlinedIcon/>
                    ) : (
                        <DarkModeOutlinedIcon/>
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