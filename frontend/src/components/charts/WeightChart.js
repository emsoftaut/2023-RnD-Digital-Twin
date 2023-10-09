import React, { useEffect, useState, useRef } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useTheme } from '@mui/material';
import cloneDeep from 'lodash/cloneDeep';

const getChartColors = (theme) => {
  const modeValue = theme.palette.mode;
  return modeValue === 'dark' ? {
    backgroundColor: theme.palette.divider,
    textColor: '#cccccc',
    gridLineColor: '#333333'
  } : {
    backgroundColor: '#ffffff',
    textColor: '#333333',
    gridLineColor: '#e6e6e6'
  };
};

const initialChartOptions = (totalWeight, theme) => {
  const colors = getChartColors(theme);
  return {
    chart: { type: 'line', backgroundColor: colors.backgroundColor },
    title: { text: 'Total Weight Over Time', style: { color: colors.textColor } },
    xAxis: {
      title: {
        text: 'Time',
        style: { color: colors.textColor }
      },
      labels: { style: { color: colors.textColor } },
      gridLineColor: colors.gridLineColor
    },
    yAxis: {
      title: {
        text: 'Total Weight',
        style: { color: colors.textColor }
      },
      labels: { style: { fontSize: '14px', color: colors.textColor } },
      gridLineColor: colors.gridLineColor
    },
    series: [{
      name: 'Weight',
      data: totalWeight
    }],
    credits: { enabled: false },
    reflow: true
  };
};

const WeightChart = ({ machineId, totalWeight }) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState(Array(10).fill(null));
  const chartRef = useRef(null); // Create a ref to store the HighchartsReact component instance
  const newData = cloneDeep(chartData);
  console.log(`Machine ID: ${machineId}, TotalWeight: ${totalWeight}`);


  useEffect(() => {
    if (!totalWeight) {
      setChartData(Array(10).fill(null)); // Reset the data array when there's no weight data
    } else {
      const newChartData = [...chartData.slice(1), totalWeight];
      setChartData(newChartData);
    }
  }, [totalWeight]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={initialChartOptions(chartData, theme)}
      ref={chartRef}
    />
  );
};

export default WeightChart;
