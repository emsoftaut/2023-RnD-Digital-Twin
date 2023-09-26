import React from "react";
import { render, screen, fireEvent, waitFor  } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import JobPopup from "../components/PopUps/JobPopup";
import * as FireBaseDataModule from "../data/FireBaseData";


const mockSetEStop = jest.fn();

describe("JobPopup Component", () => {
	it("renders the job popup properly", () => {
		render(<JobPopup onClick={() => {}} machineName="Machine123" onClose={() => {}} setEStop={mockSetEStop} />);

		const popupTitle = screen.getByText("Jobs Request Form");
		expect(popupTitle).toBeInTheDocument();

		const machineIDText = screen.getByText("Machine ID: Machine123");
		expect(machineIDText).toBeInTheDocument();

		const submitButton = screen.getByText("SUBMIT");
		expect(submitButton).toBeInTheDocument();

		const closeButton = screen.getByText("CLOSE");
		expect(closeButton).toBeInTheDocument();
	});

	it("resets the text box when close button is pressed", () => {
		render(<JobPopup onClick={() => {}} machineName="Machine123" onClose={() => {}} setEStop={mockSetEStop} />);

		const inputField = screen.getByLabelText("Number of Boxes:");
		userEvent.type(inputField, "5");

		const closeButton = screen.getByText("CLOSE");
		fireEvent.click(closeButton);

		expect(inputField.value).toBe("0");
	});

	it("closes the popup when the close button is clicked", async () => {
		const mockOnClose = jest.fn();
		render(<JobPopup onClick={() => {}} machineName="Machine123" onClose={mockOnClose} setEStop={mockSetEStop} />);

		const closeButton = screen.getByText("CLOSE");
		userEvent.click(closeButton);

		await waitFor(() => {
			expect(mockOnClose).toHaveBeenCalledWith(false);
		});
	});

	it('handles input change correctly', () => {
		render(<JobPopup onClick={() => {}} machineName="Machine123" onClose={() => {}} setEStop={mockSetEStop} />);
		
		const inputElement = screen.getByLabelText('Number of Boxes:');
		fireEvent.change(inputElement, { target: { value: '5' } });
	  
		expect(inputElement).toHaveValue(5);
	  });

	  it('calls onClick when the form is submitted', () => {
		const onClickMock = jest.fn();
		render(<JobPopup onClick={onClickMock} machineName="Machine123" onClose={() => {}} setEStop={mockSetEStop} />);
		
		const submitButton = screen.getByText('SUBMIT');
		fireEvent.click(submitButton);
	
		expect(onClickMock).toHaveBeenCalled();
	  });

	  it('handles valid positive integer input', () => {
		render(<JobPopup onClick={() => {}} machineName="Machine123" onClose={() => {}} setEStop={mockSetEStop} />);
		
		const inputElement = screen.getByLabelText('Number of Boxes:');
	  
		fireEvent.change(inputElement, { target: { value: '10' } });
	  
		expect(inputElement).toHaveValue(10);
	  
		const validIntegerPattern = /^\d+$/;
		expect(validIntegerPattern.test(inputElement.value)).toBe(true);
	  });
});
