import React, { useContext, useState, useEffect } from "react";
import { Box, Grid, Paper, Avatar, Button, Typography, useTheme, styled } from "@mui/material";
import { FaCog, FaInfoCircle, FaSignOutAlt } from "react-icons/fa";
import AuthContext from "./AuthContext";
import { getSingleUser } from "../data/FireBaseData";

const Item = styled(Paper)(({ theme }) => ({
  backgroundImage: "none",
  backgroundColor: `none`,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  boxShadow: "none",
  color: theme.palette.text.primary,
}));

const DropdownProfile = ({user, isAdmin}) => {
  const theme = useTheme();
  const { handleLogout } = useContext(AuthContext);
  const [userName, setUserName] = useState('Fetching...');

  useEffect(() => {
    const fetchUserName = async () => {
      const name = await getSingleUser(user.email);
      if (name) {
        setUserName(name);
      } else {
        isAdmin? setUserName("Admin") : setUserName('Not Found');
      }
    };
    fetchUserName();
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