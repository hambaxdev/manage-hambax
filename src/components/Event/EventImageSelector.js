import React, { useRef } from 'react';
import { Box, Typography, Card, CardActionArea, CardMedia } from '@mui/material';

const EventImageSelector = ({ eventImage, setEventImage }) => {
    const fileInputRef = useRef(null);

    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setEventImage(e.target.result); // Устанавливаем изображение в формате Base64
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Изображение мероприятия
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
                Нажмите, чтобы выбрать изображение для мероприятия
            </Typography>
            <Card
                sx={{
                    width: '100%',
                    height: 200,
                    border: '1px solid #e0e0e0',
                    backgroundColor: '#f5f5f5',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                }}
                onClick={() => fileInputRef.current.click()}
            >
                {eventImage ? (
                    <CardMedia
                        component="img"
                        image={eventImage}
                        alt="Изображение мероприятия"
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                ) : (
                    <Typography variant="subtitle1" color="textSecondary">
                        Нажмите для выбора изображения
                    </Typography>
                )}
            </Card>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageSelect}
            />
        </Box>
    );
};

export default EventImageSelector;
