import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { ColorModeContext } from "../theme";
import Navbar from "../components/Navbar";
import { BrowserRouter as Router } from 'react-router-dom';
import AuthContext from '../components/AuthContext'

describe("<Navbar />", () => {

    const renderWithContexts = (isAdmin = false, colorMode = "light", user = null, showProps = false) => {
        const mockColorMode = {
            toggleColorMode: jest.fn()
        };

        const mockAuthContext = {
            isAdmin: isAdmin
        };

        return render(
            <Router>
                <AuthContext.Provider value={mockAuthContext}>
                    <ColorModeContext.Provider value={mockColorMode}>
                        <Navbar user={user} showProps={showProps} />
                    </ColorModeContext.Provider>
                </AuthContext.Provider>
            </Router>
        );
    }

    it("does not show the Admin Panel button when isAdmin is false or user is not provided", () => {
        renderWithContexts(false);
        expect(screen.queryByLabelText("Admin Panel")).not.toBeInTheDocument();

        renderWithContexts(true);
        expect(screen.queryByLabelText("Admin Panel")).not.toBeInTheDocument();
    });

    it("shows the light mode icon when theme is dark", () => {
      renderWithContexts(false, "dark");
      expect(screen.getByLabelText("Display Mode Toggle")).toBeInTheDocument();
  });
  
  it("shows the dark mode icon when theme is light", () => {
      renderWithContexts();
      expect(screen.getByLabelText("Display Mode Toggle")).toBeInTheDocument();
  });


    it("does not show profile button and popover when user is not provided or showProps is false", () => {
        renderWithContexts();
        expect(screen.queryByLabelText("Profile")).not.toBeInTheDocument();

        renderWithContexts(false, "light", { name: "John" });
        expect(screen.queryByLabelText("Profile")).not.toBeInTheDocument();
    });

});

