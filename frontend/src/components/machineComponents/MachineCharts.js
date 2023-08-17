import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { machineModel } from '../../models/machineModel';

const MachineCharts = ({ jobsDone, jobsQueued }) => {
  const chartOptions = machineModel(jobsDone, jobsQueued);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default MachineCharts;