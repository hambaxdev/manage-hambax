import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ff5722',
        },
        secondary: {
            main: '#535bb2',
        },
        text: {
            primary: '#000000',
            secondary: '#555555',
        },
        background: {
            card: '#f0f0f5',
        },
    },
    typography: {
        fontFamily: '"Oswald", "Arial", "Roboto", "sans-serif"',
        h1: { color: '#ff5722', fontWeight: 'bold' },
        h2: { color: '#ff5722', fontWeight: 'bold' },
        h3: { color: '#ff5722', fontWeight: 'bold' },
        h4: { color: '#ff5722', fontWeight: 'bold' },
        h5: { color: '#ff5722', fontWeight: 'bold' },
        h6: { color: '#ff5722', fontWeight: 'bold' },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    padding: '16px',
                },
            },
        },
    },
});

export default theme;