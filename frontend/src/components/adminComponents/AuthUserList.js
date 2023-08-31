import React from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';

const AuthUserList = ({ users, toggleUserStatus, deleteUser }) => {
  return (
  <Box sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "auto"
  }}>
    <h2 style={{ textAlign: "center" }}>Users List</h2>
    <Box sx={{ maxHeight: 450, width: '110%', overflowY: 'scroll', border: 1}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Email</TableCell>
            <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Name</TableCell>
            <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Status</TableCell>
            <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Action</TableCell>
            <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Modify</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users && users.filter(user => user.displayName).map((user, index) => (
            <TableRow key={index}>
              <TableCell align='center'>{user.email}</TableCell>
              <TableCell align='center'>{user.displayName}</TableCell>
              <TableCell align='center'>{user.disabled ? "Disabled" : "Enabled"}</TableCell>
              <TableCell align='center'>
                <Button
                  variant="contained"
                  style={{ backgroundColor: user.disabled ? '#43a047' : '#7d0606' }}
                  onClick={() => toggleUserStatus(user)}
                >
                  {user.disabled ? "Enable" : "Disable"}
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  style={{backgroundColor: '#7d0606'}}
                  onClick={() => deleteUser(user)}
                >
                  Delete User
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  </Box>
);
          }
export default AuthUserList;
