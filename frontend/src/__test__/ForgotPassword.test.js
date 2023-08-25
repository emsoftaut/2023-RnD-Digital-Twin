import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import ForgotPassword from '../components/ForgotPassword';

// Mock the firebase/auth functions
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
}));

jest.mock('../components/Navbar', () => {
  return function DummyNavbar() {
    return <div>Navbar</div>;
  };
});

describe('ForgotPassword Component', () => {
  it('Displays an error for an invalid email', async () => {
    sendPasswordResetEmail.mockRejectedValueOnce(new Error('Failed to send email'));
    const { getByLabelText, getByRole, getByText } = render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    );

    const emailInput = getByLabelText(/Email/i);
    const resetButton = getByRole('button', { name: /Reset Password/i });

    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(getByText('Error sending password reset email. Please try again.')).toBeInTheDocument();
    });
  });

  it('Displays a success message for a valid email', async () => {
    sendPasswordResetEmail.mockResolvedValueOnce({});
    const { getByLabelText, getByRole, getByText } = render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    );

    const emailInput = getByLabelText(/Email/i);
    const resetButton = getByRole('button', { name: /Reset Password/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(getByText('An email has been sent to reset your password. Please check your inbox.')).toBeInTheDocument();
    });
  });

  it('Provides a way to return to the login page', () => {
    const { getByText } = render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    );

    const returnToLoginLink = getByText(/Return to Login/i);
    expect(returnToLoginLink).toBeInTheDocument();
  });

  it('Renders without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
  });

  it('Displays the reset password form by default', () => {
    const { getByRole, queryByText } = render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    );

    const resetButton = getByRole('button', { name: /Reset Password/i });
    expect(resetButton).toBeInTheDocument();
    expect(queryByText('An email has been sent to reset your password. Please check your inbox.')).toBeNull();
  });
});
