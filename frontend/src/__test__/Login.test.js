import { render, fireEvent } from '@testing-library/react';
import AuthContext from '../components/AuthContext';
import Login from '../components/Login';
import { BrowserRouter } from 'react-router-dom';

const renderWithAuthContext = (component) => {
  const mockContextValue = {
    setUserManually: jest.fn(),
  };

  return render(
    <AuthContext.Provider value={mockContextValue}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </AuthContext.Provider>
  );
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
});