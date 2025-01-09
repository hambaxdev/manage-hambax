import React from 'react';
import { Box, Typography, Card, CardActionArea, CardMedia } from '@mui/material';

const ageRestrictions = [
    { value: 16, label: '16+', image: '/assets/ageRestrictions/age-restriction-16.png' },
    { value: 18, label: '18+', image: '/assets/ageRestrictions/age-restriction-18.png' },
    { value: 21, label: '21+', image: '/assets/ageRestrictions/age-restriction-21.png' },
];

const AgeRestrictionSelector = ({ ageRestriction, setAgeRestriction }) => {
    const handleSelect = (value) => {
        // Если текущий возраст уже выбран, сбрасываем выбор
        setAgeRestriction(value === ageRestriction ? '' : value);
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Возрастное ограничение
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
                Выберите возрастное ограничение для мероприятия
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
                {ageRestrictions.map(({ value, label, image }) => (
                    <Card
                        key={value}
                        sx={{
                            flex: { xs: '1 1 100%', sm: '1 1 calc(33.333% - 16px)' },
                            border: ageRestriction === value ? '2px solidrgb(0, 0, 0)' : '1px solid #e0e0e0',
                            backgroundColor: ageRestriction === value ? '#e28743' : 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            height: 200,
                            padding: 2,
                            transition: 'all 0.3s ease',
                        }}
                        onClick={() => handleSelect(value)}
                    >
                        <CardActionArea sx={{ width: '100%', height: '100%' }}>
                            <CardMedia
                                component="img"
                                alt={label}
                                image={image}
                                sx={{
                                    height: 120,
                                    objectFit: 'contain',
                                    margin: 'auto',
                                }}
                            />
                            <Typography
                                variant="subtitle1"
                                align="center"
                                sx={{
                                    marginTop: 2,
                                    color: ageRestriction === value ? '#e0e0e0' : 'inherit',
                                    fontWeight: ageRestriction === value ? 'bold' : 'normal',
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

export default AgeRestrictionSelector;
