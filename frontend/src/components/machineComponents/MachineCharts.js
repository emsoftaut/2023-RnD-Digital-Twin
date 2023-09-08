import React from 'react';
import { useMachineData } from '../../data/FireBaseData';
import TemperatureGauge from '../charts/TemperatureGauge';
import JobsChart from '../charts/JobInfoChart';
import BeltSpeedGauge from '../charts/BeltSpeedGauge';
import WeightChart from '../charts/WeightChart';

const MachineCharts = ({ machineID, mode, machines }) => {

  const currentMachine = machines.find(machine => machine.machineID === machineID);





  const jobsDone = currentMachine?.sensors.jobsDone;
  const jobsQueued = currentMachine?.coils.jobsQueued;
  const beltSpeed = currentMachine?.sensors.averageSpeed / 10;
  const temperature = Math.round((currentMachine?.sensors.waterLevel * 7) * 100) / 100;
  const totalWeight = currentMachine?.sensors.totalWeight;

  const chartDiv = {
    width: '100%',
    height: 'auto',
    padding: '10px',
    borderRadius: '12px',
    border: '2px solid #ccc'
  }




  return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr 1fr 1fr', 
        gridTemplateRows: '1fr', 
        height: 'auto', 
        width: 'auto',
        padding: '10px',
        gridGap: '2px',
         }}>

      <div style={chartDiv}>
        <JobsChart jobsDone={jobsDone} jobsQueued={jobsQueued} mode={mode} />
      </div>
      <div style={chartDiv}>
        <WeightChart totalWeight={totalWeight} mode={mode} key={machineID} machineId={machineID} />
      </div>
      <div style={chartDiv}>
        <BeltSpeedGauge beltSpeed={beltSpeed}  mode={mode} />
      </div>
      <div style={chartDiv}>
        <TemperatureGauge temperature={temperature} mode={mode} />
      </div>
    </div>
  );
};

export default MachineCharts;