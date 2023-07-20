import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu} from "react-pro-sidebar";
import { Box, useTheme} from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import mockData from "../../data/mockData.json";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Item = ({ title, to, icon, selected, setSelected }) => {
    return (
        <MenuItem
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
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = useState("Dashboard");
    return (
        <Box
            sx={{
                "& .pro-sidebar": {
                    background: `${colors.surface[700]} !important`,
                },
                "& .pro-sidebar-inner": {
                    background: `${colors.surface[700]} !important`,
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
                "& .pro-inner-item:hover": {
                    background: `${colors.surface[600]} !important`,
                    color: `${colors.onSurface[100]} !important`,
                },
                "& .pro-menu-item": {
                    color: `${colors.onSurface[100]} !important`,
                },
                "& .pro-menu-item.active": {
                    background: `${colors.surface[500]} !important`,
                    color: `${colors.onSurface[200]} !important`,
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
                            {mockData.map(data => 
                                <Item title={"Machine #" + data.title} to={"/machineDetails"+data.path} selected={selected} setSelected={setSelected}/>)}
                        </SubMenu>
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};


export default Sidebar;