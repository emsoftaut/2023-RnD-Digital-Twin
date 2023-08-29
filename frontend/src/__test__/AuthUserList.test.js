import { render, fireEvent } from '@testing-library/react';
import AuthUserList from '../components/adminComponents/AuthUserList'; // Replace with the correct path to your component

describe('<AuthUserList />', () => {
  
  const mockUsers = [
    { email: 'test1@example.com', name: 'User 1', disabled: true },
    { email: 'test2@example.com', name: 'User 2', disabled: false }
  ];

  const mockToggleUserStatus = jest.fn();

  it('renders without crashing', () => {
    render(<AuthUserList users={mockUsers} toggleUserStatus={mockToggleUserStatus} />);
  });

  it('displays the correct number of users', () => {
    const { getAllByRole } = render(<AuthUserList users={mockUsers} toggleUserStatus={mockToggleUserStatus} />);
    const rows = getAllByRole('row');
    expect(rows).toHaveLength(mockUsers.length + 1); // +1 for the header row
  });

  it('shows correct user status', () => {
    const { getByText } = render(<AuthUserList users={mockUsers} toggleUserStatus={mockToggleUserStatus} />);
    expect(getByText('Disabled')).toBeInTheDocument();
    expect(getByText('Enabled')).toBeInTheDocument();
  });

  it('displays the correct button text based on user status', () => {
    const { getAllByText } = render(<AuthUserList users={mockUsers} toggleUserStatus={mockToggleUserStatus} />);
    expect(getAllByText('Enable')).toHaveLength(1);
    expect(getAllByText('Disable')).toHaveLength(1);
  });

  it('calls the toggleUserStatus function when button is clicked', () => {
    const { getByText } = render(<AuthUserList users={mockUsers} toggleUserStatus={mockToggleUserStatus} />);
    fireEvent.click(getByText('Enable'));
    expect(mockToggleUserStatus).toHaveBeenCalledTimes(1);
  });

});
