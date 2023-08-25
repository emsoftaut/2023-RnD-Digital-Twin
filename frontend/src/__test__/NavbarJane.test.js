import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import Navbar from '../components/Navbar';
import { ColorModeContext } from '../theme';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import AuthContext from '../components/AuthContext';

const renderWithAuthContext = (user, showProps) => {
    const mockContextValue = {
        toggleColorMode: jest.fn(),
        isAdmin: jest.fn(),
    };
    
    const result = render(
        <ColorModeContext.Provider value={mockContextValue.toggleColorMode}>
            <AuthContext.Provider value={mockContextValue.isAdmin}>
                <BrowserRouter>
                <Navbar user={user} showProps={showProps}/>
                </BrowserRouter>
            </AuthContext.Provider></ColorModeContext.Provider>
    );

    return { ...result, toggleColorMode: mockContextValue.toggleColorMode, isAdmin: mockContextValue.isAdmin };
};

afterEach(cleanup);
describe('Navbar Component without user authorization', () => {
    const { container, getByRole } = renderWithAuthContext(false, false);
    const toggleButton = getByRole('button', {name: "Display Mode Toggle"});

    it('Renders without crashing', () => {
        expect(container).toBeInTheDocument();
        expect(toggleButton).toBeInTheDocument();
    });

    it('Does not show admin panel button or profile button', () => {
        const profileButton = screen.queryByRole('button', {name: "Profile"});
        const adminButton = screen.queryByRole('button', {name: "Admin Panel"})
        expect(profileButton).toBeNull();
        expect(adminButton).toBeNull();
    });

    it('Toggles color mode correctly', () => {
        toggleSpy = jest.spyOn(toggleButton, 'click');
        toggleButton.click();
        expect(toggleSpy).toHaveBeenCalled();
    });
});

describe('Navbar Component with user authorization', ()=> {
    it('Renders profile button correctly when authenticated', () => {
        const { getByRole } = renderWithAuthContext(true, true);
        const profileButton = getByRole('button', {name: "Profile"});
        expect(profileButton).toBeInTheDocument();
    });
});
