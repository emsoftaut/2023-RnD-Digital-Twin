import React, { useContext, useState, useEffect } from "react";
import { Box, Grid, Paper, Avatar, Button, Typography, useTheme, styled } from "@mui/material";
import { FaCog, FaInfoCircle, FaSignOutAlt } from "react-icons/fa";
import AuthContext from "./AuthContext";

const Item = styled(Paper)(({ theme }) => ({
  backgroundImage: "none",
  backgroundColor: `none`,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  boxShadow: "none",
  color: theme.palette.text.primary,
}));

const DropdownProfile = ({isAdmin}) => {
  const { user } = useContext(AuthContext);
  const theme = useTheme();
  const { handleLogout } = useContext(AuthContext);
  const [userName, setUserName] = useState('Fetching...');

  useEffect(() => {

        isAdmin? setUserName("Admin") : setUserName(`${user.displayName}`);

  }, [user.email]);

  const handleLogoutClick = () => {
    handleLogout();
  }

  return (
    <Box sx={{ flexGrow: 1, background: theme.palette.background.paper }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        paddingX={5}
        paddingY={2}
      >

        <Grid item xs>
          <Item><Avatar sx={{ width: 56, height: 56 }} alt="Jane Jung" /></Item>
        </Grid>
        <Grid item xs>
          <Item><Typography variant="h6">{userName}</Typography> {isAdmin ? "Admin" : "User" }</Item>

        </Grid>
        <Grid item xs>
          <Item><Typography variant="p">{user.email}</Typography></Item>

        </Grid>
        <Grid item xs>
          <Item><Button startIcon={<FaCog />}>Settings</Button></Item>
        </Grid>
        <Grid item xs>
          <Item><Button startIcon={<FaInfoCircle />}>Help</Button></Item>

        </Grid>
        <Grid item xs>
          <Item><Button variant="contained" onClick={handleLogoutClick} startIcon={<FaSignOutAlt />}>Logout</Button></Item>

        </Grid>
      </Grid>
    </Box>
  );
}

export default DropdownProfile;