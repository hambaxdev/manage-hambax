import React from 'react';
import { Container, Typography, Box, Grid, CircularProgress } from '@mui/material';
import StatCard from '../../externals/dashboard/components/StatCard';
import { useTranslation } from 'react-i18next';

const EventStatistics = ({ eventDetails }) => {
    const { t } = useTranslation();

    if (!eventDetails || !eventDetails.stripeStatistics) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    const { stripeStatistics } = eventDetails;

    // 🔹 Моковые данные для трендов
    const totalRevenueData = [5, 8, 15, 12, 20, 30, 40, 35, 50, 55, 30, 40, 35, 50, 55];
    const totalTicketsData = [10, 20, 25, 30, 50, 65, 80, 90, 100, 120];
    const scannedTicketsData = [5, 10, 12, 15, 20, 22, 25, 30, 35, 40];

    return (
        <Container maxWidth="lg" sx={{ padding: { xs: 2, sm: 4 } }}>
            <Typography variant="h4" gutterBottom>
                {t('eventStatistics.title')}
            </Typography>

            {/* Основные метрики через StatCard */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <StatCard
                        title={t('eventStatistics.totalRevenue')}
                        value={`$${stripeStatistics.totalRevenue.toFixed(2)}`}
                        interval="Last 10 days"
                        trend="up"
                        data={totalRevenueData}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatCard
                        title={t('eventStatistics.totalTicketsSold')}
                        value={stripeStatistics.totalTicketsSold.toString()}
                        interval="Last 10 days"
                        trend="up"
                        data={totalTicketsData}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatCard
                        title={t('eventStatistics.scannedTickets')}
                        value="85" // Моковое значение
                        interval="Last 10 days"
                        trend="neutral"
                        data={scannedTicketsData}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default EventStatistics;
