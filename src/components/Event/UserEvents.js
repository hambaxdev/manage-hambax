import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

    const handleFilterChange = useCallback(({ dateSortOrder, selectedCity, showPastEvents }) => {
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
    }, [events]);

    const handleConfirmDelete = useCallback(async () => {
        if (eventToDelete) {
            const success = await deleteEvent(eventToDelete);
            if (success) {
                // Refresh events from the server
                await fetchUserEvents();
            }
        }
        setEventToDelete(null);
    }, [eventToDelete, deleteEvent, fetchUserEvents]);

    const containerStyles = useMemo(() => ({ width: '100%' }), []);
    const loadingBoxStyles = useMemo(() => ({ display: 'flex', justifyContent: 'center', mt: 4 }), []);
    const eventsContainerStyles = useMemo(() => ({ display: 'flex', flexDirection: 'column', gap: 2, mt: 2, mb: 5 }), []);

    const handleSetEventToDelete = useCallback((id) => {
        setEventToDelete(id);
    }, []);

    return (
        <Box sx={containerStyles}>
            <EventFilters events={events} onFilterChange={handleFilterChange} />

            {loading && (
                <Box sx={loadingBoxStyles}>
                    <CircularProgress />
                </Box>
            )}

            {error && (
                <Typography color="error" variant="body1" gutterBottom>
                    {t('userEvents.error', { error })}
                </Typography>
            )}

            {!loading && !error && filteredEvents.length > 0 ? (
                <Box sx={eventsContainerStyles}>
                    {filteredEvents.map((event) => (
                        <UserEventCard
                            key={event._id}
                            event={event}
                            onDelete={handleSetEventToDelete}
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
