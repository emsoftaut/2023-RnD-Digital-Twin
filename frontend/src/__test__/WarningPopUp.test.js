import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WarningPopUp from '../components/PopUps/WarningPopUp';

jest.mock('../data/FireBaseData', () => ({
    setJQMachine: jest.fn(),
    toggleMachine: jest.fn(),
    setEStop: jest.fn(),
  }));

describe('WarningPopUp component', () => {
  it('renders without errors', () => {
    render(<WarningPopUp />);
  });

  it('displays warning text correctly', () => {
    const machID = 'Machine123';
    render(<WarningPopUp machID={machID} />);
    
    const warningTextElement = screen.getByText(/This action cannot be undone/i);
    expect(warningTextElement).toBeInTheDocument();
  });

  it('calls onClose when "No" button is clicked', () => {
    const onCloseMock = jest.fn();
    render(<WarningPopUp onClose={onCloseMock} />);
    
    const noButton = screen.getByText('No');
    fireEvent.click(noButton);

    expect(onCloseMock).toHaveBeenCalled();
  });

});
