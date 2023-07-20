import { Box, Button, Table, TableCell, TableRow, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const StyledCell = ({text}) => {
    return (
        <TableCell sx={{color:"white", padding: "15px 5px"}}>{text}</TableCell>
    )
}

const SummaryCard = ({ title, info }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  //add method to handle on/off toggle
  //add method to show further details (lead to diff page)
  //json to bring values from firebase
  return (
    <Box 
    m="5px 5px"
    p="10px 15px" 
    backgroundColor={colors.surface[500]}
    borderRadius="5px"
    sx= {{
        ".row": {
        display:"flex", 
        justifyContent:"space-between", 
        alignItems:"center",
        margin: "5px auto",
        },
    }}
    >
    <Typography variant="h5" fontWeight="bold" sx={{color: colors.primary[100]}}>Machine ID: #{title}</Typography>
    <Box className="row">
        <Typography variant="p" sx={{ color: colors.onSurface[100] }}>
        Status: {info.status ? "Running" : "Not Running"}
        </Typography>
        <Button sx= {{
            color: "#FFFFFF",
            backgroundColor: info.status ? "green" : "grey",
            ":hover": {
                backgroundColor: "blue",
            },
            }}>
            {info.status ? "Turn Off" : "Turn On"}
        </Button>
    </Box>
    <Box className="row">
        <Table>
            <TableRow>
                <StyledCell text="Conveyor Speed"/>
                <StyledCell text={info.conveyorSpeed+"ms"}/>
            </TableRow>
            <TableRow>
                <StyledCell text="Paper Suction"/>
                <StyledCell text={info.paperSuction}/>
            </TableRow>
            <TableRow>
                <StyledCell text="Temperature"/>
                <StyledCell text={info.temperature + "ºC"}/>
            </TableRow>
        </Table>
        {/*Progress chart*/}
    </Box>
    <Box width="100%" textAlign="center">
        <Button>More Details</Button>
    </Box>
    </Box>
  );
};


export default SummaryCard;