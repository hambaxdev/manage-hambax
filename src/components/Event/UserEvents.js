import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    CircularProgress,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import useFetchUserEvents from '../../hooks/useFetchUserEvents';
import useDeleteEvent from '../../hooks/useDeleteEvent';
import EventFilters from './EventFilters';
import UserEventCard from './UserEventCard';
import DeleteEventDialog from './DeleteEventDialog';

const UserEvents = () => {
    const { events, loading, error, fetchUserEvents } = useFetchUserEvents();
    const { deleteEvent } = useDeleteEvent();
    const { t } = useTranslation();

    const [filteredEvents, setFilteredEvents] = useState([]);
    const [eventToDelete, setEventToDelete] = useState(null);

    useEffect(() => {
        setFilteredEvents(events);
    }, [events]);

    const handleFilterChange = ({ dateSortOrder, selectedCity, showPastEvents }) => {
        let filtered = [...events];

        if (dateSortOrder === 'asc') {
            filtered.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
        } else if (dateSortOrder === 'desc') {
            filtered.sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));
        }

        if (selectedCity) {
            filtered = filtered.filter((event) => event.address.city === selectedCity);
        }

        if (!showPastEvents) {
            const currentDate = new Date();
            filtered = filtered.filter((event) => new Date(event.eventDate) >= currentDate);
        }

        setFilteredEvents(filtered);
    };

    const handleConfirmDelete = async () => {
        if (eventToDelete) {
            const success = await deleteEvent(eventToDelete);
            if (success) {
                // Refresh events from the server
                await fetchUserEvents();
            }
        }
        setEventToDelete(null);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <EventFilters events={events} onFilterChange={handleFilterChange} />

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            )}

            {error && (
                <Typography color="error" variant="body1" gutterBottom>
                    {t('userEvents.error', { error })}
                </Typography>
            )}

            {!loading && !error && filteredEvents.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2, mb: 5 }}>
                    {filteredEvents.map((event) => (
                        <UserEventCard
                            key={event._id}
                            event={event}
                            onDelete={(id) => setEventToDelete(id)}
                        />
                    ))}
                </Box>
            ) : (
                !loading &&
                !error && (
                    <Typography variant="body1" color="textSecondary">
                        {t('userEvents.noEvents')}
                    </Typography>
                )
            )}

            <DeleteEventDialog
                open={!!eventToDelete}
                onClose={() => setEventToDelete(null)}
                onConfirm={handleConfirmDelete}
            />
        </Box>
    );
};

export default UserEvents;
