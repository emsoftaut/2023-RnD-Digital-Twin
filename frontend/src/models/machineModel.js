export const machineModel = (jobsDone, jobsQueued) => ({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
    },
    title: {
      text: 'Machine Analytics',
      align: 'center',
      verticalAlign: 'middle',
      y: 120,
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: 'bold',
            color: 'white',
          },
        },
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '75%'],
        size: '110%',
        innerSize: '50%', // This will create the donut shape
      },
    },
    series: [
      {
        type: 'pie',
        data: [
            ['Jobs Done', jobsDone],
            ['Jobs Queued', jobsQueued],
        ],
      },
    ],
  });