import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

//color tokens
export const tokens = (mode) => ({
    ...(mode === 'dark'
        ? {
            grey: {
                100: "#e0e0e0",
                200: "#c2c2c2",
                300: "#a3a3a3",
                400: "#858585",
                500: "#666666",
                600: "#525252",
                700: "#3d3d3d",
                800: "#292929",
                900: "#141414",
            },
            blueAccent: {
                100: "#dff8fe",
                200: "#c0f0fd",
                300: "#a0e9fd",
                400: "#81e1fc",
                500: "#61dafb",
                600: "#4eaec9",
                700: "#3a8397",
                800: "#275764",
                900: "#132c32",
            },
            redAccent: {
                100: "#f7d4d8",
                200: "#efa8b1",
                300: "#e77d8b",
                400: "#df5164",
                500: "#d7263d",
                600: "#ac1e31",
                700: "#811725",
                800: "#560f18",
                900: "#2b080c",
            },
            greenAccent: {
                100: "#daf5e2",
                200: "#b4ecc4",
                300: "#8fe2a7",
                400: "#69d989",
                500: "#44cf6c",
                600: "#36a656",
                700: "#297c41",
                800: "#1b532b",
                900: "#0e2916",
            },
            primary: {
                100: "#d3d4dc",
                200: "#a7a9b8",
                300: "#7b7f95",
                400: "#4f5471",
                500: "#23294e",
                600: "#1c213e",
                700: "#15192f",
                800: "#0e101f",
                900: "#070810",
            },
            indigoAccent: {
                100: "#d0d1d5",
                200: "#a1a4ab",
                300: "#727681",
                400: "#434957",
                500: "#141b2d",
                600: "#101624",
                700: "#0c101b",
                800: "#080b12",
                900: "#040509",
            },

        } : {
            grey: {
                100: "#141414",
                200: "#292929",
                300: "#3d3d3d",
                400: "#525252",
                500: "#666666",
                600: "#858585",
                700: "#a3a3a3",
                800: "#c2c2c2",
                900: "#e0e0e0",
            },
            blueAccent: {
                100: "#132c32",
                200: "#275764",
                300: "#3a8397",
                400: "#4eaec9",
                500: "#61dafb",
                600: "#81e1fc",
                700: "#a0e9fd",
                800: "#c0f0fd",
                900: "#dff8fe",
            },
            redAccent: {
                100: "#2b080c",
                200: "#560f18",
                300: "#811725",
                400: "#ac1e31",
                500: "#d7263d",
                600: "#df5164",
                700: "#e77d8b",
                800: "#efa8b1",
                900: "#f7d4d8",
            },
            greenAccent: {
                100: "#0e2916",
                200: "#1b532b",
                300: "#297c41",
                400: "#36a656",
                500: "#44cf6c",
                600: "#69d989",
                700: "#8fe2a7",
                800: "#b4ecc4",
                900: "#daf5e2",
            },
            primary: {
                100: "#070810",
                200: "#0e101f",
                300: "#15192f",
                400: "#1c213e",
                500: "#23294e",
                600: "#4f5471",
                700: "#7b7f95",
                800: "#a7a9b8",
                900: "#d3d4dc",
            },
            indigoAccent: {
                100: "#040509",
                200: "#080b12",
                300: "#0c101b",
                400: "#101624",
                500: "#141b2d",
                600: "#434957",
                700: "#727681",
                800: "#a1a4ab",
                900: "#d0d1d5",
            },
        }),
});

export const themeSettings = (mode) => {
    const colors = tokens(mode);
    return {
        palette: {
            mode: mode,
            ...(mode === "dark" ?
                {
                    primary: {
                        main: colors.primary[100],
                    },
                    secondary: {
                        main: colors.blueAccent[500],
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100],
                    },
                    background: {
                        default: colors.primary[500],
                    }
                } : {
                    primary: {
                        main: colors.primary[500],
                    },
                    secondary: {
                        main: colors.blueAccent[500],
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100],
                    },
                    background: {
                        default: "fcfcfc",
                    },
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