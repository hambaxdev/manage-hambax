import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import StatCard from '../../externals/dashboard/components/StatCard';
import { useTranslation } from 'react-i18next';

const EventStatistics = () => {
    const { t } = useTranslation();

    // 🔹 Моковые данные
    const totalRevenueData = [5, 8, 15, 12, 20, 30, 40, 35, 50, 55, 30, 40, 35, 50, 55,5, 8, 15, 12, 20, 30, 40, 35, 50, 55, 30, 40, 35, 50, 55];
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
                        value={`$${(Math.random() * 1000).toFixed(2)}`}
                        interval={t('eventStatistics.lastTenDays')}
                        trend="up"
                        data={totalRevenueData}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatCard
                        title={t('eventStatistics.totalTicketsSold')}
                        value={Math.floor(Math.random() * 500).toString()}
                        interval={t('eventStatistics.lastTenDays')}
                        trend="up"
                        data={totalTicketsData}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatCard
                        title={t('eventStatistics.scannedTickets')}
                        value={Math.floor(Math.random() * 300).toString()}
                        interval={t('eventStatistics.lastTenDays')}
                        trend="neutral"
                        data={scannedTicketsData}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default EventStatistics;
