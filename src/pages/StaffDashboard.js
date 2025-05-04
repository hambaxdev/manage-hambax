// src/pages/StaffDashboard.js
import React from 'react';
import { Typography, Box, Grid, CircularProgress, Container } from '@mui/material';
import useStaffDashboardData from '../hooks/useStaffDashboardData';
import DynamicCard from '../components/DynamicCard';

const StaffDashboard = () => {
    const { cards, loading } = useStaffDashboardData();

    return (
        <Container>
            <Box>
                <Typography variant="h4" gutterBottom>Scanner Dashboard</Typography>
                <Typography variant="subtitle1" gutterBottom>Welcome! You can now scan tickets.</Typography>

                {loading ? (
                    <CircularProgress />
                ) : (
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        {cards.map((card, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <DynamicCard card={card} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Container>
    );
};

export default StaffDashboard;
