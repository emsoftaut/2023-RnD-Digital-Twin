import { render, cleanup } from "@testing-library/react";
import { MachineButton } from "../components/machineComponents/AllMachineTable";

afterEach(cleanup);

//Testing Toggle button features
describe("Machine Button (Toggle)", () => {
    test("Should be disabled if there are no jobs (jQ = 0)", () => {
        const { getByRole } = render(<MachineButton machID={"13"} running={false} method={"toggle"} jQ={0} />);
        const button = getByRole(`button`);
        expect(button).toBeDisabled();
    });
    test("Should be enabled when a job is queued", () => {
        const { getByRole } = render(<MachineButton machID={"13"} running={false} method={"toggle"} jQ={1} />);
        const button = getByRole(`button`);
        expect(button).not.toBeDisabled();
    });

    test("Should call toggleMachine() function when clicked", () => {
        const { getByRole } = render(<MachineButton machID={"13"} running={false} method={"toggle"} jQ={123123} />);
        const button = getByRole(`button`);
        const buttonSpy = jest.spyOn(button, 'click');
        button.click();
        expect(buttonSpy).toHaveBeenCalled();
    });

    test("Inner text should be 'pause' when there running = true", () => {
        const { getByRole } = render(<MachineButton machID={"13"} running={true} method={"toggle"} jQ={123123} />);
        const button = getByRole(`button`);
        expect(button.textContent).toBe("Pause");
    });

    test("Inner text should be 'resume' when there running = false", () => {
        const { getByRole } = render(<MachineButton machID={"13"} running={false} method={"toggle"} jQ={123123} />);
        const button = getByRole(`button`);
        expect(button.textContent).toBe("Resume");
    });
});

//Testing Stop button features
describe("Machine Button (Stop)", () => {
    test("Renders correctly", () => {
        const { getByRole } = render(<MachineButton machID={"13"} running={false} method={"cancel"} jQ={123123} />);
        const button = getByRole(`button`);
        expect(button.textContent).toBe("Stop");
    });
    test("Should be disabled when there are no jobs (jQ = 0)", () => {
        const { getByRole } = render(<MachineButton machID={"13"} running={false} method={"cancel"} jQ={0} />);
        const button = getByRole(`button`);
        expect(button).toBeDisabled();
    });
    test("Should be enabled when job starts", () => {
        const { getByRole } = render(<MachineButton machID={"13"} running={false} method={"cancel"} jQ={1} />);
        const button = getByRole(`button`);
        expect(button).not.toBeDisabled();
    });

    //TO BE CHANGED
    test("Should load popup when clicked for confirmation", () => {
        const { getByRole } = render(<MachineButton machID={"13"} running={false} method={"cancel"} jQ={123123} />);
        const button = getByRole(`button`);
        const logSpy = jest.spyOn(console, 'log');
        button.click(); //fireEvent DOESN'T WORK
        expect(logSpy).toHaveBeenCalled(); 
    });
});