import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Events = () => {
    const navigate = useNavigate();
    const { t } = useTranslation(); // Hook for localization

    const handleCreateEvent = () => {
        navigate('/create-event'); // Navigate to the create event page
    };

    return (
        <Container>
            {/* Page title */}
            <Typography variant="h4" gutterBottom>
                {t('events.title')}
            </Typography>
            
            {/* Button to create a new event */}
            <Button variant="contained" color="primary" onClick={handleCreateEvent}>
                {t('events.createEventButton')}
            </Button>

            {/* Placeholder for the event list */}
        </Container>
    );
};

export default Events;
