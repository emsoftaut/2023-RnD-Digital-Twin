import React, { useState } from 'react';
import FactoryIoDisplay from '../../FactoryIoDisplay';
import DatabaseStatus from '../../DataBaseStatus';

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
            <DatabaseStatus></DatabaseStatus>
            <FactoryIoDisplay></FactoryIoDisplay>
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
                                        <p>More Detail</p>
                                    </button>
                                </div>
                                <div className='info'>
                                    <p>{card.conveyorSpeed}</p>
                                    <p>{card.paperSuction}</p>
                                    <p>{card.temperature}</p>
                                </div>
                            </div>
                            <div className="rightside">
                                <h2 style={{fontSize: 20}}>Cups per min</h2>
                                <div className='graphDisplay'>
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
                                    <h4>Turn machine on </h4>
                                </button>
                            </div>
                    </div>
                ))}
            </div>
        </div>
        );
    };
        
    export default Homepage;
    