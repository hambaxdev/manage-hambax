import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Хук для локализации
import useFetchUserEvents from '../../hooks/useFetchUserEvents';
import EventFilters from './EventFilters';

const UserEvents = () => {
    const { events, loading, error } = useFetchUserEvents();
    const navigate = useNavigate();
    const { t } = useTranslation(); // Используем локализацию

    const [filteredEvents, setFilteredEvents] = useState([]);

    useEffect(() => {
        setFilteredEvents(events);
    }, [events]);

    const handleFilterChange = ({ dateSortOrder, selectedCity, showPastEvents }) => {
        let filtered = [...events];

        // Сортировка по дате
        if (dateSortOrder === 'asc') {
            filtered.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
        } else if (dateSortOrder === 'desc') {
            filtered.sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));
        }

        // Фильтрация по городу
        if (selectedCity) {
            filtered = filtered.filter((event) => event.address.city === selectedCity);
        }

        // Показать/Скрыть прошедшие события
        if (!showPastEvents) {
            const currentDate = new Date();
            filtered = filtered.filter((event) => new Date(event.eventDate) >= currentDate);
        }

        setFilteredEvents(filtered);
    };

    return (
        <Box sx={{ width: '100%' }}>
            {/* Фильтры */}
            <EventFilters events={events} onFilterChange={handleFilterChange} />

            {/* Загрузка */}
            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            )}

            {/* Ошибка */}
            {error && (
                <Typography color="error" variant="body1" gutterBottom>
                    {t('userEvents.error', { error })}
                </Typography>
            )}

            {/* Список событий */}
            {!loading && !error && filteredEvents.length > 0 ? (
                <List>
                    {filteredEvents.map((event) => (
                        <ListItem key={event._id} button onClick={() => navigate(`/events/${event._id}`)}>
                            <ListItemText
                                primary={event.title}
                                secondary={`${t('userEvents.date')}: ${new Date(event.eventDate).toLocaleDateString()} | ${t(
                                    'userEvents.city'
                                )}: ${event.address.city}`}
                            />
                        </ListItem>
                    ))}
                </List>
            ) : (
                !loading &&
                !error && (
                    <Typography variant="body1" color="textSecondary">
                        {t('userEvents.noEvents')}
                    </Typography>
                )
            )}
        </Box>
    );
};

export default UserEvents;
