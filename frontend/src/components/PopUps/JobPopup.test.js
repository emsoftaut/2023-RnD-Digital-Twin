import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import JobPopup from "./JobPopup";

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

	it("triggers the sumbit button when the SUBMIT button is pressed", () => {
		const onClickMock = jest.fn();

		render(<JobPopup onClick={onClickMock} machineName="Machine123" onClose={() => {}} />);

		const submitButton = screen.getByText("SUBMIT");
		const input = screen.getByLabelText("Number of Boxes:");

		userEvent.type(input, "5");
		fireEvent.click(submitButton);

		expect(onClickMock).toHaveBeenCalledWith("5");
	});

	it("resets input value when the CLOSE button is clicked", () => {
		render(<JobPopup onClick={() => {}} machineName="Machine123" onClose={() => {}} />);

		const closeButton = screen.getByText("CLOSE");
		const input = screen.getByLabelText("Number of Boxes:");

		userEvent.type(input, "5");
		fireEvent.click(closeButton);

		expect(input.value).toBe("0");
	});

	it("accepts a number input and rejects other data types", () => {
		render(<JobPopup onClick={() => {}} machineName="Machine123" onClose={() => {}} />);

		const input = screen.getByLabelText("Number of Boxes:");

		userEvent.type(input, "5");
		expect(input.value).toBe("5");

		userEvent.clear(input);
		userEvent.type(input, "abc");
		expect(input.value).toBe(""); // Input should be empty after invalid input

		userEvent.clear(input);
		userEvent.type(input, "123abc");
		expect(input.value).toBe("123"); // Only numeric part of input should be accepted
	});

	it("closes the popup when the close button is pressed", () => {
		const onCloseMock = jest.fn();

		render(<JobPopup onClick={() => {}} machineName="Machine123" onClose={onCloseMock} />);

		const closeButton = screen.getByText("CLOSE");
		userEvent.click(closeButton);

		expect(onCloseMock).toHaveBeenCalledWith(false);
	});
});

// describe("AllMachineTable Component", () => {
// 	it("renders the job popup properly", () => {
// 		render(<AllMachineTable />);

// 		// Find and click the button that triggers the job popup
// 		const jobRequestButton = screen.getByText("Order");
// 		userEvent.click(jobRequestButton);

// 		// Verify that the job popup is rendered by checking for its content
// 		const popupTitle = screen.getByText("Jobs Request Form");
// 		expect(popupTitle).toBeInTheDocument();
// 	});
// });
