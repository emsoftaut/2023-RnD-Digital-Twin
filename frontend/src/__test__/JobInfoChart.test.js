import React from 'react';
import { render } from '@testing-library/react';
import JobInfoChart from '../components/charts/JobInfoChart';
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

describe('JobInfoChart Component', () => {

    it('renders without crashing', () => {
        // Mock the useTheme hook
        useTheme.mockReturnValue({
            palette: {
                mode: 'light',
            },
        });

        const { getByTestId } = render(<JobInfoChart jobsDone={10} jobsQueued={5} />);

        // Check if the mock of HighchartsReact is rendered
        expect(getByTestId("mock-highcharts-react")).toBeInTheDocument();

        // Check for certain key elements (if necessary)
        // For example, you can check if the title 'Jobs Overview' is rendered:
        expect(getByTestId("mock-highcharts-react")).toBeInTheDocument();
    });



    it('passes the correct data to HighchartsReact', () => {
        // Mock the useTheme hook
        useTheme.mockReturnValue({
            palette: {
                mode: 'light',
            },
        });

        render(<JobInfoChart jobsDone={10} jobsQueued={5} />);

        expect(mockProps.options.series[0].data).toEqual([10, 5]);

    });
});
