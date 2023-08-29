import { render, cleanup } from "@testing-library/react";
import { CancelAllButton } from "../scenes/dashboard";
import { useMachineData } from "../data/FireBaseData";

const fbMock = require("../data/FireBaseData");

jest.mock("../data/FireBaseData", () => ({
    ...jest.requireActual("../data/FireBaseData"),
    useMachineData: jest.fn(),
    toggleMachine: jest.fn(),
    setJQMachine: jest.fn(),
}));


afterEach(cleanup);

describe("Stop all machines button", () => {
    
    test("Should be disabled if there are no machines running", () => {
        const mockData = [
            {machineID: 1, coils: {override: false, jobsQueued: 13}},
            {machineID: 2, coils: {override: false, jobsQueued: 0}}]
        useMachineData.mockReturnValue({machineData: mockData, error: null});
        const { getByRole } = render(<CancelAllButton/>);
        const button = getByRole(`button`);
        expect(button).toBeDisabled();
    });
    
    test("Should be enabled when any machine starts running", () => {
        const mockData = [
            {machineID: 1, coils: {override: true, jobsQueued: 13}},
            {machineID: 2, coils: {override: false, jobsQueued: 0}}]
        useMachineData.mockReturnValue({machineData: mockData, error: null});
        const { getByRole } = render(<CancelAllButton/>);
        const button = getByRole(`button`);
        expect(button).not.toBeDisabled();
    });

    test("Should call function to cancel all machines when clicked", () => {
        const mockData = [
            {machineID: 1, coils: {override: true, jobsQueued: 13}},
            {machineID: 2, coils: {override: false, jobsQueued: 0}}]
        useMachineData.mockReturnValue({machineData: mockData, error: null});
        const { getByRole } = render(<CancelAllButton/>);
        const button = getByRole(`button`);
        const toggleSpy = jest.spyOn(fbMock, 'toggleMachine');
        const setJQSpy = jest.spyOn(fbMock, 'setJQMachine');
        button.click();
        expect(toggleSpy).toHaveBeenCalled(); //checks that all machines' status has been changed to not running
        expect(setJQSpy).toHaveBeenCalled(); //checks that any machines' JQ has been set to 0
    });
});