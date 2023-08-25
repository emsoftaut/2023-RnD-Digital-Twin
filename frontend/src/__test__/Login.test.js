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

    it('Calls setUserManually and setIsAdmin when login is successful', async () => {
        // Mock the response for checkAdmin cloud function
        const adminResponse = { data: { isAdmin: true } };
        httpsCallable.mockReturnValueOnce(() => Promise.resolve(adminResponse));
        
        const userCredential = { user: { uid: '12345', email: 'test@example.com' } };
        getAuth.mockReturnValueOnce({});
        signInWithEmailAndPassword.mockResolvedValueOnce(userCredential);
        
        const { getByLabelText, getByRole, setUserManually, setIsAdmin } = renderWithAuthContext(<Login />);
        
        const emailInput = getByLabelText(/Email/i);
        const passwordInput = getByLabelText(/Password/i);
        const loginButton = getByRole('button', { name: /Log In/i });
        
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.click(loginButton);
        
        await waitFor(() => {
            expect(setUserManually).toHaveBeenCalledWith(userCredential.user);
            expect(setIsAdmin).toHaveBeenCalledWith(adminResponse.data.isAdmin);
        });
    });

    it('Fails login with an unauthenticated user', async () => {
        signInWithEmailAndPassword.mockRejectedValueOnce(new Error('Authentication failed'));
        
        const { getByLabelText, getByRole, getByText } = renderWithAuthContext(<Login />);
        const emailInput = getByLabelText(/Email/i);
        const passwordInput = getByLabelText(/Password/i);
        const loginButton = getByRole('button', { name: /Log In/i });

        fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(getByText('Invalid Username or Password.')).toBeInTheDocument();
        });
    });

    it('Logs in with an authenticated user successfully', async () => {
        const userCredential = { user: { uid: '12345', email: 'test@example.com' } };
        signInWithEmailAndPassword.mockResolvedValueOnce(userCredential);
        
        const { getByLabelText, getByRole, setUserManually } = renderWithAuthContext(<Login />);
        const emailInput = getByLabelText(/Email/i);
        const passwordInput = getByLabelText(/Password/i);
        const loginButton = getByRole('button', { name: /Log In/i });
        
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        
        fireEvent.click(loginButton);
        
        await waitFor(() => {
            expect(setUserManually).toHaveBeenCalledWith(userCredential.user);
        });
    });
});
