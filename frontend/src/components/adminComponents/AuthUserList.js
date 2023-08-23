import React from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';

const AuthUserList = ({ users, toggleUserStatus }) => (
  <Box sx={{ width: "100%", padding: "20px", overflowY: "auto" }}>
    <h2 style={{ textAlign: "center"}}>Users List</h2>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Email</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users && users.map((user, index) => (
          <TableRow key={index}>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.disabled ? "Disabled" : "Enabled"}</TableCell>
            <TableCell>
              <Button
                variant="contained"
                onClick={() => toggleUserStatus(user)} // You'll need to create this function
              >
                {user.disabled ? "Enable" : "Disable"}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Box>
);

export default AuthUserList;
