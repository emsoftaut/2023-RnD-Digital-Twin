import { Navigate, Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Navbar from '../scenes/global/Navbar';
import Sidebar from '../scenes/global/Sidebar';

function PrivateRoute({ user, machines }) {
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="content">
      <Navbar />
        <div className="app">
        <Sidebar machines={machines}/>
        <Outlet />
        </div>
    </div>
  );
}

export default PrivateRoute;
