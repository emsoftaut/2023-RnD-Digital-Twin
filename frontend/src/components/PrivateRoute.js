import { Navigate, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import AuthContext from './AuthContext';
import { useContext } from 'react';
import { CircularProgress } from '@mui/material';
import Box from "@mui/material/Box";

function PrivateRoute({ machines }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="content">
      <Navbar user={user} showProps={true}/>
        <div className="app">
        <Sidebar machines={machines}/>
        <Outlet />
        </div>
    </div>
  );
}

export default PrivateRoute;
