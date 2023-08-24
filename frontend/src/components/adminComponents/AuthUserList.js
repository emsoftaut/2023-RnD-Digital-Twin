import React from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Button, TableContainer } from '@mui/material';

const AuthUserList = ({ users, toggleUserStatus }) => (
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
          </TableRow>
        </TableHead>
        <TableBody>
          {users && users.map((user, index) => (
            <TableRow key={index}>
              <TableCell align='center'>{user.email}</TableCell>
              <TableCell align='center'>{user.name}</TableCell>
              <TableCell align='center'>{user.disabled ? "Disabled" : "Enabled"}</TableCell>
              <TableCell align='center'>
                <Button
                  variant="contained"
                  onClick={() => toggleUserStatus(user)}
                >
                  {user.disabled ? "Enable" : "Disable"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  </Box>
);

export default AuthUserList;
