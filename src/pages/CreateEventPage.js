import React, { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import EventDetailsForm from '../components/Event/EventDetailsForm';
import AddressForm from '../components/Event/AddressForm';
import PricingOptions from '../components/Event/PricingOptions';
import EventStepper from '../components/Event/EventStepper';
import { validateEventDetails, validateAddress, validateFixedPrice, validateTicketPools } from '../utils/eventValidation';
import useSubmitEvent from '../hooks/useSubmitEvent';

const CreateEventPage = () => {
    const { t } = useTranslation();
    const { submitEvent, loading, error, success } = useSubmitEvent();
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();


    // Основное состояние для события
    const [eventData, setEventData] = useState({
        title: '',
        eventType: '',
        description: '',
        eventDate: '',
        startTime: '',
        ageRestriction: '',
        eventImage: '',
        address: {
            street: '',
            building: '',
            city: '',
            country: '',
            postalCode: '',
        },
        pricing: {
            activeTab: 0,
        },
    });

    // Временные состояния для данных каждого таба
    const [fixedPriceData, setFixedPriceData] = useState({
        ticketPrice: '',
        limitTickets: false,
        ticketLimit: '',
    });

    const handleTabChange = (newTab) => {
        setEventData((prevData) => ({
            ...prevData,
            pricing: { ...prevData.pricing, activeTab: newTab },
        }));
    };

    const [ticketPoolsData, setTicketPoolsData] = useState([
        { name: '', price: '', quantity: '', startDate: '', endDate: '', limitTickets: false },
        { name: '', price: '', quantity: '', startDate: '', endDate: '', limitTickets: false },
    ]);

    const [errors, setErrors] = useState({});

    const handleNext = () => {
        let validationErrors = {};

        if (activeStep === 0) {
            validationErrors = validateEventDetails(eventData);
        } else if (activeStep === 1) {
            validationErrors = validateAddress(eventData.address);
        }

        if (Object.keys(validationErrors).length > 0 || Array.isArray(validationErrors) && validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        setActiveStep((prevStep) => prevStep + 1);
        setErrors({});
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = async () => {
        let validationErrors = {};

        // Валидация в зависимости от выбранного таба
        if (eventData.pricing.activeTab === 0) {
            validationErrors = validateFixedPrice(fixedPriceData);
        } else if (eventData.pricing.activeTab === 1) {
            validationErrors = validateTicketPools(ticketPoolsData);
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Формируем данные для отправки
        const finalEventData = {
            ...eventData,
            pricing: {
                ...eventData.pricing,
                ...(eventData.pricing.activeTab === 0
                    ? fixedPriceData
                    : { ticketPools: ticketPoolsData }),
            },
        };

        // Отправка данных на сервер
        const response = await submitEvent(finalEventData);
        if (response) {
            navigate('/events');
        }
    };
    
    return (
        <Container maxWidth="md" sx={{ padding: { xs: 2, sm: 4 } }}>
            <Typography variant="h4" gutterBottom align="center">
                {t('createEventPage.title')}
            </Typography>

            <EventStepper activeStep={activeStep} />

            <Box marginTop={4} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {activeStep === 0 && (
                    <EventDetailsForm
                        title={eventData.title}
                        setTitle={(title) => setEventData((prev) => ({ ...prev, title }))}
                        description={eventData.description}
                        setDescription={(description) =>
                            setEventData((prev) => ({ ...prev, description }))
                        }
                        eventDate={eventData.eventDate}
                        setEventDate={(eventDate) => setEventData((prev) => ({ ...prev, eventDate }))}
                        startTime={eventData.startTime}
                        setStartTime={(startTime) => setEventData((prev) => ({ ...prev, startTime }))}
                        ageRestriction={eventData.ageRestriction}
                        setAgeRestriction={(ageRestriction) =>
                            setEventData((prev) => ({ ...prev, ageRestriction }))
                        }
                        eventType={eventData.eventType}
                        setEventType={(eventType) => setEventData((prev) => ({ ...prev, eventType }))}
                        errors={errors}
                    />
                )}
                {activeStep === 1 && (
                    <AddressForm
                        address={eventData.address}
                        onChange={(address) => setEventData((prev) => ({ ...prev, address }))}
                        errors={errors}
                    />
                )}
                {activeStep === 2 && (
                    <PricingOptions
                        activeTab={eventData.pricing.activeTab}
                        setActiveTab={handleTabChange}
                        ticketPrice={fixedPriceData.ticketPrice}
                        setTicketPrice={(value) =>
                            setFixedPriceData((prev) => ({ ...prev, ticketPrice: value }))
                        }
                        limitTickets={fixedPriceData.limitTickets}
                        setLimitTickets={(value) =>
                            setFixedPriceData((prev) => ({ ...prev, limitTickets: value }))
                        }
                        ticketLimit={fixedPriceData.ticketLimit}
                        setTicketLimit={(value) =>
                            setFixedPriceData((prev) => ({ ...prev, ticketLimit: value }))
                        }
                        pools={ticketPoolsData}
                        setPools={setTicketPoolsData}
                        errors={errors}
                    />
                )}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button variant="contained" disabled={activeStep === 0} onClick={handleBack}>
                    {t('createEventPage.backButton')}
                </Button>
                {activeStep === 2 ? (
                    <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
                        {t('createEventPage.submitButton')}
                    </Button>
                ) : (
                    <Button variant="contained" color="primary" onClick={handleNext}>
                        {t('createEventPage.nextButton')}
                    </Button>
                )}
            </Box>

            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="primary">{t('createEventPage.successMessage')}</Typography>}
        </Container>
    );
};

export default CreateEventPage;