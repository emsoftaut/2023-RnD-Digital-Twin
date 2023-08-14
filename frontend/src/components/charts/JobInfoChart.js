import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const JobInfoChart = ({ jobsDone, jobsQueued }) => {
  const chartOptions = {
    chart: { type: 'bar' },
    title: { text: 'Jobs Overview' },
    xAxis: { categories: ['Jobs Done', 'Jobs Queued'] },
    yAxis: { title: { text: 'Number of Jobs' } },
    series: [{
      data: [jobsDone, jobsQueued],
    }]
  };

  return (
    <HighchartsReact highcharts={Highcharts} options={chartOptions} />
  );
};

export default JobInfoChart;