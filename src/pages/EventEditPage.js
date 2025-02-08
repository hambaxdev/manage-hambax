import React, { useState, useEffect } from 'react';
import { Container, Tabs, Tab, Typography, Box, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import EventEditForm from '../components/Event/EventEditForm';
import useFetchEventDetails from '../hooks/useFetchEventDetails';

const EventEditPage = () => {
    const { t } = useTranslation();
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
            <Container>
                <Typography color="error">{t('eventEditPage.error', { error })}</Typography>
                <Typography>
                    <a href="#" onClick={() => navigate(-1)}>
                        {t('eventEditPage.back')}
                    </a>
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ padding: { xs: 2, sm: 4 } }}>
            <Typography variant="h4" gutterBottom>
                {t('eventEditPage.title')}
            </Typography>

            <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth" sx={{ marginBottom: 2 }}>
                <Tab label={t('eventEditPage.statisticsTab')} />
                <Tab label={t('eventEditPage.editTab')} />
            </Tabs>

            <Box>
                {activeTab === 1 && (
                    <EventEditForm eventDetails={eventDetails} fetchEventDetails={fetchEventDetails} />
                )}
            </Box>
        </Container>
    );
};

export default EventEditPage;
