import React from 'react';
import { TextField, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import EventTypeSelector from './EventTypeSelector';
import AgeRestrictionSelector from './AgeRestrictionSelector';
import EventImageSelector from './EventImageSelector';

const EventDetailsForm = ({
    title,
    setTitle,
    description,
    setDescription,
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
    errors = {}, // Errors object for validation
}) => {
    const { t } = useTranslation();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
                fullWidth
                label={t('eventDetailsForm.titleLabel')}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
                required
                error={!!errors.title} // Display error if exists
                helperText={errors.title} // Display error message
                sx={{ mt: 3 }}
            />

            {/* Selector for the event type */}
            <EventTypeSelector
                eventType={eventType}
                setEventType={setEventType}
                error={errors.eventType} // Pass error to EventTypeSelector
            />

            {/* Input for the event description */}
            <TextField
                fullWidth
                label={t('eventDetailsForm.descriptionLabel')}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                margin="normal"
                multiline
                rows={4}
                required
                error={!!errors.description}
                helperText={errors.description}
                sx={{ mt: 3 }}
            />

            {/* Input for the event date */}
            <TextField
                fullWidth
                type="date"
                label={t('eventDetailsForm.dateLabel')}
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
                error={!!errors.eventDate}
                helperText={errors.eventDate}
            />

            {/* Input for the event start time */}
            <TextField
                fullWidth
                type="time"
                label={t('eventDetailsForm.timeLabel')}
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
                error={!!errors.startTime}
                helperText={errors.startTime}
            />

            {/* Component for selecting an event image */}
            <EventImageSelector
                eventImage={eventImage}
                setEventImage={setEventImage}
            />

            {/* Component for selecting age restriction */}
            <AgeRestrictionSelector
                ageRestriction={ageRestriction}
                setAgeRestriction={setAgeRestriction}
                error={errors.ageRestriction}
            />
        </Box>
    );
};

export default EventDetailsForm;