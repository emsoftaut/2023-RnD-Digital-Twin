import { Navigate, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

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
