// src/pages/Events.js
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Events = () => {
    const navigate = useNavigate();

    const handleCreateEvent = () => {
        navigate('/create-event');
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Список мероприятий
            </Typography>
            <Button variant="contained" color="primary" onClick={handleCreateEvent}>
                Добавить мероприятие
            </Button>

            {/* Здесь будет отображаться список мероприятий */}
        </Container>
    );
};

export default Events;