import React from 'react';
import { render } from '@testing-library/react';
import TemperatureGauge from '../components/charts/TemperatureGauge';
import HighchartsReact from 'highcharts-react-official';
import { useTheme } from "@mui/material";

// Mock the HighchartsReact component and MUI's useTheme hook
const mockProps = {};

jest.mock('highcharts-react-official', () => {
  return {
    __esModule: true,
    default: (props) => {
      Object.assign(mockProps, props); // store the props
      return <div data-testid="mock-highcharts-react" />;
    }
  };
});

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useTheme: jest.fn(),
}));

describe('TemperatureGauge Component', () => {
  it('passes the correct data to HighchartsReact', () => {
    // Mock the useTheme hook
    useTheme.mockReturnValue({
      palette: {
        mode: 'light',
      },
    });

    render(<TemperatureGauge temperature={25} mode={{ mode: 'light' }} />);
    
    // Check if the temperature passed to the series data is correct
    expect(mockProps.options.series[0].data).toEqual([25]);
  });

  it('renders without crashing', () => {
    // Mock the useTheme hook
    useTheme.mockReturnValue({
      palette: {
        mode: 'light',
      },
    });

    const { getByTestId } = render(<TemperatureGauge temperature={25} mode={{ mode: 'light' }} />);
    
    // Check if the mock of HighchartsReact is rendered
    expect(getByTestId("mock-highcharts-react")).toBeInTheDocument();
  });
});
