import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useUpdateEvent from '../../hooks/useUpdateEvent';
import EventDetailsForm from './EventDetailsForm';
import AddressForm from './AddressForm';
import FixedPriceTab from './FixedPriceTab';
import TicketPoolsManager from './TicketPoolsManager';

const EventEditForm = ({ eventDetails, fetchEventDetails }) => {
    const { t } = useTranslation();
    const { updateEvent, updating, updateError } = useUpdateEvent();
    const [formData, setFormData] = useState(eventDetails || {});

    // Обновляем состояние формы при изменении `eventDetails`
    useEffect(() => {
        setFormData(eventDetails ? { ...eventDetails, eventImage: eventDetails.eventImage || "" } : {});
    }, [eventDetails]);

    // Универсальный обработчик изменений
    const handleChange = (field, value, nestedField = null) => {
        setFormData((prev) => {
            if (nestedField) {
                return {
                    ...prev,
                    [field]: {
                        ...prev[field],
                        [nestedField]: value
                    }
                };
            }
            return { ...prev, [field]: value };
        });
    };

    const handleSave = async () => {
        let cleanData = { ...formData };
        
        if (cleanData.hasOwnProperty('stripeStatistics')) {
            delete cleanData.stripeStatistics;
        }

        if (!cleanData.pricing?.hasOwnProperty('activeTab')) {
            cleanData.pricing.activeTab = cleanData.pricing?.ticketPools?.length > 0 ? 1 : 0;
        }
    
        if (!Array.isArray(cleanData.pricing.ticketPools)) {
            cleanData.pricing.ticketPools = [];
        }
            
        console.log("📤 Отправка данных:", cleanData);
    
        const success = await updateEvent(cleanData);
        if (success) {
            alert(t('eventEditForm.success'));
            fetchEventDetails(cleanData._id);
        }
    };
    

    return (
        <Box>
            <Typography variant="h6">{t('eventEditForm.generalInfo')}</Typography>

            {/* Используем компонент EventDetailsForm */}
            <EventDetailsForm
                title={formData.title}
                setTitle={(value) => handleChange('title', value)}
                description={formData.description}
                setDescription={(value) => handleChange('description', value)}
                eventDate={formData.eventDate ? formData.eventDate.split('T')[0] : ''}
                setEventDate={(value) => handleChange('eventDate', value)}
                startTime={formData.startTime}
                setStartTime={(value) => handleChange('startTime', value)}
                eventImage={formData.eventImage || ''}
                setEventImage={(value) => handleChange('eventImage', value || "")}
                ageRestriction={formData.ageRestriction}
                setAgeRestriction={(value) => handleChange('ageRestriction', value)}
                eventType={formData.eventType}
                setEventType={(value) => handleChange('eventType', value)}
            />

            <Typography variant="h6" sx={{ mt: 3 }}>{t('eventEditForm.address')}</Typography>

            {/* Используем компонент AddressForm */}
            <AddressForm
                address={formData.address || {}}
                onChange={(updatedAddress) => handleChange('address', updatedAddress)}
            />

            <Typography variant="h6" sx={{ mt: 3 }}>{t('eventEditForm.pricing')}</Typography>

            {formData.pricing?.ticketPrice !== undefined ? (
                <FixedPriceTab
                    ticketPrice={formData.pricing?.ticketPrice}
                    setTicketPrice={(value) => handleChange('pricing', value, 'ticketPrice')}
                    limitTickets={formData.pricing?.limitTickets}
                    setLimitTickets={(value) => handleChange('pricing', value, 'limitTickets')}
                    ticketLimit={formData.pricing?.ticketLimit}
                    setTicketLimit={(value) => handleChange('pricing', value, 'ticketLimit')}
                />
            ) : (
                <TicketPoolsManager
                    pools={formData.pricing?.ticketPools || []}
                    setPools={(newPools) => handleChange('pricing', newPools, 'ticketPools')}
                />
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button variant="contained" color="primary" onClick={handleSave} disabled={updating}>
                    {updating ? t('eventEditForm.saving') : t('eventEditForm.saveButton')}
                </Button>
            </Box>

            {updateError && <Typography color="error">{t('eventEditForm.error', { error: updateError })}</Typography>}
        </Box>
    );
};

export default EventEditForm;
