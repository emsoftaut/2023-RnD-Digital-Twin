import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

//color tokens
export const tokens = (mode) => ({
    ...(mode === 'dark'
        ? {
            primary: '#43a047',
            secondary: '#42a5f5',
            paper: '#121212',
        } : {
            primary: '#43a047',
            secondary: '#42a5f5',
            }),
});

export const themeSettings = (mode) => {
    const colors = tokens(mode);
    return {
        palette: {
            mode: mode,
            ...({
                primary: { main: colors.primary },
                secondary: { main: colors.secondary },
                background: {paper: colors.paper},
            }),
        },
        typography: {
            fontFamily: '"Raleway", "Roboto", "Arial", sans-serif',
        },
        props: {
        MuiList: {
            dense: true,
        },
        MuiMenuItem: {
            dense: true,
        },
        MuiTable: {
            size: 'small',
        },
        MuiButton: {
            size: 'small',
            },
            MuiButtonGroup: {
            size: 'small',
            },
        },
    };
};

export const ColorModeContext = createContext({
    toggleColorMode: () => { },
});

export const useMode = () => {
    const [mode, setMode] = useState("dark");

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === "light" ? "dark" : "light")),
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return [theme, colorMode];
};