// import { lightGreen, yellow } from '@mui/material/colors';
import React, { useState } from 'react';
// import { FaAlignJustify } from 'react-icons/fa';

const Homepage = () => {
    const [cards] = useState([
        {
            title:'Machine #0001',
            conveyorSpeed:'Conveyor Speed: ' + 100 + ' m/s',
            paperSuction:'Paper Suction: ' + 70 + ' / 40',
            temperature:'Temperature: ' + 60 + ' degrees'
        },        
        {
            title:'Machine #0002',
            conveyorSpeed:'Conveyor Speed: ' + 100 + ' m/s',
            paperSuction:'Paper Suction: ' + 1 + ' / 40',
            temperature:'Temperature: ' + 50 + ' degrees'
        },
        {
            title:'Machine #0003',
            conveyorSpeed:'Conveyor Speed: ' + 100 + ' m/s',
            paperSuction:'Paper Suction: ' + 60 + ' / 40',
            temperature:'Temperature: ' + 70 + ' degrees'
        },
        {
            title:'Machine #0004',
            conveyorSpeed:'Conveyor Speed: ' + 100 + ' m/s',
            paperSuction:'Paper Suction: ' + 70 + ' / 40',
            temperature:'Temperature: ' + 60 + ' degrees'
        }
    ])
    
    return (
    
        <div>
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
                                <h2> Cups per min</h2>
                                <div>
                                    <p style={{fontSize: 20}}>X amount</p>
                                    <img src="./dummy-graph.png" alt="adas" width={200} />
                                </div>    
                            </div>
                        </div>
                            <div className="cardButton">
                                <div className="machineStatus">
                                    <h4>Machine Status</h4>
                                </div>
                                <button className="machinePowerButton">
                                    Turn machine on
                                </button>
                            </div>
                    </div>
                ))}
            </div>
        </div>
        );
    };
        
        export default Homepage;
    