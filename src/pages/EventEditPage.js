import React, { useState, useEffect } from 'react';
import { Container, Tabs, Tab, Typography, Box, CircularProgress, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import EventEditForm from '../components/Event/EventEditForm';
import useFetchEventDetails from '../hooks/useFetchEventDetails';
import EventStatistics from '../components/Event/EventStatistics';

const EventEditPage = () => {
    const { t } = useTranslation('event');
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);
    const { eventDetails, loading, error, fetchEventDetails } = useFetchEventDetails();

    useEffect(() => {
        fetchEventDetails(id);
    }, [id, fetchEventDetails]);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
                <Typography color="error" variant="h6">{t('eventEditPage.error', { error })}</Typography>
                <Typography variant="body1" mt={2}>
                    <Button 
                        onClick={() => navigate(-1)} 
                        sx={{ textDecoration: 'none', color: '#1976d2', padding: 0, minWidth: 'auto' }}
                    >
                        {t('eventEditPage.back')}
                    </Button>
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ padding: { xs: 2, sm: 4 } }}>
            <Typography
                variant="h4"
                gutterBottom
                textAlign="center"
                sx={{ fontSize: { xs: '1.5rem', sm: '2.5rem' }, mb: { xs: 2, sm: 4 } }}
            >
                {t('eventEditPage.title')}
            </Typography>

            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
            >
                <Tab label={t('eventEditPage.statisticsTab')} sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }} />
                <Tab label={t('eventEditPage.editTab')} sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }} />
            </Tabs>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Box>
                    {activeTab === 0 && (
                        <EventStatistics eventDetails={eventDetails} />
                    )}
                    {activeTab === 1 && (
                        <EventEditForm eventDetails={eventDetails} fetchEventDetails={fetchEventDetails} />
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default EventEditPage;
