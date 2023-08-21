import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Navbar from '../components/Navbar';
import { ColorModeContext } from '../theme';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { getFunctions, httpsCallable } from "firebase/functions";

// Mock authInstance
jest.mock('../firebaseConfig', () => ({
    authInstance: {
        onAuthStateChanged: jest.fn((callback) => {
            callback(null); // Simulates a user being signed out
            return () => { }; // Return an unsubscribe function
        }),
    },
}));

jest.mock('firebase/auth', () => ({
    onAuthStateChanged: jest.fn((auth, callback) => {
      callback({ uid: 'some-uid' }); // Simulate a signed-in user
    }),
  }));

  jest.mock('firebase/functions', () => ({
    getFunctions: jest.fn(),
    httpsCallable: jest.fn(() => () => ({
      then: (callback) => callback({ data: { isAdmin: true } }),
    })),
  }));

describe('Navbar Component', () => {

    it('Renders without crashing', () => {
        const { container } = render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );
        expect(container).toBeInTheDocument();
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

    // Additional test cases can go here...
});
