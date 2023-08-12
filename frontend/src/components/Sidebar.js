import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu} from "react-pro-sidebar";
import { Box, useTheme} from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useMachineData } from '../data/FireBaseData';

const Item = ({ title, to, icon, selected, setSelected }) => {
    return (
        <MenuItem
            key={title}
            active={selected === title}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <p>{title}</p>
            <Link to={to} />
        </MenuItem>
    );
};

const Sidebar = () => {
    const {machineData, error } = useMachineData();
    const theme = useTheme();
    const [selected, setSelected] = useState("Dashboard");
    return (
        <Box
            sx={{
                "& .pro-sidebar": {
                    background: `${theme.palette.background.default} !important`,
                },
                "& .pro-sidebar-inner": {
                    background: `${theme.palette.background.default} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-menu-item .pro-arrow": {
                    borderColor: `inherit !important`,
                },
                "& .pro-sidebar .pro-menu .pro-menu-item": {
                    color:  `${theme.palette.text.primary} !important`,
                },
                
                "& .pro-sidebar .pro-menu .pro-menu-item.active": {
                    color:  `${theme.palette.success.main} !important`,
                },
            }}
        >
            <ProSidebar width="250px">
                <Menu iconShape="square">
                    <Box paddingLeft="5px" paddingRight="5px">
                        <Item
                            title="All Machines"
                            to="/"
                            icon={<DashboardIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <SubMenu
                            title="Machine Details"
                            to="/"
                            icon={<PrecisionManufacturingIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        >
                            {machineData.map(machine => 
                            <Item 
                            key={machine.machineID}
                            title={"Machine #" + machine.machineID} 
                            to={"/"+machine.machineID} 
                            selected={selected} 
                            setSelected={setSelected}/>)}
                        </SubMenu>
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};


export default Sidebar;