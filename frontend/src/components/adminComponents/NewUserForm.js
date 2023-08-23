import React from 'react';
import { TextField, Button, Box } from "@mui/material";

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
        onSubmit={handleRegister}
        sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "400px"
        }}>
        <h2>Add a new user below</h2>
        <TextField
            sx={{ marginBottom: 1, width: '80%' }}
            label="Name"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
        />
        <br />
        <TextField
            sx={{ marginBottom: 1, width: '80%' }}
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />
        <br />
        <TextField
            sx={{ marginBottom: 1, width: '80%' }}
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        <br />
        <TextField
            sx={{ marginBottom: 1, width: '80%' }}
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
        />
        <br/>
        <Button sx={{ height: 50 }} variant="contained" type="submit">Add New User</Button>
        <br />
        {error && <p sx={{ color: "error.main" }}>{error}</p>}
        {registerMessage && <p sx={{ color: "success.main" }}>{registerMessage}</p>}
    </Box>
);

export default NewUserForm;
