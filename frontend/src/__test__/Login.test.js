import { render, fireEvent, waitFor } from '@testing-library/react';
import AuthContext from '../components/AuthContext';
import Login from '../components/Login';
import { BrowserRouter } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const renderWithAuthContext = (component) => {
	const mockContextValue = {
		setUserManually: jest.fn(),
	};

	const result = render(
		<AuthContext.Provider value={mockContextValue}>
			<BrowserRouter>
				{component}
			</BrowserRouter>
		</AuthContext.Provider>
	);

	return { ...result, setUserManually: mockContextValue.setUserManually };
};

// Mock the firebase/auth functions
jest.mock('firebase/auth', () => ({
	getAuth: jest.fn(),
	signInWithEmailAndPassword: jest.fn(),
	onAuthStateChanged: jest.fn(() => jest.fn()),
  }));

  jest.mock('../components/Navbar', () => {
	return function DummyNavbar() {
	  return <div>Navbar</div>;
	};
  });

  // Mock checkAdmin function
const mockCheckAdmin = jest.fn();

jest.mock('../../../functions/index', () => ({
    checkAdmin: mockCheckAdmin,
}));

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

	it('Calls setUserManually when login is successful', async () => {
		// Set up your mock implementation for the test
		const userCredential = { user: { uid: '12345', email: 'test@example.com' } };
		getAuth.mockReturnValueOnce({});
		signInWithEmailAndPassword.mockResolvedValueOnce(userCredential);
	
		const { getByLabelText, getByRole, setUserManually } = renderWithAuthContext(<Login />);
	
		const emailInput = getByLabelText(/Email/i);
		const passwordInput = getByLabelText(/Password/i);
		const loginButton = getByRole('button', { name: /Log In/i });
	
		fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
		fireEvent.change(passwordInput, { target: { value: 'password' } });
		fireEvent.click(loginButton);
	
		// Wait for any asynchronous actions to complete
		await waitFor(() => {
			// Check if setUserManually was called with the correct user
			expect(setUserManually).toHaveBeenCalledWith(userCredential.user);
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
		// Mock the response of Firebase's signInWithEmailAndPassword function
		const userCredential = { user: { uid: '12345', email: 'test@example.com' } };
		signInWithEmailAndPassword.mockResolvedValueOnce(userCredential);
	
		// Render the component and get the required elements
		const { getByLabelText, getByRole, setUserManually } = renderWithAuthContext(<Login />);
		const emailInput = getByLabelText(/Email/i);
		const passwordInput = getByLabelText(/Password/i);
		const loginButton = getByRole('button', { name: /Log In/i });
	
		// Simulate the user entering their email and password
		fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
		fireEvent.change(passwordInput, { target: { value: 'password' } });
	
		// Simulate the user clicking the login button
		fireEvent.click(loginButton);
	
		// Wait for any asynchronous actions to complete
		await waitFor(() => {
			// Check if setUserManually was called with the correct user
			expect(setUserManually).toHaveBeenCalledWith(userCredential.user);
		});
	});



});