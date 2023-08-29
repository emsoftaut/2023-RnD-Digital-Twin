import React from "react";
import { render, screen, fireEvent, waitFor  } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import JobPopup from "../components/PopUps/JobPopup";
import * as FireBaseDataModule from "../data/FireBaseData";

describe("JobPopup Component", () => {
	it("renders the job popup properly", () => {
		render(<JobPopup onClick={() => {}} machineName="Machine123" onClose={() => {}} />);

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
		render(<JobPopup onClick={() => {}} machineName="Machine123" onClose={() => {}} />);

		const inputField = screen.getByLabelText("Number of Boxes:");
		userEvent.type(inputField, "5");

		const closeButton = screen.getByText("CLOSE");
		fireEvent.click(closeButton);

		expect(inputField.value).toBe("0");
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

});
