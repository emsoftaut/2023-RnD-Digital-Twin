import React, { useEffect,useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import solidGauge from 'highcharts/modules/solid-gauge';
import { useTheme } from "@mui/material";

HighchartsMore(Highcharts);
solidGauge(Highcharts);

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

const gaugeOptions = {
    chart: {
        type: 'solidgauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
        height: 'auto'
    },

    title: { text: 'Temperature' },

    pane: {
        center: ['50%', '65%'],
        size: '100%',
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
        min: 0,
        max: 1000,
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
    const theme = useTheme().palette;
    useEffect(() => {
        const colors = getChartColors(mode, theme);
        setChartOptions({
            ...gaugeOptions, // Spread the existing gaugeOptions
            chart: {
                ...gaugeOptions.chart,
                backgroundColor: colors.backgroundColor,
            },
            title: {
                ...gaugeOptions.title,
                style: { color: colors.titleColor }
            },
            yAxis: {
                ...gaugeOptions.yAxis,
                labels: {
                    ...gaugeOptions.yAxis.labels,
                    style: { color: colors.textColor }
                },
                title: {
                    ...gaugeOptions.yAxis.title,
                    style: { color: colors.textColor }
                },
                gridLineColor: colors.gridLineColor
            },
            tooltip: {
                ...gaugeOptions.tooltip,
                backgroundColor: colors.tooltipBackgroundColor,
                style: { color: colors.tooltipTextColor }
            },
            series: [{
                ...gaugeOptions.series,
                name: 'Temperature',
                data: [temperature],
                dataLabels: {
                    format:
                    `<div style="text-align:center;color:${colors.textColor}">` +
                    '<span style="font-size:25px">{y}</span><br/>' +
                    '<span style="font-size:20px;opacity:0.4">°C</span>' +
                    '</div>',
                    style: { color: colors.gridLineColor }
                },
                tooltip: {
                    valueSuffix: ' °C',
                    style: { color: colors.tooltipTextColor } 
                }
            }],
            credits: { enabled: false }
        });
    }, [mode, temperature, theme]);
  
    return (
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    );
  };
  
export default TemperatureGauge;

