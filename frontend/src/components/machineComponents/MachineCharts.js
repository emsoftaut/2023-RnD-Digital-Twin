import React from 'react';
import { useMachineData } from '../../data/FireBaseData';
import TemperatureGauge from '../charts/TemperatureGauge';
import JobsChart from '../charts/JobInfoChart';
import BeltSpeedGauge from '../charts/BeltSpeedGauge';

const MachineCharts = ({ machineID, mode }) => {

  const { machineData } = useMachineData();
  const currentMachine = machineData.find(machine => machine.machineID === machineID);

  const jobsDone = currentMachine?.sensors.jobsDone;
  const jobsQueued = currentMachine?.coils.jobsQueued;
  const beltSpeed = currentMachine?.coils.beltSpeed;
  const temperature = currentMachine?.sensors.temperature;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', height: '100%', width: '100%' }}>

      <div style={{ width: '100%', height: '80%' }}>
        <JobsChart jobsDone={jobsDone} jobsQueued={jobsQueued} mode={mode} />
      </div>
      <div style={{ width: '100%', height: '80%' }}>
        <div />
      </div>
      <div style={{ width: '100%', height: '80%' }}>
        <BeltSpeedGauge beltSpeed={beltSpeed}  mode={mode} />
      </div>
      <div style={{ width: '100%', height: '80%' }}>
        <TemperatureGauge temperature={temperature} mode={mode} />
      </div>
    </div>
  );
};

export default MachineCharts;