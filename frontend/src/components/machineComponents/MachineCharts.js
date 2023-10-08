import React from 'react';
import { useMachineData } from '../../data/FireBaseData';
import TemperatureGauge from '../charts/TemperatureGauge';
import JobsChart from '../charts/JobInfoChart';
import BeltSpeedGauge from '../charts/BeltSpeedGauge';
import WeightChart from '../charts/WeightChart';
import { Box } from '@mui/material';

const MachineCharts = ({ machineID, mode, machines }) => {

  const currentMachine = machines.find(machine => machine.machineID === machineID);

  const jobsDone = currentMachine?.sensors.jobsDone;
  const jobsQueued = currentMachine?.coils.jobsQueued;
  const beltSpeed = currentMachine?.sensors.averageSpeed;
  const temperature =currentMachine?.sensors.waterLevel;
  const totalWeight = currentMachine?.sensors.totalWeight;

  const chartDiv = {
    width: '100%',
    height: 'auto',
    padding: '10px',
    borderRadius: '12px',
    border: '2px solid #ccc'
  }


  return (
    <Box 
    display="flex" 
    flexWrap="nowrap"
    flexDirection="row" 
    justifyContent="space-between" 
    alignItems="center"
    padding="10px" 
    gap="2px" 
    width="25%" 
    height="auto">

      <Box sx={{...chartDiv, flexShrink: 0}}>
        <JobsChart jobsDone={jobsDone} jobsQueued={jobsQueued} mode={mode} />
      </Box>
      <Box sx={{...chartDiv, flexShrink: 0}}>
        <WeightChart totalWeight={totalWeight} mode={mode} key={machineID} machineId={machineID} />
      </Box>
      <Box sx={{...chartDiv, flexShrink: 0}}>
        <BeltSpeedGauge beltSpeed={beltSpeed}  mode={mode} />
      </Box>
      <Box sx={{...chartDiv, flexShrink: 0}}>
        <TemperatureGauge temperature={temperature} mode={mode} />
      </Box>
    </Box>
  );
};

export default MachineCharts;