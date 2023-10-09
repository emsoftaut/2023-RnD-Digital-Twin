import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

//https://mui.com/material-ui/customization/default-theme/?expand-path=$.palette

//color tokens
export const tokens = (mode) => ({
    ...(mode === 'dark'
        ? {
            primary: '#77C2FF',
            secondary: '#6FDCA0',
            background: '#303030',
            paper: '#1e1e1e',
        } : {
            primary: '#008CFF',
            secondary: '#00A047',
            background: '#eeeeee',
            paper: '#fff',
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
                background: {
                    default: colors.background,
                    paper: colors.paper
                }
            }),
        },
        typography: {
            fontFamily: '"Raleway", "Roboto", "Arial", sans-serif',
            fontWeight: 500
        },
        components: {
            MuiButton: {
                defaultProps: {
                    disableElevation: true,
                },
            },
            MuiList: {
                dense: true,
            },
            MuiMenuItem: {
                dense: true,
            },
            MuiTable: {
                size: 'small',
            },
            MuiButtonGroup: {
                size: 'small',
            },
            root: {
                "& .MuiPaper-root": {
                  backgroundImage: 'none'
                },
            }
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