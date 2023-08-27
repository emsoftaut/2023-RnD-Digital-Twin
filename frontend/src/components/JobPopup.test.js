import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import JobPopup from "./PopUps/JobPopup";
import WarningPopUp from "./PopUps/WarningPopUp";

describe("JobPopup Component", () => {
	it("renders the machine ID correctly", () => {
		render(<JobPopup onClose={() => {}} onClick={() => {}} machineName="Machine123" />);

		const machineIdElement = screen.getByText("Machine ID: Machine123");
		expect(machineIdElement).toBeInTheDocument();
	});
	
	it("submits the form with the given number of boxes", () => {
		const mockOnClick = jest.fn();
		render(<JobPopup onClose={() => {}} onClick={mockOnClick} machineName="Machine123" />);

		const inputElement = screen.getByLabelText("Number of Boxes:");
		userEvent.type(inputElement, "5");

		const submitButton = screen.getByText("SUBMIT");
		userEvent.click(submitButton);

		expect(mockOnClick).toHaveBeenCalledWith(5);
	});

	it("closes the popup when the close button is clicked", async () => {
		const mockOnClose = jest.fn();
		render(<JobPopup onClose={mockOnClose} onClick={() => {}} machineName="Machine123" />);

		const closeButton = screen.getByText("CLOSE");
		userEvent.click(closeButton);

		await waitFor(() => {
			expect(mockOnClose).toHaveBeenCalledWith(false);
		});
	});

	it("does not call onClick if the number of boxes is not provided", () => {
		const mockOnClick = jest.fn();
		render(<JobPopup onClose={() => {}} onClick={mockOnClick} machineName="Machine123" />);

		const submitButton = screen.getByText("SUBMIT");
		userEvent.click(submitButton);

		expect(mockOnClick).not.toHaveBeenCalled();
	});
});
