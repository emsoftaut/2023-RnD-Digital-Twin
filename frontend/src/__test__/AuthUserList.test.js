import { render, fireEvent, screen } from '@testing-library/react';
import AuthUserList from '../components/adminComponents/AuthUserList';

describe('<AuthUserList />', () => {
  
  const mockUsers = [
    { email: 'test1@example.com', displayName: 'User 1', disabled: true },
    { email: 'test2@example.com', displayName: 'User 2', disabled: false }
  ];

  const mockToggleUserStatus = jest.fn();

  beforeEach(() => {
    render(<AuthUserList users={mockUsers} toggleUserStatus={mockToggleUserStatus} />);
  });

  it('renders without crashing', () => {
    expect(screen.getByText('Users List')).toBeInTheDocument();
  });

  it('displays the correct number of users', () => {
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(mockUsers.length + 1); // +1 for the header row
  });

  it('shows correct user status', () => {
    expect(screen.getByText('Disabled')).toBeInTheDocument();
    expect(screen.getByText('Enabled')).toBeInTheDocument();
  });

  it('displays the correct button text based on user status', () => {
    expect(screen.getAllByText('Enable')).toHaveLength(1);
    expect(screen.getAllByText('Disable')).toHaveLength(1);
  });

  it('calls the toggleUserStatus function when button is clicked', () => {
    fireEvent.click(screen.getByText('Enable'));
    expect(mockToggleUserStatus).toHaveBeenCalledTimes(1);
  });

});
