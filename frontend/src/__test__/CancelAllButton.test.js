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
    
    
    test("Should be enabled when any machine starts running", () => {
        const mockData = [
            {machineID: 1, coils: {override: true, jobsQueued: 13}},
            {machineID: 2, coils: {override: false, jobsQueued: 0}}]
        useMachineData.mockReturnValue({machineData: mockData, error: null});
        const { getByRole } = render(<CancelAllButton/>);
        const button = getByRole(`button`);
        expect(button).not.toBeDisabled();
    });

});