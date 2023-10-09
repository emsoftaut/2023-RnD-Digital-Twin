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

  const mockHandleLogout = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Displays the correct username and role when isAdmin is false', () => {
    const mockContextValue = {
      user: mockUser,
      handleLogout: mockHandleLogout,
    };

    const { getByText } = render(
      <ThemeProvider theme={createTheme()}>
        <AuthContext.Provider value={mockContextValue}>
          <DropdownProfile isAdmin={false} />
        </AuthContext.Provider>
      </ThemeProvider>
    );

    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('User')).toBeInTheDocument();
  });

  it('Displays "Admin" as username when isAdmin is true', () => {
    const adminUser = {
      email: 'Admin',
      displayName: 'Admin'
    };
    const mockContextValue = {
      user: adminUser,
      handleLogout: mockHandleLogout,
    };

    const { getByText } = render(
      <ThemeProvider theme={createTheme()}>
        <AuthContext.Provider value={mockContextValue}>
          <DropdownProfile isAdmin={true} />
        </AuthContext.Provider>
      </ThemeProvider>
    );

    expect(getByText((content, element) => content === 'Admin' && element.tagName.toLowerCase() === 'h6')).toBeInTheDocument();
  });

  it('Displays the correct email', () => {
    const mockContextValue = {
      user: mockUser,
      handleLogout: mockHandleLogout,
    };

    const { getByText } = render(
      <ThemeProvider theme={createTheme()}>
        <AuthContext.Provider value={mockContextValue}>
          <DropdownProfile isAdmin={false} />
        </AuthContext.Provider>
      </ThemeProvider>
    );

    expect(getByText('test@example.com')).toBeInTheDocument();
  });

  it('Has a Settings button', () => {
    const mockContextValue = {
      user: mockUser,
      handleLogout: mockHandleLogout,
    };

    const { getByText } = render(
      <ThemeProvider theme={createTheme()}>
        <AuthContext.Provider value={mockContextValue}>
          <DropdownProfile isAdmin={false} />
        </AuthContext.Provider>
      </ThemeProvider>
    );

    expect(getByText('Settings')).toBeInTheDocument();
  });

  it('Has a Help button', () => {
    const mockContextValue = {
      user: mockUser,
      handleLogout: mockHandleLogout,
    };

    const { getByText } = render(
      <ThemeProvider theme={createTheme()}>
        <AuthContext.Provider value={mockContextValue}>
          <DropdownProfile isAdmin={false} />
        </AuthContext.Provider>
      </ThemeProvider>
    );

    expect(getByText('Help')).toBeInTheDocument();
  });

  it('Logout button works', () => {
    const mockContextValue = {
      user: mockUser,
      handleLogout: mockHandleLogout,
    };

    const { getByText } = render(
      <ThemeProvider theme={createTheme()}>
        <AuthContext.Provider value={mockContextValue}>
          <DropdownProfile isAdmin={false} />
        </AuthContext.Provider>
      </ThemeProvider>
    );

    fireEvent.click(getByText('Logout'));
    expect(mockHandleLogout).toHaveBeenCalled();
  });
});
