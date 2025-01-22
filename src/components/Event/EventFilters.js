import React, { useState } from 'react';
import { Box, MenuItem, Select, FormControl, InputLabel, Switch, FormControlLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';

const EventFilters = ({ events, onFilterChange }) => {
    const { t } = useTranslation();
    const [dateSortOrder, setDateSortOrder] = useState('asc');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedEventType, setSelectedEventType] = useState('');
    const [showPastEvents, setShowPastEvents] = useState(false);

    const uniqueCities = [...new Set(events.map((event) => event.address.city))];
    const uniqueEventTypes = [...new Set(events.map((event) => event.eventType))];

    const handleDateSortChange = (event) => {
        const order = event.target.value;
        setDateSortOrder(order);
        onFilterChange({ dateSortOrder: order, selectedCity, selectedEventType, showPastEvents });
    };

    const handleCityChange = (event) => {
        const city = event.target.value;
        setSelectedCity(city);
        onFilterChange({ dateSortOrder, selectedCity: city, selectedEventType, showPastEvents });
    };

    const handleEventTypeChange = (event) => {
        const eventType = event.target.value;
        setSelectedEventType(eventType);
        onFilterChange({ dateSortOrder, selectedCity, selectedEventType: eventType, showPastEvents });
    };

    const handleShowPastEventsToggle = () => {
        const toggle = !showPastEvents;
        setShowPastEvents(toggle);
        onFilterChange({ dateSortOrder, selectedCity, selectedEventType, showPastEvents: toggle });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                mt: 4,
                mb: 4,
                width: '100%',
                flexWrap: 'wrap',
            }}
        >
            {/* Сортировка по дате */}
            <FormControl
                sx={{
                    minWidth: 200,
                    flex: 1,
                    '@media (max-width:600px)': {
                        minWidth: '100%',
                    },
                }}
            >
                <InputLabel id="date-sort-label">{t('filters.dateSort')}</InputLabel>
                <Select
                    labelId="date-sort-label"
                    value={dateSortOrder}
                    onChange={handleDateSortChange}
                >
                    <MenuItem value="asc">{t('filters.dateAscending')}</MenuItem>
                    <MenuItem value="desc">{t('filters.dateDescending')}</MenuItem>
                </Select>
            </FormControl>

            {/* Фильтр по городам */}
            <FormControl
                sx={{
                    minWidth: 200,
                    flex: 1,
                    '@media (max-width:600px)': {
                        minWidth: '100%',
                    },
                }}
            >
                <InputLabel id="city-filter-label">{t('filters.cityFilter')}</InputLabel>
                <Select
                    labelId="city-filter-label"
                    value={selectedCity}
                    onChange={handleCityChange}
                >
                    <MenuItem value="">{t('filters.allCities')}</MenuItem>
                    {uniqueCities.map((city) => (
                        <MenuItem key={city} value={city}>
                            {city}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Фильтр по типу мероприятия */}
            <FormControl
                sx={{
                    minWidth: 200,
                    flex: 1,
                    '@media (max-width:600px)': {
                        minWidth: '100%',
                    },
                }}
            >
                <InputLabel id="event-type-filter-label">{t('filters.eventTypeFilter')}</InputLabel>
                <Select
                    labelId="event-type-filter-label"
                    value={selectedEventType}
                    onChange={handleEventTypeChange}
                >
                    <MenuItem value="">{t('filters.allEventTypes')}</MenuItem>
                    {uniqueEventTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControlLabel
                control={
                    <Switch
                        checked={showPastEvents}
                        onChange={handleShowPastEventsToggle}
                        color="primary"
                    />
                }
                label={t('filters.showPastEvents')}
                sx={{
                    whiteSpace: 'nowrap',
                    flex: 1,
                    '@media (max-width:600px)': {
                        width: '100%',
                        justifyContent: 'space-between',
                    },
                }}
            />
        </Box>
    );
};

export default EventFilters;
