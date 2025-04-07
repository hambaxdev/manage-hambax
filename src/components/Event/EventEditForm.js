import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useUpdateEvent from '../../hooks/useUpdateEvent';
import EventDetailsForm from './EventDetailsForm';
import AddressForm from './AddressForm';
import FixedPriceTab from './FixedPriceTab';
import TicketPoolsTab from './TicketPoolsTab';
import PricingOptions from './PricingOptions';

const EventEditForm = ({ eventDetails, fetchEventDetails }) => {
    const { t } = useTranslation();
    const { updateEvent, updating, updateError } = useUpdateEvent();

    // Гарантируем, что formData.pricing и ticketPools всегда существуют
    const [formData, setFormData] = useState(() => ({
        ...eventDetails,
        eventImage: eventDetails?.eventImage || "",
        pricing: {
            ...eventDetails?.pricing,
            ticketPools: Array.isArray(eventDetails?.pricing?.ticketPools) ? eventDetails.pricing.ticketPools : [],
        },
    }));

    // Отдельный state для pools и useTicketPools, чтобы избежать проблем с ререндером
    const [pools, setPools] = useState(formData.pricing.ticketPools);
    const [useTicketPools, setUseTicketPools] = useState(pools.length > 0);

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            ...eventDetails,
            eventImage: eventDetails?.eventImage || "",
            pricing: {
                ...eventDetails?.pricing,
                ticketPools: Array.isArray(eventDetails?.pricing?.ticketPools) ? eventDetails.pricing.ticketPools : [],
            },
        }));

        // Обновляем pools и useTicketPools при изменении eventDetails
        setPools(Array.isArray(eventDetails?.pricing?.ticketPools) ? eventDetails.pricing.ticketPools : []);
        setUseTicketPools(eventDetails?.pricing?.ticketPools?.length > 0);
    }, [eventDetails]);

    const handleChange = (field, value, nestedField = null) => {
        setFormData((prev) => {
            if (nestedField) {
                return {
                    ...prev,
                    [field]: {
                        ...prev[field],
                        [nestedField]: value,
                    },
                };
            }
            return { ...prev, [field]: value };
        });
    };

    const handleSave = async () => {
        let cleanData = { ...formData, pricing: { ...formData.pricing, ticketPools: pools } };

        if (cleanData.hasOwnProperty('stripeStatistics')) {
            delete cleanData.stripeStatistics;
        }

        if (!cleanData.pricing?.hasOwnProperty('activeTab')) {
            cleanData.pricing.activeTab = useTicketPools ? 1 : 0;
        }

        console.log("📤 Отправка данных:", cleanData);

        const success = await updateEvent(cleanData);
        if (success) {
            fetchEventDetails(cleanData._id);
        }
    };

    return (
        <Box>
            <Card sx={{ mb: 3, p: 2 }}>
                <CardContent>
                    <Typography variant="h6">{t('eventEditForm.generalInfo')}</Typography>
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
                </CardContent>
            </Card>

            <Card sx={{ mb: 3, p: 2 }}>
                <CardContent>
                    <Typography variant="h6">{t('eventEditForm.address')}</Typography>
                    <AddressForm
                        address={formData.address || {}}
                        onChange={(updatedAddress) => handleChange('address', updatedAddress)}
                    />
                </CardContent>
            </Card>

            <Card sx={{ mb: 3, p: 2 }}>
                <CardContent>
                    <Typography variant="h6">{t('eventEditForm.pricing')}</Typography>
                    <PricingOptions
                        useTicketPools={useTicketPools}
                        setUseTicketPools={setUseTicketPools}
                        ticketPrice={formData.pricing?.ticketPrice}
                        setTicketPrice={(value) => handleChange('pricing', value, 'ticketPrice')}
                        limitTickets={formData.pricing?.limitTickets}
                        setLimitTickets={(value) => handleChange('pricing', value, 'limitTickets')}
                        ticketLimit={formData.pricing?.ticketLimit}
                        setTicketLimit={(value) => handleChange('pricing', value, 'ticketLimit')}
                        pools={pools}
                        setPools={setPools}
                        errors={{}} // Placeholder for error handling
                    />
                </CardContent>
            </Card>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleSave} disabled={updating}>
                    {updating ? t('eventEditForm.saving') : t('eventEditForm.saveButton')}
                </Button>
            </Box>

            {updateError && (
                <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
                    {t('eventEditForm.error', { error: updateError })}
                </Typography>
            )}
        </Box>
    );
};

export default EventEditForm;
