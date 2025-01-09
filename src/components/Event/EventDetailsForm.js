import React from 'react';
import { TextField, Box, Typography } from '@mui/material';
import EventTypeSelector from './EventTypeSelector';
import AgeRestrictionSelector from './AgeRestrictionSelector';
import EventImageSelector from './EventImageSelector';

const EventDetailsForm = ({
    title,
    setTitle,
    description,
    setDescription,
    clubName,
    setClubName,
    eventDate,
    setEventDate,
    startTime,
    setStartTime,
    eventImage,
    setEventImage,
    ageRestriction,
    setAgeRestriction,
    eventType,
    setEventType,
}) => {
    return (
        <Box>
            <TextField
                fullWidth
                label="Название"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
                required
            />
            <EventTypeSelector
                    eventType={eventType}
                    setEventType={setEventType}
                />
            <TextField
                fullWidth
                label="Описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                margin="normal"
                multiline
                rows={4}
                required
            />
            <TextField
                fullWidth
                label="Название клуба"
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
                margin="normal"
                required
            />
            <TextField
                fullWidth
                type="date"
                label="Дата мероприятия"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
            />
            <TextField
                fullWidth
                type="time"
                label="Время начала"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
            />
            <EventImageSelector
                eventImage={eventImage}
                setEventImage={setEventImage}
            />
            <AgeRestrictionSelector
                ageRestriction={ageRestriction}
                setAgeRestriction={setAgeRestriction}
            />

        </Box>
    );
};

export default EventDetailsForm;
