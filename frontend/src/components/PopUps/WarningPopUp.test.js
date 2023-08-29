import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WarningPopUp from "./WarningPopUp";
import * as AllMachineTableModule from "../machineComponents/AllMachineTable";

describe("WarningPopUp Component", () => {
	it("renders the warning popup properly", () => {
		const onCancelMock = jest.fn(); // Create a mock function for onCancel
		const onCloseMock = jest.fn(); // Create a mock function for onClose

		render(<WarningPopUp machID="Machine123" onCancel={onCancelMock} onClose={onCloseMock} />);

		// Verify that the warning title is rendered
		const warningTitle = screen.getByText("Warning!");
		expect(warningTitle).toBeInTheDocument();

		// Verify that the warning message is rendered with the provided machID
		const machIDText = screen.getByText("This action cannot be undone. Are you sure you want to cancel order for Machine123?");
		expect(machIDText).toBeInTheDocument();

		// Verify that the "Yes" button is rendered
		const yesButton = screen.getByText("Yes");
		expect(yesButton).toBeInTheDocument();

		// Verify that the "No" button is rendered
		const noButton = screen.getByText("No");
		expect(noButton).toBeInTheDocument();

		// Simulate clicking the "Yes" button
		userEvent.click(yesButton);

		// Verify that the handleCancel function was called
		expect(onCancelMock).toHaveBeenCalledTimes(1);

		// Simulate clicking the "No" button
		userEvent.click(noButton);

		// Verify that the handleClose function was called
		expect(onCloseMock).toHaveBeenCalledTimes(1);
	});

	it("closes the warning popup when close button is pressed", () => {
		const onCancelMock = jest.fn();
		const onCloseMock = jest.fn();

		render(<WarningPopUp machID="Machine123" onCancel={onCancelMock} onClose={onCloseMock} />);

		// Simulate clicking the "No" button (close button)
		const closeButton = screen.getByText("No");
		userEvent.click(closeButton);

		// Verify that the onClose function was called
		expect(onCloseMock).toHaveBeenCalledTimes(1);
	});

	it("handles cancel request properly", () => {
		// Create a spy on the setJQMachine function
		const setJQMachineSpy = jest.spyOn(AllMachineTableModule, "setJQMachine");

		// Render the WarningPopUp component
		render(<WarningPopUp machID="Machine123" onCancel={jest.fn()} onClose={jest.fn()} />);

		// Simulate clicking the "Yes" button
		const yesButton = screen.getByText("Yes");
		userEvent.click(yesButton);

		// Verify that the setJQMachine function was called with the correct arguments
		expect(setJQMachineSpy).toHaveBeenCalledWith("Machine123", 0);

		// Clean up the spy
		setJQMachineSpy.mockRestore();
	});
});
