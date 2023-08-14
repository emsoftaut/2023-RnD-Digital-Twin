import React, { useContext } from "react";
//import {FaInfoCircle, FaSignOutAlt} from "react-icons/fa";
import { styled } from '@mui/material/styles';
import { Box, Grid, Paper, Avatar, Button, Typography, useTheme } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AuthContext from "./AuthContext";

const Item = styled(Paper)(({ theme }) => ({
  backgroundImage: "none",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  boxShadow: "none",
  color: theme.palette.text.secondary,
}));

const DropdownProfile = () => {
  const theme = useTheme();
    const { handleLogout } = useContext(AuthContext);
 
    const handleLogoutClick = () =>  {
        handleLogout();
    }
      
        return (
            <Box sx={{ flexGrow: 1, background: theme.palette.background.default}}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          paddingX={5}
          paddingY={2}
        >

                <Grid item xs>
                <Item><Avatar sx={{ width: 56, height: 56 }} alt="Jane Jung"/></Item>
                </Grid>
                <Grid item xs>
                <Item><Typography variant="h6">Jane Jung</Typography></Item>
              
                </Grid>
                <Grid item xs>
                <Item><Typography variant="p">janejung@email.com</Typography></Item>
              
                </Grid>
                <Grid item xs>
                <Item><Button>Settings</Button></Item>
              
                </Grid>
                <Grid item xs>
                <Item><Button>Help</Button></Item>
              
                </Grid>
                <Grid item xs>
                <Item><Button onClick={handleLogoutClick}>Logout</Button></Item>
            
                </Grid>
              </Grid>
              </Box>
          );
}

export default DropdownProfile;