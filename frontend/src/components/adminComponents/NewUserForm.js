import React from 'react';
import { TextField, Button, Box, Grid } from "@mui/material";

const NewUserForm = ({
    name,
    email,
    password,
    confirmPassword,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleRegister,
    error,
    registerMessage,
}) => (
    <Box
        component="form"
        role="form"
        onSubmit={handleRegister}
    >
        <Grid container rowSpacing={2}
            direction="column"
            justifyContent="center"
            alignItems="center">
            <Grid item xs={6}>
                <h2>Add new user</h2>
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Name"
                    type="name"
                    value={name}
                    inputProps={{ 'data-testid': 'name-input' }}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    inputProps={{ 'data-testid': 'email-input' }}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    inputProps={{ 'data-testid': 'password-input' }}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    inputProps={{ 'data-testid': 'confirm-password-input' }}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </Grid>
            <Grid item xs={6}>
                <Button sx={{ height: 50 }} variant="contained" type="submit">Add New User</Button>
                {error && <p sx={{ color: "error.main" }}>{error}</p>}
                {registerMessage && <p sx={{ color: "success.main", alignItems: "center" }}>{registerMessage}</p>}
            </Grid>
        </Grid>
    </Box>





);

export default NewUserForm;
