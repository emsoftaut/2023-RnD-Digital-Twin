// import { lightGreen, yellow } from '@mui/material/colors';
import { Box, useTheme } from "@mui/material";
import { Row, Col } from 'react-simple-flex-grid';
import "react-simple-flex-grid/lib/main.css";
import SummaryCard from '../../components/SummaryCard';
import Header from "../../components/Header";
import mockData from "../../data/mockData.json";

const Homepage = () => {
    const theme = useTheme();
    
    return (
        <Box sx={{
            mb: 10,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            overflowY: "scroll",
          }} >
            <Box width="100%" p="20px" >
            <Header title="All machines" subtitle="{timestamp}" />
            <Box>
                <Row gutter={30}>
                {mockData.map(data => 
                <Col xs={{ span: 12 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <SummaryCard title={data.title} info={data.info} />                
                </Col>)}
                </Row>
            </Box>
                
            </Box>
            {/*
            <div className="powerButton">
                <button className='allmachinePowerButton'>
                    <p>Stop All Machine</p>
                </button>
            </div>
            <div className="container">
                {cards.map((card, i) => (
                    <div className="cards">
                        <div key={i} className="card">
                            <div className="leftside">
                                <div className='Heading'>
                                    <h2>{card.title}</h2>
                                    <button className="moreDetailButton">
                                        More Detail
                                    </button>
                                </div>
                                <div className='info'>
                                    <p>{card.conveyorSpeed}</p>
                                    <p>{card.paperSuction}</p>
                                    <p>{card.temperature}</p>
                                </div>
                            </div>
                            <div className="rightside">
                                <h2 style={{ fontSize: 20 }}>Cups per min</h2>
                                <div className='graphDisplay'>
                                    <p style={{ fontSize: 20 }}>X amount</p>
                                    <img src="./dummy-graph.png" alt="adas" width={200} />
                                </div>
                            </div>
                        </div>
                        <div className="cardButton">
                            <div className="machineStatus">
                                <h4>Machine Status</h4>
                            </div>
                            <button className="machinePowerButton">
                                <h4>Turn machine on </h4>
                            </button>
                        </div>
                    </div>
                ))}
                </div>*/}
        </Box>
    );
};

export default Homepage;
