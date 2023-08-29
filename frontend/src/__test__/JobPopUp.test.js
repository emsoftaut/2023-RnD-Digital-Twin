import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import JobPopup from "../components/PopUps/JobPopup";
import { PopUpButton } from "../components/machineComponents/AllMachineTable";

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

	it("triggers the submit button and uses the value when pressed", () => {
		// Mock function for onClick
		const onClickMock = jest.fn();

		// Render the component
		render(<JobPopup onClick={onClickMock} machineName="Machine123" onClose={() => {}} />);

		// Find the input field and set its value
		const inputField = screen.getByLabelText("Number of Boxes:");
		userEvent.type(inputField, "5");

		// Find and click the submit button
		const submitButton = screen.getByText("SUBMIT");
		fireEvent.click(submitButton);

		// Check if onClickMock was called with the correct value
		expect(onClickMock).toHaveBeenCalledWith(5);
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
