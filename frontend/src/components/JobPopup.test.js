import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import JobPopup from "./PopUps/JobPopup"; // Update the import path
import AllMachineTable from "./machineComponents/AllMachineTable"; // Update the import path

describe("JobPopup Component", () => {
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

describe("AllMachineTable Component", () => {
	it("renders the job popup when the button is pressed", () => {
		render(<AllMachineTable />);

		const jobRequestButton = screen.getByText("Order");

		userEvent.click(jobRequestButton);

		// Verify that the job popup is rendered
		expect(screen.getByText("Jobs Request Form")).toBeInTheDocument();
	});
});
