import React, { useState } from "react";
import { Box, Button, Input, Typography, useTheme } from "@mui/material";
import styles from "../style.module.css";

const JobPopup = ({ onClick, machineName, onClose, setEStop, toggleMachine }) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [jobsQueueNum, setJobsQueue] = useState("");
    const theme = useTheme();

    const handleSubmit = (event) => {
        event.preventDefault();
  
        const num = parseInt(jobsQueueNum);
        
        if (num >= 1) {
          onClick(num);
          setEStop(machineName, false);
          toggleMachine(machineName, false);
        } else {
            setErrorMessage("Input value must be 1 or greater.");
        }
    };

    const handleClose = () => {
        setJobsQueue("");
        onClose(false);
    };

    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 10000,
                cursor: "default",
            }}
        >
            <Box
                sx={{
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.3)",
                    width: "400px",
                    color: theme.palette.text.primary,
                    background: theme.palette.background.default,
                    textAlign: "center",
                }}
            >
                <form onSubmit={handleSubmit}>
                    <Typography variant="h5" sx={{ marginBottom: 2 }}>
                        Jobs Request Form
                    </Typography>
                    <Typography variant="body1">Machine ID: {machineName}</Typography>
                    <Input
                        sx={{ width: "100%", padding: "8px", borderRadius: "4px", marginBottom: 1 }}
                        type="number"
                        placeholder="Number of Boxes"
                        value={jobsQueueNum}
                        onChange={(e) => setJobsQueue(e.target.value)}
                    />
                    {errorMessage && (
                        <Box
                            sx={{color: "red", marginBottom: "10px", textAlign: "center",}}>
                            {errorMessage}
                        </Box>
                    )}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "2",
                        }}
                    >
                        <Button className={styles.popbutton} variant="contained" type="submit">
                            SUBMIT
                        </Button>
                        <Box sx={{ width: "10px" }} />
                        <Button className={styles.popbutton} variant="contained" onClick={handleClose}>
                            CLOSE
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default JobPopup;