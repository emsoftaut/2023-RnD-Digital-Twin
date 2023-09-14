import React, { useEffect, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useTheme } from "@mui/material";

const getChartColors = (theme) => {
  const modeValue = theme.palette.mode;
  return modeValue === "dark" ? {
      backgroundColor: theme.palette.divider,
      textColor: '#cccccc',
      gridLineColor: '#333333'
  } : {
      backgroundColor: '#ffffff',
      textColor: '#333333',
      gridLineColor: '#e6e6e6'
  };
};

const initialChartOptions = (jobsDone, jobsQueued, theme) => {
  const colors = getChartColors(theme);
  return {
    chart: { type: 'bar', backgroundColor: colors.backgroundColor },
    title: { text: 'Jobs Overview', style: {color: colors.textColor} },
    xAxis: { categories: ['Jobs Done', 'Jobs Queued'], labels: { style: { color: colors.textColor } }, gridLineColor: colors.gridLineColor },
    yAxis: {
      title: { 
        text: 'Job Count',
        style: { color: colors.textColor }
      },
      labels: { style: { fontSize: '14px', color: colors.textColor } },
      gridLineColor: colors.gridLineColor
    },
    series: [{ data: [jobsDone, jobsQueued] }],
    credits: { enabled: false }
  };
};

const JobInfoChart = ({ jobsDone, jobsQueued }) => {
  const theme = useTheme();
  const [chartOptions, setChartOptions] = useState(initialChartOptions(jobsDone, jobsQueued, theme));

  useEffect(() => {
    setChartOptions(initialChartOptions(jobsDone, jobsQueued, theme));
  }, [jobsDone, jobsQueued, theme]);

  return (
    <HighchartsReact highcharts={Highcharts} options={chartOptions} />
  );
};

export default JobInfoChart;
