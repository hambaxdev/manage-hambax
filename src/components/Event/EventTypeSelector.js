// src/components/EventTypeSelector.js
import React from 'react';
import { Box, Typography, Card, CardActionArea } from '@mui/material';
import CelebrationIcon from '@mui/icons-material/Celebration';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const eventTypes = [
    { type: 'party', label: 'Вечеринка', Icon: CelebrationIcon },
    { type: 'club', label: 'Клубное шоу', Icon: NightlifeIcon },
    { type: 'concert', label: 'Концерт', Icon: MusicNoteIcon },
];

const EventTypeSelector = ({ eventType, setEventType }) => {
    const handleSelect = (type) => {
        // Если текущий тип уже выбран, то сбрасываем выбор
        setEventType(type === eventType ? '' : type);
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Тип мероприятия
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
                Выберите тип мероприятия
            </Typography>
            <Box
                display="flex"
                gap={2}
                flexWrap="wrap"
                justifyContent={{ xs: 'center', sm: 'space-between' }}
                sx={{
                    flexDirection: { xs: 'column', sm: 'row' },
                }}
            >
                {eventTypes.map(({ type, label, Icon }) => (
                    <Card
                        key={type}
                        sx={{
                            flex: { xs: '1 1 100%', sm: '1 1 calc(33.333% - 16px)' },
                            border: eventType === type ? '2px solidrgb(255, 255, 255)' : '1px solid #e0e0e0',
                            backgroundColor: eventType === type ? '#e28743' : 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            height: 150,
                            padding: 2,
                            transition: 'all 0.3s ease',
                        }}
                        onClick={() => handleSelect(type)}
                    >
                        <CardActionArea sx={{ width: '100%', height: '100%' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexGrow: 1,
                                    color: eventType === type ? '#e0e0e0' : 'inherit',
                                }}
                            >
                                <Icon sx={{ fontSize: 50 }} />
                            </Box>
                            <Typography
                                variant="subtitle1"
                                align="center"
                                sx={{
                                    marginTop: 2,
                                    color: eventType === type ? '#e0e0e0' : 'inherit',
                                    fontWeight: eventType === type ? 'bold' : 'normal',
                                }}
                            >
                                {label}
                            </Typography>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default EventTypeSelector;
