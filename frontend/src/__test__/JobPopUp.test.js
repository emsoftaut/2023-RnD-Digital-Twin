import React from "react";
import { render, screen, fireEvent, waitFor  } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import JobPopup from "../components/PopUps/JobPopup";

describe("JobPopup Component", () => {
	it("renders the job popup properly", () => {
		render(<JobPopup onClick={() => {}} machineName="Machine123" onClose={() => {}} />);

		// Verify that the popup title is rendered
		const popupTitle = screen.getByText("Jobs Request Form");
		expect(popupTitle).toBeInTheDocument();

		// Verify that the machine ID is rendered based on the provided prop
		const machineIDText = screen.getByText("Machine ID: Machine123");
		expect(machineIDText).toBeInTheDocument();

		// Verify that the submit button is rendered
		const submitButton = screen.getByText("SUBMIT");
		expect(submitButton).toBeInTheDocument();

		// Verify that the close button is rendered
		const closeButton = screen.getByText("CLOSE");
		expect(closeButton).toBeInTheDocument();
	});

	it("submits the form with the correct value when the submit button is pressed", async () => {
		const onClickMock = jest.fn();
	
		render(<JobPopup onClick={onClickMock} machineName="Machine123" onClose={() => {}} />);
	
		// Find the input field
		const inputField = screen.getByLabelText("Number of Boxes:");
	
		// Type the value into the input field
		userEvent.type(inputField, "5");
	
		// Find and click the submit button
		const submitButton = screen.getByText("SUBMIT");
		userEvent.click(submitButton);
	
		// Verify that onClickMock was called with the correct value
		await waitFor(() => {
		  expect(onClickMock).toHaveBeenCalledWith(5);
		});
	  });

	it("resets the text box when close button is pressed", () => {
		render(<JobPopup onClick={() => {}} machineName="Machine123" onClose={() => {}} />);

		// Find the input field and type a value
		const inputField = screen.getByLabelText("Number of Boxes:");
		userEvent.type(inputField, "5");

		// Find and click the close button
		const closeButton = screen.getByText("CLOSE");
		fireEvent.click(closeButton);

		// Verify that the input value is reset to blank
		expect(inputField.value).toBe("0");
	});
});
