import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FF8C00',
        },
        secondary: {
            main: '#FFA500',
        },
        text: {
            primary: '#000000',
            secondary: '#555555',
        },
    },
    typography: {
        fontFamily: '"Oswald", "Arial", "Roboto", "sans-serif"',
        button: {
            textTransform: 'none',
            fontFamily: '"Oswald", "Arial", "sans-serif"',
        },
        h1: {
            fontFamily: '"Oswald", "Arial", "sans-serif"',
        },
        h2: {
            fontFamily: '"Oswald", "Arial", "sans-serif"',
        },
        h3: {
            fontFamily: '"Oswald", "Arial", "sans-serif"',
        },
        body1: {
            fontFamily: '"Oswald", "Arial", "sans-serif"',
        },
        body2: {
            fontFamily: '"Oswald", "Arial", "sans-serif"',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: '"Oswald", "Arial", "sans-serif"',
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                },
            },
        },
    },
});

export default theme;
