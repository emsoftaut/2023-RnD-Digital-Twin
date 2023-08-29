// BeltSpeedGauge.test.js
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BeltSpeedGauge from '../components/charts/BeltSpeedGauge';

describe('BeltSpeedGauge Component', () => {
    
    it('renders the BeltSpeedGauge component without crashing', () => {
        render(<BeltSpeedGauge beltSpeed={100} mode={{mode: "dark"}} />);
    });

    it('displays the correct belt speed', () => {
        const { getByText } = render(<BeltSpeedGauge beltSpeed={100} mode={{mode: "dark"}} />);
        expect(getByText('100 km/h')).toBeInTheDocument();
    });

});

