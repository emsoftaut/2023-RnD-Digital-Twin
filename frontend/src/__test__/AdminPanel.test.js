import { render, fireEvent, waitFor } from '@testing-library/react';
import AuthContext from '../components/AuthContext';
import AdminPanel from '../components/adminComponents/AdminPanel';  // Assuming your component is named AdminPanel
import { BrowserRouter } from 'react-router-dom';

// Mock the firebase/auth functions
jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
    onAuthStateChanged: jest.fn(() => jest.fn()),
}));

// Mock the firebase/functions functions
jest.mock('firebase/functions', () => ({
    getFunctions: jest.fn(),
    httpsCallable: jest.fn(() => jest.fn(() => Promise.resolve({
        data: { /* your mocked data here */ }
    })))
}));

const renderWithAuthContext = (component, contextValue) => {
    const defaultContextValue = {
        user: null,
        isAdmin: false,
        setUserManually: jest.fn(),
        setIsAdmin: jest.fn(),
    };
    
    const combinedContextValue = { ...defaultContextValue, ...contextValue };

    const result = render(
        <AuthContext.Provider value={combinedContextValue}>
            <BrowserRouter>
                {component}
            </BrowserRouter>
        </AuthContext.Provider>
    );

    return {
        ...result,
        setUserManually: combinedContextValue.setUserManually,
        setIsAdmin: combinedContextValue.setIsAdmin
    };
};


describe('AdminPanel Component', () => {
    it('Renders without crashing', () => {
        const { container } = renderWithAuthContext(<AdminPanel />);
        expect(container).toBeInTheDocument();
    });

    // Write more tests specific to the AdminPanel component functionalities
    // Example:
    it('Displays Admin Panel if user is an admin', () => {
        const mockContextValue = {
            user: { uid: '12345', email: 'admin@example.com' },
            isAdmin: true,
            setUserManually: jest.fn(),
            setIsAdmin: jest.fn(),
        };
        const { getByText } = renderWithAuthContext(
            <AuthContext.Provider value={mockContextValue}>
                <AdminPanel />
            </AuthContext.Provider>
        );

        expect(getByText('Admin Panel')).toBeInTheDocument();  
    });

    it('renders an error message for non-admin users', () => {
        const { getByText } = renderWithAuthContext(<AdminPanel />, { isAdmin: false });
        expect(getByText('You are not authorized to view this page.')).toBeInTheDocument();
    });

    it('displays an error when passwords do not match', async () => {
        const mockContextValue = {
            user: { uid: '12345', email: 'admin@example.com' },
            isAdmin: true,
            setUserManually: jest.fn(),
            setIsAdmin: jest.fn(),
        };
        
        const { getByTestId, getByText  } = render(
            <AuthContext.Provider value={mockContextValue}>
                <BrowserRouter>
                    <AdminPanel />
                </BrowserRouter>
            </AuthContext.Provider>
        );
        
        const passwordInput = getByTestId('password-input');
        const confirmPasswordInput = getByTestId('confirm-password-input');
        const submitButton = getByText('Add New User');

        // Simulate entering mismatching passwords
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'password456' } });
        
        // Click the submit button
        fireEvent.click(submitButton);

        // Use `findByText` to check for the error message since state updates can be asynchronous
        const errorMessage = getByTestId('password-error');

        expect(errorMessage).toBeInTheDocument();
    });

    it('Provides a way to return to the login page', () => {
        
        // Move mockContextValue inside the test
        const mockContextValue = {
            user: { uid: '12345', email: 'admin@example.com' },
            isAdmin: true,
            setUserManually: jest.fn(),
            setIsAdmin: jest.fn(),
        };

        const { getByText } = render(
            <AuthContext.Provider value={mockContextValue}>
                <BrowserRouter>
                    <AdminPanel />
                </BrowserRouter>
            </AuthContext.Provider>
        );
    
        const returnToLoginLink = getByText('Return to Home');
        expect(returnToLoginLink).toBeInTheDocument();
    });
});
