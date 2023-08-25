import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Navbar from '../components/Navbar';
import { ColorModeContext } from '../theme';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { getFunctions, httpsCallable } from "firebase/functions";
import { useLocation } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";

// Mock authInstance
jest.mock("firebase/auth");
    onAuthStateChanged.mockImplementation((auth, callback) => {
    callback({}); // Simulates a user being authenticated
});

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // Use actual for all non-hook parts
    useLocation: jest.fn().mockReturnValue({
        pathname: '/some-path', // Any path other than '/login'
    }),
}));

jest.mock("firebase/functions");
httpsCallable.mockImplementation(() => {
    return jest.fn(() => Promise.resolve({ data: { isAdmin: true } }));
});
describe('Navbar Component', () => {

    it('Renders without crashing', () => {
        const { container } = render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );
        expect(container).toBeInTheDocument();
    });


    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Toggles color mode correctly', () => {
        const toggleColorMode = jest.fn();
        const { getByLabelText } = render(
            <ColorModeContext.Provider value={{ toggleColorMode }}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </ColorModeContext.Provider>
        );

        const toggleButton = getByLabelText(/Display Mode Toggle/i);
        fireEvent.click(toggleButton);
        expect(toggleColorMode).toHaveBeenCalled();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Renders profile button correctly when authenticated', async () => {
        const { findByLabelText, debug } = render(
            <MemoryRouter initialEntries={['/some-other-route']}>
                <Navbar />
            </MemoryRouter>
        );
    
        debug(); // Print out the HTML to understand what's being rendered
    
        const profileButton = await findByLabelText('Profile');
        expect(profileButton).toBeInTheDocument();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // Additional test cases can go here...
});
