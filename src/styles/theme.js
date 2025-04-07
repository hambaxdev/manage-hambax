import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#f3bf6b',
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
        h1: { color: '#f3bf6b', fontWeight: 'bold' },
        h2: { color: '#f3bf6b', fontWeight: 'bold' },
        h3: { color: '#f3bf6b', fontWeight: 'bold' },
        h4: { color: '#f3bf6b', fontWeight: 'bold' },
        h5: { color: '#f3bf6b', fontWeight: 'bold' },
        h6: { color: '#f3bf6b', fontWeight: 'bold' },
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