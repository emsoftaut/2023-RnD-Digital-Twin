import { render, fireEvent, waitFor } from '@testing-library/react';
import AuthContext from '../components/AuthContext';
import Login from '../components/Login';
import { BrowserRouter } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { httpsCallable } from "firebase/functions";

// Mock the firebase/auth functions
jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    onAuthStateChanged: jest.fn(() => jest.fn()),
}));

// Mock the Navbar
jest.mock('../components/Navbar', () => {
    return function DummyNavbar() {
        return <div>Navbar</div>;
    };
});

// Mock the firebase/functions functions
jest.mock('firebase/functions', () => ({
    getFunctions: jest.fn(),
    httpsCallable: jest.fn(),
}));

const renderWithAuthContext = (component) => {
    const mockContextValue = {
        setUserManually: jest.fn(),
        setIsAdmin: jest.fn(),
    };

    const result = render(
        <AuthContext.Provider value={mockContextValue}>
            <BrowserRouter>
                {component}
            </BrowserRouter>
        </AuthContext.Provider>
    );

    return {
        ...result,
        setUserManually: mockContextValue.setUserManually,
        setIsAdmin: mockContextValue.setIsAdmin
    };
};

let mockLoginSuccess = true;
signInWithEmailAndPassword.mockImplementation(() => {
    if (mockLoginSuccess) {
        return Promise.resolve({
            user: { uid: '12345', email: 'test@example.com' },
        });
    } else {
        return Promise.reject(new Error('Authentication failed'));
    }
});

describe('Login Component', () => {
    it('Renders without crashing', () => {
        const { container } = renderWithAuthContext(<Login />);
        expect(container).toBeInTheDocument();
    });

    it('Handles email input correctly', () => {
        const { getByLabelText } = renderWithAuthContext(<Login />);
        const emailInput = getByLabelText(/Email/i);

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

        expect(emailInput.value).toBe('test@example.com');
    });
});
