import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import  AuthContext  from '../components/AuthContext';
import DropdownProfile from '../components/DropdownProfile';
import { getSingleUser } from "../data/FireBaseData";

// Mocking the firebase call
jest.mock('../data/FireBaseData', () => ({
  getSingleUser: jest.fn(),
}));

describe('DropdownProfile Component', () => {

  const mockUser = {
    email: 'test@example.com',
  };

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

  it('Displays the correct username/email fields', async () => {
    getSingleUser.mockResolvedValueOnce('John Doe');

    const { findByText } = render(
      <ThemeProvider theme={createTheme()}>
        <MockAuthProvider>
          <DropdownProfile user={mockUser} isAdmin={false} />
        </MockAuthProvider>
      </ThemeProvider>
    );

    expect(await findByText('John Doe')).toBeInTheDocument();
    expect(await findByText('test@example.com')).toBeInTheDocument();
  });

  it('Has a Settings button', () => {
    getSingleUser.mockResolvedValueOnce('John Doe');

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
    getSingleUser.mockResolvedValueOnce('John Doe');

    const { getByText } = render(
      <ThemeProvider theme={createTheme()}>
        <MockAuthProvider>
          <DropdownProfile user={mockUser} isAdmin={false} />
        </MockAuthProvider>
      </ThemeProvider>
    );

    expect(getByText('Help')).toBeInTheDocument();
  });

  it('Logout button works', async () => {
    getSingleUser.mockResolvedValueOnce('John Doe');

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

