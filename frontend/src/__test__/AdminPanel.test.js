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

const renderWithAuthContext = (component) => {
    const mockContextValue = {
        user: null,  // Modify this based on your AdminPanel requirements
        isAdmin: false,  // Modify this based on your AdminPanel requirements
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
});
