import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AuthContext from '../components/AuthContext';
import DropdownProfile from '../components/DropdownProfile';

describe('DropdownProfile Component', () => {

  const mockUser = {
    email: 'test@example.com',
    displayName: 'John Doe'
  };

  const adminUser = {
    email: 'Admin',
    displayName : 'Admin'
  }

  const mockHandleLogout = jest.fn();

  const mockContextValue = {
    handleLogout: mockHandleLogout,
  };

  const MockAuthProvider = ({ children }) => (
    <AuthContext.Provider value={mockContextValue}>{children}</AuthContext.Provider>
  );

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Displays the correct username and role when isAdmin is false', () => {
    const { getByText } = render(
      <ThemeProvider theme={createTheme()}>
        <MockAuthProvider>
          <DropdownProfile user={mockUser} isAdmin={false} />
        </MockAuthProvider>
      </ThemeProvider>
    );

    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('User')).toBeInTheDocument();
  });

  it('Displays "Admin" as username when isAdmin is true', () => {
    const { getByText } = render(
      <ThemeProvider theme={createTheme()}>
        <MockAuthProvider>
          <DropdownProfile user={adminUser} isAdmin={true} />
        </MockAuthProvider>
      </ThemeProvider>
    );

    expect(getByText((content, element) => content === 'Admin' && element.tagName.toLowerCase() === 'h6')).toBeInTheDocument();
  });

  it('Displays the correct email', () => {
    const { getByText } = render(
      <ThemeProvider theme={createTheme()}>
        <MockAuthProvider>
          <DropdownProfile user={mockUser} isAdmin={false} />
        </MockAuthProvider>
      </ThemeProvider>
    );

    expect(getByText('test@example.com')).toBeInTheDocument();
  });

  it('Has a Settings button', () => {
    const { getByText } = render(
      <ThemeProvider theme={createTheme()}>
        <MockAuthProvider>
          <DropdownProfile user={mockUser} isAdmin={false} />
        </MockAuthProvider>
      </ThemeProvider>
    );

    expect(getByText('Settings')).toBeInTheDocument();
  });

  it('Has a Help button', () => {
    const { getByText } = render(
      <ThemeProvider theme={createTheme()}>
        <MockAuthProvider>
          <DropdownProfile user={mockUser} isAdmin={false} />
        </MockAuthProvider>
      </ThemeProvider>
    );

    expect(getByText('Help')).toBeInTheDocument();
  });

  it('Logout button works', () => {
    const { getByText } = render(
      <ThemeProvider theme={createTheme()}>
        <MockAuthProvider>
          <DropdownProfile user={mockUser} isAdmin={false} />
        </MockAuthProvider>
      </ThemeProvider>
    );

    fireEvent.click(getByText('Logout'));
    expect(mockHandleLogout).toHaveBeenCalled();
  });

});
