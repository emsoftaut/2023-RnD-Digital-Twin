import React, { useEffect, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HighChartsMore from 'highcharts/highcharts-more';
import { useTheme } from "@mui/material";

HighChartsMore(Highcharts);

const getChartColors = (modeObj, theme) => {
  const modeValue = modeObj.mode;
  return modeValue === "dark" ? {
      backgroundColor: theme.divider,
      titleColor: '#ffffff',
      textColor: '#cccccc',
      gridLineColor: '#333333',
      seriesColors: ['#FF5733', '#33FF57', '#3357FF'],
      tooltipBackgroundColor: '#222222',
      tooltipTextColor: '#ffffff'
  } : {
      backgroundColor: '#ffffff',
      titleColor: '#000000',
      textColor: '#333333',
      gridLineColor: '#e6e6e6',
      seriesColors: ['#FF3333', '#33FF33', '#3333FF'],
      tooltipBackgroundColor: '#ffffff',
      tooltipTextColor: '#000000'
  };
};

const defaultChartOptions = (beltSpeed) => ({
  chart: {
    type: 'gauge',
    plotBackgroundColor: null,
    plotBorderColor: null,
    plotBorderWidth: 0,
    plotShadow: false,
    height: 'auto',
    reflow: true
  },
  title: { text: 'Belt Speed' },
  pane: {
    startAngle: -90,
    endAngle: 89.9,
    background: null,
    center: ['50%', '65%'],
    size: '80%'
  },
  yAxis: {
    min: 0,
    max: 200,
    tickPixelInterval: 72,
    tickPosition: 'inside',
    tickColor: Highcharts.defaultOptions.chart.backgroundColor || '#FFFFFF',
    tickLength: 20,
    tickWidth: 2,
    minorTickInterval: null,
    labels: {
      distance: 20,
      style: {
        fontSize: '14px'
      }
    },
    lineWidth: 0,
    plotBands: [{
      from: 0,
      to: 120,
      color: '#55BF3B', // green
      thickness: 20
    }, {
      from: 120,
      to: 160,
      color: '#DDDF0D', // yellow
      thickness: 20
    }, {
      from: 160,
      to: 200,
      color: '#DF5353', // red
      thickness: 20
    }]
  },
  series: [{
    name: 'Speed',
    data: [beltSpeed],
    tooltip: { valueSuffix: ' rpm' },
    dataLabels: {
      format: '{y} rpm',
      borderWidth: 0,
      color: (
        Highcharts.defaultOptions.title &&
        Highcharts.defaultOptions.title.style &&
        Highcharts.defaultOptions.title.style.color
      ) || '#333333',
      style: {
        fontSize: '16px'
      }
    },
    dial: {
      radius: '80%',
      backgroundColor: 'gray',
      baseWidth: 12,
      baseLength: '0%',
      rearLength: '0%'
    },
    pivot: {
      backgroundColor: 'gray',
      radius: 6
    }
  }],
  credits: { enabled: false }
});

const BeltSpeedGauge = ({ beltSpeed, mode }) => {
  const theme = useTheme().palette;
  const [chartOptions, setChartOptions] = useState(defaultChartOptions(beltSpeed));

  useEffect(() => {
    const colors = getChartColors(mode, theme);
    setChartOptions(prevOptions => ({
      ...prevOptions,
      chart: {
        ...prevOptions.chart,
        backgroundColor: colors.backgroundColor,
      },
      title: {
        ...prevOptions.title,
        style: { color: colors.titleColor }
      },
      yAxis: {
        ...prevOptions.yAxis,
        labels: {
          ...prevOptions.yAxis.labels,
          color: colors.textColor,
          style: { color: colors.textColor }
        },
        tickColor: {color: colors.textColor},
      },
      series: [{
        ...prevOptions.series[0],
        data: [beltSpeed],
        tooltip: { valueSuffix: ' rpm' },
        dataLabels: {
          ...prevOptions.series[0].dataLabels,
          style: { color: colors.textColor }
        }
      }]
    }));
  }, [mode, beltSpeed, theme]);

  

  return (
    <HighchartsReact highcharts={Highcharts} options={chartOptions} />
  );
};
  
export default BeltSpeedGauge;
  