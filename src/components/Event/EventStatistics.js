import React from 'react';
import {
    Container,
    Typography,
    Grid,
    Button,
    Box,
    CircularProgress,
    Alert,
    Paper,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useEventStatistics from '../../hooks/useEventStatistics';

const StatBox = ({ title, value }) => (
    <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', height: '100%' }}>
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            height="100%"
        >
            <Box sx={{ minHeight: 48, display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1" color="textSecondary" align="center">
                    {title}
                </Typography>
            </Box>
            <Typography
                variant="h4"
                fontWeight="bold"
                color="primary"
                sx={{ mt: 2 }}
            >
                {value}
            </Typography>
        </Box>
    </Paper>
);


const EventStatistics = ({ eventDetails }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const eventId = eventDetails?._id;
    const { stats, loading, error } = useEventStatistics(eventId);

    const handleCreateTicket = () => {
        navigate(`/events/${eventId}/create-ticket`, {
            state: { eventDetails },
        });
    };

    // Расчёт сканированных билетов и процента
    const scanned = stats?.scannedTickets || 0;
    const total = stats
        ? Object.values(stats.ticketsByPrice).reduce((acc, count) => acc + count, 0)
        : 0;
    const scannedPercent = total > 0 ? Math.round((scanned / total) * 100) : 0;
    const scannedDisplay = `${scanned} / ${total} (${scannedPercent}%)`;

    return (
        <Container maxWidth="lg" sx={{ padding: { xs: 2, sm: 4 } }}>
            <Box
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                gap={2}
                mb={3}
            >
                <Typography variant="h4">{t('eventStatistics.title')}</Typography>
                <Button variant="contained" onClick={handleCreateTicket} disabled={!eventId}>
                    {t('eventStatistics.createTicket')}
                </Button>
            </Box>

            {!eventId && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                    {t('eventStatistics.eventNotLoaded')}
                </Alert>
            )}

            {loading && (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            )}

            {error && (
                <Box mt={2}>
                    <Alert severity="error">{error}</Alert>
                </Box>
            )}

            {stats && (
                <Grid container spacing={3}>
                    {/* 💰 Общая выручка */}
                    <Grid item xs={12} sm={6} md={3}>
                        <StatBox
                            title={t('eventStatistics.totalRevenue')}
                            value={`€${stats.totalRevenue.toFixed(2)}`}
                        />
                    </Grid>

                    {/* 🎟 Всего билетов */}
                    <Grid item xs={12} sm={6} md={3}>
                        <StatBox
                            title={t('eventStatistics.totalTickets')}
                            value={total.toString()}
                        />
                    </Grid>

                    {/* 🆓 Сгенерировано бесплатно */}
                    <Grid item xs={12} sm={6} md={3}>
                        <StatBox
                            title={t('eventStatistics.generatedFree')}
                            value={stats.ticketsByPrice['0']?.toString() || '0'}
                        />
                    </Grid>

                    {/* ✅ Отсканировано */}
                    <Grid item xs={12} sm={6} md={3}>
                        <StatBox
                            title={t('eventStatistics.scannedTickets')}
                            value={scannedDisplay}
                        />
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};

export default EventStatistics;
