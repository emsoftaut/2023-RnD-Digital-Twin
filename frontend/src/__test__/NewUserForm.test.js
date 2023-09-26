import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NewUserForm from '../components/adminComponents/NewUserForm';

describe('NewUserForm Component', () => {
    const mockSetName = jest.fn();
    const mockSetEmail = jest.fn();
    const mockSetPassword = jest.fn();
    const mockSetConfirmPassword = jest.fn();
    const mockHandleRegister = jest.fn();

    const baseProps = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        setName: mockSetName,
        setEmail: mockSetEmail,
        setPassword: mockSetPassword,
        setConfirmPassword: mockSetConfirmPassword,
        handleRegister: mockHandleRegister,
        error: null,
        registerMessage: null
    };

    it('renders without crashing', () => {
        render(<NewUserForm {...baseProps} />);
        const header = screen.getByText('Add new user');
        expect(header).toBeInTheDocument();
    });

    it('accepts input for all text fields', () => {
        render(<NewUserForm {...baseProps} />);

        const nameInput = screen.getByTestId('name-input');
        const emailInput = screen.getByTestId('email-input');
        const passwordInput = screen.getByTestId('password-input');
        const confirmPasswordInput = screen.getByTestId('confirm-password-input');

        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'secretPass' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'secretPass' } });

        expect(mockSetName).toHaveBeenCalledWith('John Doe');
        expect(mockSetEmail).toHaveBeenCalledWith('john.doe@example.com');
        expect(mockSetPassword).toHaveBeenCalledWith('secretPass');
        expect(mockSetConfirmPassword).toHaveBeenCalledWith('secretPass');
    });

    it('triggers handleRegister on form submission', () => {
        render(<NewUserForm {...baseProps} />);
        const form = screen.getByRole('form');
        fireEvent.submit(form);
        expect(mockHandleRegister).toHaveBeenCalledTimes(1);
    });

    it('displays an error message if provided', () => {
        const customProps = { ...baseProps, error: 'Registration failed' };
        render(<NewUserForm {...customProps} />);
        const errorMessage = screen.getByText('Registration failed');
        expect(errorMessage).toBeInTheDocument();
    });

    it('displays a success message if provided', () => {
        const customProps = { ...baseProps, registerMessage: 'User registered successfully!' };
        render(<NewUserForm {...customProps} />);
        const successMessage = screen.getByText('User registered successfully!');
        expect(successMessage).toBeInTheDocument();
    });
});
