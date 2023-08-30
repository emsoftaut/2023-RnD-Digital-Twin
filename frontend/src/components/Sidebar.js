import React, { useEffect, useState } from "react";
import { useTheme, Box, Button, List, Collapse, Drawer, ListItemIcon, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useMachineData } from '../data/FireBaseData';


export const defaultDrawerWidth = 300;
const minDrawerWidth = 50;
const maxDrawerWidth = 300;


const Sidebar = () => {
    const { machineData, error } = useMachineData();
    const [selected, setSelected] = useState("index");
    const [innerOpen, setInnerOpen] = useState(true);
    const theme = useTheme().palette;
    const [drawerWidth, setDrawerWidth] = React.useState(defaultDrawerWidth);

    const handleToggle = () => {
        (drawerWidth === 300 ? setDrawerWidth(minDrawerWidth) : setDrawerWidth(maxDrawerWidth));
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
                {(drawerWidth === 300 ? <ListItemText primary={text} /> : null)}
            </ListItemButton>
        );
    };

    return (
        <Box width={drawerWidth} backgroundColor={(theme.mode === "dark" ? '#121212' : "#fff")}>
            <List component="nav" sx={{ paddingX: "5px" }}>
                <ListItemButton sx={{ paddingY: "15px" }} icon={<DashboardIcon />} onClick={handleToggle} />
                <ListItem name="index" text="All Machines" to="/" icon={<DashboardIcon />} />
                <ListItemButton sx={{ paddingY: "15px" }} onClick={openSubList}>
                    <ListItemIcon><PrecisionManufacturingIcon /></ListItemIcon>
                    {(drawerWidth === 300 ? <ListItemText primary="Machine Details" /> : null)}{innerOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={innerOpen} timeout="auto" unmountOnExit>
                    <List component="nav" >
                        {machineData.map((machine) => (
                            <ListItem name={machine.machineID} text={"Machine #" + machine.machineID} to={"/" + machine.machineID} />
                        ))}
                    </List>
                </Collapse>
            </List>
        </Box>
    );
};


export default Sidebar;