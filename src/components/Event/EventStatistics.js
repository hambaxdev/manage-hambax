import React from 'react';
import { Container, Typography, Box, CircularProgress, Grid, Paper } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
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

    // 🔹 Формируем данные для графика (примерная имитация продаж)
    const salesData = [
        { date: "18.01", revenue: 0 },
        { date: "19.01", revenue: 21.6 },
        { date: "20.01", revenue: 45.8 },
        { date: "21.01", revenue: 30.0 },
        { date: "22.01", revenue: 60.5 },
        { date: "23.01", revenue: 25.2 },
        { date: "24.01", revenue: 50.8 },
        { date: "25.01", revenue: 0 }
    ];

    return (
        <Container maxWidth="lg" sx={{ padding: { xs: 2, sm: 4 } }}>
            <Typography variant="h4" gutterBottom>
                {t('eventStatistics.title')}
            </Typography>

            {/* Основные метрики */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ padding: 2 }}>
                        <Typography variant="h6">{t('eventStatistics.totalRevenue')}</Typography>
                        <Typography variant="h4">${stripeStatistics.totalRevenue.toFixed(2)}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ padding: 2 }}>
                        <Typography variant="h6">{t('eventStatistics.totalTicketsSold')}</Typography>
                        <Typography variant="h4">{stripeStatistics.totalTicketsSold}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ padding: 2 }}>
                        <Typography variant="h6">{t('eventStatistics.averageTicketPrice')}</Typography>
                        <Typography variant="h4">${stripeStatistics.averageTicketPrice.toFixed(2)}</Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* График продаж по дням */}
            <Box mt={4}>
                <Typography variant="h5" gutterBottom>
                    {t('eventStatistics.salesOverTime')}
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={salesData}>
                        <XAxis dataKey="date" stroke="#8884d8" />
                        <YAxis stroke="#8884d8" />
                        <Tooltip />
                        <Line type="monotone" dataKey="revenue" stroke="#0071bc" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </Box>
        </Container>
    );
};

export default EventStatistics;
