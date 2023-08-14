import React, { useEffect,useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import solidGauge from 'highcharts/modules/solid-gauge';

HighchartsMore(Highcharts);
solidGauge(Highcharts);

const getChartColors = (modeObj) => {
    const modeValue = modeObj.mode;
    console.log(modeValue);
    return modeValue === "dark" ? {
        backgroundColor: '#121212',
    } : {
        backgroundColor: '#ffffff',
    };
};

const gaugeOptions = {
    chart: {
        type: 'solidgauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
        height: '50%'
    },

    title: { text: 'Temperature' },

    pane: {
        center: ['50%', '65%'],
        size: '110%',
        startAngle: -90,
        endAngle: 90,
        background: {
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
        }
    },

    exporting: {
        enabled: false
    },

    tooltip: {
        enabled: false
    },

    // the value axis
    yAxis: {
        stops: [
            [0.1, '#55BF3B'], // green
            [0.5, '#DDDF0D'], // yellow
            [0.9, '#DF5353'] // red
        ],
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
            y: -70
        },
        labels: {
            y: 16
        }
    },

    plotOptions: {
        solidgauge: {
            dataLabels: {
                y: 5,
                borderWidth: 0,
                useHTML: true
            }
        }
    }
};

const TemperatureGauge = ({ temperature, mode }) => {
    const [chartOptions, setChartOptions] = useState({});
  
    useEffect(() => {
        const colors = getChartColors(mode);
        console.log('Setting colors to:', colors.backgroundColor);
        setChartOptions((prevOptions) => ({
          ...prevOptions,
          chart: {
            ...prevOptions.chart,
            backgroundColor: colors.backgroundColor,
          },
          yAxis: {
            ...prevOptions.yAxis,
            min: 0,
            max: 100,
          },
          series: [{
            name: 'Temperature',
            data: [temperature],
            dataLabels: {
              format:
                '<div style="text-align:center">' +
                '<span style="font-size:25px">{y}</span><br/>' +
                '<span style="font-size:12px;opacity:0.4">°C</span>' +
                '</div>'
            },
            tooltip: {
              valueSuffix: ' °C'
            }
          }]
        }));
      }, [mode, temperature]);
  
    return (
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    );
  };
  
export default TemperatureGauge;

