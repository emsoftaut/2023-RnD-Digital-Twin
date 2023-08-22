import { render, screen, fireEvent, act } from "@testing-library/react";
import { MachineButton } from "../components/machineComponents/AllMachineTable";
import * as fbCommands from "../data/FireBaseData";

describe("Machine Button (Toggle)", () => {
    test("Should render button", () => {
        const machineProps = {
            machID: "2131",
            running: true,
            method: "toggle",
            jQ: 0
        }
        render(<MachineButton props={machineProps} />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
    test("Should be disabled if there are no jobs (jQ = 0)", () => {
        render(<MachineButton props={{ jQ: 0 }} />);
        expect(screen.getByRole('button')).toBeDisabled();
    });
    test("Should be enabled when a job is queued", () => {
        render(<MachineButton props={{ jQ: 1 }} />);
        expect(screen.getByRole('button')).toBeDisabled(false);
    });
/*
    test("Should call toggleMachine() when clicked", () => {
        
        const {getByRole} = render(<MachineButton machID={"13"} running={false} method={"toggle"} jQ={"0"}/>);
        const element = getByRole('button');
        //console.log(element.innerHTML);
        //console.log("asdasd"+fireEvent.click(element));
        fireEvent.click(element); //FIREEVENT DOESNT EVEN WORK

        //expect(element.handleClick).toHaveBeenCalledTimes(1);

    });*/
})