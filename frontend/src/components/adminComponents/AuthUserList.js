import React from 'react';
import { Box, Table, TableBody, TableCell, tableCellClasses, TableHead, TableRow, Button, styled, useTheme } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: `${(theme.palette.mode === "dark" ? theme.palette.common.black : theme.palette.primary.main)}`,
    color: theme.palette.primary.contrastText,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const AuthUserList = ({ users, toggleUserStatus, deleteUser }) => {

  const theme = useTheme();

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      maxWidth: "auto"
    }}>
      <h2 style={{ textAlign: "center" }}>Users List</h2>
      <Box sx={{ maxHeight: 450, width: '110%', overflowY: 'scroll' }}>
        <Table>
          <TableHead sx={{ backgroundColor: (theme.mode === 'dark' ? 'auto' : theme.primary) }}>
            <StyledTableRow>
              <StyledTableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Email</StyledTableCell>
              <StyledTableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Name</StyledTableCell>
              <StyledTableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Status</StyledTableCell>
              <StyledTableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Action</StyledTableCell>
              <StyledTableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Modify</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {users && users.filter(user => user.displayName).map((user, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align='center'>{user.email}</StyledTableCell>
                <StyledTableCell align='center'>{user.displayName}</StyledTableCell>
                <StyledTableCell align='center'>{user.disabled ? "Disabled" : "Enabled"}</StyledTableCell>
                <StyledTableCell align='center'>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: user.disabled ? '#43a047' : '#7d0606' }}
                    onClick={() => toggleUserStatus(user)}
                  >
                    {user.disabled ? "Enable" : "Disable"}
                  </Button>
                </StyledTableCell>
                <StyledTableCell>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#7d0606' }}
                    onClick={() => deleteUser(user)}
                  >
                    Delete User
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}
export default AuthUserList;
