import React from 'react';
import { Box, Typography, Card, CardActionArea, FormHelperText } from '@mui/material';
import CelebrationIcon from '@mui/icons-material/Celebration';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { useTranslation } from 'react-i18next';

const eventTypes = [
    { type: 'party', labelKey: 'eventType.party', Icon: CelebrationIcon },
    { type: 'club', labelKey: 'eventType.club', Icon: NightlifeIcon },
    { type: 'concert', labelKey: 'eventType.concert', Icon: MusicNoteIcon },
];

const EventTypeSelector = ({ eventType, setEventType, error }) => {
    const { t } = useTranslation('event');

    const handleSelect = (type) => {
        // Deselect if the same type is clicked
        setEventType(type === eventType ? '' : type);
    };

    return (
        <Box>
            {/* Section title */}
            <Typography variant="h6" gutterBottom>
                {t('eventType.title')}
            </Typography>

            {/* Helper text */}
            <Typography variant="body2" color="textSecondary" gutterBottom>
                {t('eventType.helperText')}
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
                {eventTypes.map(({ type, labelKey, Icon }) => (
                    <Card
                        key={type}
                        sx={{
                            flex: { xs: '1 1 100%', sm: '1 1 calc(33.333% - 16px)' },
                            border: eventType === type ? '2px solidrgb(255, 255, 255)' : '1px solid #e0e0e0',
                            backgroundColor: eventType === type ? '#ff5722' : 'white',
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
                                {t(labelKey)}
                            </Typography>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
            {error && <FormHelperText error>{error}</FormHelperText>}
        </Box>
    );
};

export default EventTypeSelector;
