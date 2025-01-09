import React, { useRef } from 'react';
import { Box, Typography, Card, CardActionArea, CardMedia } from '@mui/material';
import { useTranslation } from 'react-i18next';

const EventImageSelector = ({ eventImage, setEventImage }) => {
    const fileInputRef = useRef(null);
    const { t } = useTranslation();

    // Handle image file selection and convert it to Base64 format
    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setEventImage(e.target.result); // Set the image in Base64 format
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box>
            {/* Section title */}
            <Typography variant="h6" gutterBottom>
                {t('eventImage.title')}
            </Typography>
            
            {/* Helper text */}
            <Typography variant="body2" color="textSecondary" gutterBottom>
                {t('eventImage.helperText')}
            </Typography>

            {/* Clickable card for selecting the image */}
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
                    // Display the selected image
                    <CardMedia
                        component="img"
                        image={eventImage}
                        alt={t('eventImage.altText')}
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                ) : (
                    // Placeholder text when no image is selected
                    <Typography variant="subtitle1" color="textSecondary">
                        {t('eventImage.placeholder')}
                    </Typography>
                )}
            </Card>

            {/* Hidden input for file selection */}
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