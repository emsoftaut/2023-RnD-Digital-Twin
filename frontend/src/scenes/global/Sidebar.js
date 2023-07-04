import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{ color: colors.grey[100] }}
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
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
            }}
        >
            <ProSidebar width="250px" >
                <Menu iconShape="square">
                    <Box paddingLeft="5px">
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
                            <Item
                                title="Machine 1"
                                to="/machineDetails"
                                selected={selected}
                                setSelected={setSelected}
                            />
                        </SubMenu>
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};


export default Sidebar;