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

  it('calls onCancel when "Yes" button is clicked', () => {
    const onCancelMock = jest.fn();
    const onCloseMock = jest.fn();
    const setEStopMock = jest.fn();
    const machID = "Machine";
    render(<WarningPopUp machID={machID} onCancel={onCancelMock} onClose={onCloseMock} setEStop={setEStopMock} />);

    
    const yesButton = screen.getByText('Yes');
    fireEvent.click(yesButton);

    expect(onCancelMock).toHaveBeenCalled();
  });

  it('calls onClose when "No" button is clicked', () => {
    const onCloseMock = jest.fn();
    render(<WarningPopUp onClose={onCloseMock} />);
    
    const noButton = screen.getByText('No');
    fireEvent.click(noButton);

    expect(onCloseMock).toHaveBeenCalled();
  });

  it('resets jobs queue, sets job done to 0, hides popup, and updates display when "Yes" button is clicked', async () => {
    const machID = 'Machine123';
    const onCancelMock = jest.fn();
    const onCloseMock = jest.fn();
    const setEStop = jest.fn();
  
    render(<WarningPopUp machID={machID} onCancel={onCancelMock} onClose={onCloseMock} setEStop={setEStop}/>);
    
    const yesButton = await screen.findByText('Yes');
    fireEvent.click(yesButton);
  
    expect(onCancelMock).toHaveBeenCalled();
  
    expect(require('../data/FireBaseData').setJQMachine).toHaveBeenCalledWith(machID, 0);
  
    await waitFor(() => {
      const popup = screen.queryByText('This action cannot be undone');
      expect(popup).toBeNull();
    });
  
    expect(onCancelMock).toHaveBeenCalled();
  });
});
