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
        role="form"
        onSubmit={handleRegister}
        sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "400px",
            textAlign: "center"

        }}>
        <h2>Add a new user below</h2>
        <br/>
        <TextField
            sx={{ marginBottom: 1, width: '80%' }}
            label="Name"
            type="name"
            value={name}
            inputProps={{'data-testid': 'name-input'}}
            onChange={(e) => setName(e.target.value)}
            required
        />
        <br />
        <TextField
            sx={{ marginBottom: 1, width: '80%' }}
            label="Email"
            type="email"
            value={email}
            inputProps={{'data-testid': 'email-input'}}
            onChange={(e) => setEmail(e.target.value)}
            required
        />
        <br />
        <TextField
            sx={{ marginBottom: 1, width: '80%' }}
            label="Password"
            type="password"
            value={password}
            inputProps={{'data-testid': 'password-input'}}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        <br />
        <TextField
            sx={{ marginBottom: 1, width: '80%' }}
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            inputProps={{'data-testid': 'confirm-password-input'}}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
        />
        <br/>
        <Button sx={{ height: 50 }} variant="contained" type="submit">Add New User</Button>
        <br />
        {error && <p sx={{ color: "error.main" }}>{error}</p>}
        {registerMessage && <p sx={{ color: "success.main", alignItems: "center" }}>{registerMessage}</p>}
    </Box>
);

export default NewUserForm;
