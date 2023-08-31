import React, { useState } from "react";
import { useTheme, Box, List, Collapse, ListItemIcon, ListItemButton, ListItemText, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useMachineData } from '../data/FireBaseData';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const minDrawerWidth = 50;
const maxDrawerWidth = 250;

const Sidebar = () => {
    const { machineData, error } = useMachineData();
    const [selected, setSelected] = useState("index");
    const [innerOpen, setInnerOpen] = useState(true);
    const theme = useTheme().palette;
    const [isClosed, setIsCollapsed] = React.useState(false);

    const handleToggle = () => {
        setIsCollapsed((prev) => !prev);
    };

    const openSubList = () => {
        setInnerOpen(!innerOpen);
    };

    const handleListItemClick = (event, key) => {
        setSelected(key);
    };

    const ListItem = ({ name, text, to, icon }) => {
        return (
            <ListItemButton
                key={name}
                selected={selected === name}
                onClick={(event) => handleListItemClick(event, name)}
                component={Link} to={to}
                sx={{ paddingY: "15px" }}>
                <ListItemIcon >{icon}</ListItemIcon>
                <ListItemText primary={text} />
            </ListItemButton>
        );
    };

    return (
        <Box backgroundColor={(theme.mode === "dark" ? '#121212' : "#fff")}>
            <Collapse orientation={"horizontal"} in={isClosed} collapsedSize={minDrawerWidth} timeout={300} >
                <Box  width={maxDrawerWidth}>
                <List component="nav" sx={{ paddingX: "5px" }}>
                    {isClosed === true ? <>
                        <Box display={'flex'} flexDirection={'row-reverse'}>
                            <IconButton sx={{ alignSelf: "right", paddingY: "15px" }} onClick={handleToggle}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </Box>
                        <ListItem name="index" text="All Machines" to="/" icon={<DashboardIcon />} />

                        <ListItemButton sx={{ paddingY: "15px" }} onClick={openSubList}>
                            <ListItemIcon><PrecisionManufacturingIcon /></ListItemIcon>
                            <ListItemText primary="Machine Details" />
                            {innerOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={innerOpen} timeout="auto" unmountOnExit>
                            <List component="nav">
                                {machineData.map((machine) => (
                                    <ListItem name={machine.machineID} text={"Machine #" + machine.machineID} to={"/" + machine.machineID} />
                                ))}
                            </List>
                        </Collapse></>
                        :
                        <Box display={'flex'}>
                            <IconButton sx={{ paddingY: "15px" }} onClick={handleToggle}>
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    }
                </List>
            
                </Box>
                </Collapse>
        </Box>
    );
};


export default Sidebar;