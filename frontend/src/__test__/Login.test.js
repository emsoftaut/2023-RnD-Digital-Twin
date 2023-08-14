import { render } from "@testing-library/react";
import Login from "../components/Login";

it("Renders without crashing", () => {
	render(<Login />);
});

it("Accepts Correct Login", () => {});
