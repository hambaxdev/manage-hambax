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
    const { t } = useTranslation();

    return (
        <Box>
            {/* Input for the event title */}
            <TextField
                fullWidth
                label={t('eventDetailsForm.titleLabel')}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
                required
            />
            
            {/* Selector for the event type */}
            <EventTypeSelector
                eventType={eventType}
                setEventType={setEventType}
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
            />
        </Box>
    );
};

export default EventDetailsForm;