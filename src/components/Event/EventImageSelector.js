import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, Card, CardMedia } from '@mui/material';
import { useTranslation } from 'react-i18next';

const EventImageSelector = ({ eventImage, setEventImage }) => {
    const fileInputRef = useRef(null);
    const { t } = useTranslation();
    const [previewURL, setPreviewURL] = useState(null);

    // Функция выбора файла
    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log("✅ Выбранное изображение:", file);
            setEventImage(file); 
        }
    };

    // ✅ Обновленный useEffect с поддержкой URL
    useEffect(() => {
        console.log("📷 eventImage:", eventImage);

        if (typeof eventImage === 'string') {
            // Если eventImage - это URL (строка), используем его напрямую
            setPreviewURL(eventImage);
        } else if (eventImage instanceof Blob || eventImage instanceof File) {
            // Если это File или Blob, создаем objectURL
            const objectURL = URL.createObjectURL(eventImage);
            setPreviewURL(objectURL);

            return () => URL.revokeObjectURL(objectURL); // Освобождаем память
        } else {
            setPreviewURL(null);
        }
    }, [eventImage]);

    return (
        <Box>
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                {t('eventImage.title')}
            </Typography>

            <Typography variant="body2" color="textSecondary" gutterBottom>
                {t('eventImage.helperText')}
            </Typography>

            <Card
                sx={{
                    width: '100%',
                    height: 200,
                    border: '1px solid #e0e0e0',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                }}
                onClick={() => fileInputRef.current.click()}
            >
                {previewURL ? (
                    <CardMedia
                        component="img"
                        image={previewURL}
                        alt={t('eventImage.altText')}
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                ) : (
                    <Typography variant="subtitle1" color="textSecondary">
                        {t('eventImage.placeholder')}
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
