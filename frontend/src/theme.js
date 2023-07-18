import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

//color tokens
export const tokens = (mode) => ({
    ...(mode === 'dark'
        ? {
            primary: {
                100: "#83D8FD",
                200: "#0090D8",
            },
            secondary: {
                100: "#00D8B4",
                200: "#00D8B4",
            },
            surface: {
                100: "#d6d6d6",
                200: "#adadad",
                300: "#848484",
                400: "#5b5b5b",
                500: "#323232",
                600: "#282828",
                700: "#1e1e1e",
                800: "#141414",
                900: "#0a0a0a",
            },
            background: "#121212",
            error: "#ED706A",
            onPrimary: "#FFFFFF",
            onSecondary: "#FFFFFF",
            onBackground: "#FFFFFF",
            onSurface: {
                100: "#FFFFFF",
                200: "#83D8FD",
            },
            onError: "#FFFFFF",
        } : {
            primary: {
                100: "#0090D8",
                200: "#83D8FD",
            },
            secondary: {
                100: "#00B183",
                200: "#00D8B4",
            },
            surface: {
                100: "#e6f7ff",
                200: "#cdeffe",
                300: "#0090D8",
                400: "#9ce0fd",
                500: "#83d8fd",
                600: "#57c0f1",
                700: "#0090D8",
                800: "#345665",
                900: "#1a2b33"
            },
            background: "#FFFFFF",
            error: "#DD1F1C",
            onPrimary: "#FFFFFF",
            onSecondary: "#000000",
            onBackground: "#000000",
            onSurface: {
                100: "#FFFFFF",
                200: "#000000",
            },
            onError: "#FFFFFF",
        }),
});

export const themeSettings = (mode) => {
    const colors = tokens(mode);
    return {
        palette: {
            mode: mode,
            ...({
                primary: { main: colors.primary[100] },
                secondary: { main: colors.secondary[100] },
                background: { default: colors.background },
                surface: colors.surface[500],
                error: { main: colors.error },
                onPrimary: colors.onPrimary,
                onSecondary: colors.onSecondary,
                onBackground: colors.onBackground,
                onSurface: colors.onSurface[100],
                onError: colors.onError,
            }),
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