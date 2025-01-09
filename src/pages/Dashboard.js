// src/pages/Dashboard.js
import React from 'react';
import { Typography, Container } from '@mui/material';

const Dashboard = () => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Admin Dashboard
            </Typography>
            <Typography>
                Добро пожаловать в панель управления!
            </Typography>
        </Container>
    );
};

export default Dashboard;
