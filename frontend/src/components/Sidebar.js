import { useState } from "react";
import { Box, List, Collapse, ListItemIcon, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useMachineData } from '../data/FireBaseData';

const Sidebar = () => {
    const {machineData, error } = useMachineData();
    const [selected, setSelected] = useState("index");
    const [open, setOpen] = useState(true);

    const openSubList = () => {
        setOpen(!open);
    };

    const handleListItemClick = (event, key) => {
        setSelected(key);
    }

    const ListItem = ({ name, text, to, icon }) => {
        return (
            <ListItemButton
                key={name}
                selected={selected === name}
                onClick={(event) => handleListItemClick(event, name)}
                component={Link} to={to}
                sx={{paddingY: "15px"}}>
                <ListItemIcon >{icon}</ListItemIcon>
                <ListItemText primary={text} />
            </ListItemButton>
        );
    };

    return (
        <Box width="300px">
            <List component="nav" sx={{paddingX: "5px"}}>
                <ListItem name="index" text="All Machines" to="/" icon={<DashboardIcon />} />
                <ListItemButton sx={{paddingY: "15px"}} onClick={openSubList}>
                    <ListItemIcon><PrecisionManufacturingIcon /></ListItemIcon>
                    <ListItemText primary="Machine Details" />{open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
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