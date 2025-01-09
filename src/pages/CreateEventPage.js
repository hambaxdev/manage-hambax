// src/pages/CreateEventPage.js
import React, { useState } from 'react';
import { Container, Typography, Stepper, Step, StepLabel, Button, Box } from '@mui/material';
import EventDetailsForm from '../components/Event/EventDetailsForm';
import AddressForm from '../components/Event/AddressForm';
import TicketPoolsManager from '../components/Event/TicketPoolsManager';

const CreateEventPage = () => {
    const [activeStep, setActiveStep] = useState(0);
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
            ticketPools: [
                { name: '', price: '', quantity: '', startDate: '', endDate: '' },
                { name: '', price: '', quantity: '', startDate: '', endDate: '' },
            ],
        },
    });

    const steps = ['Общая информация', 'Адрес мероприятия', 'Билеты'];

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = () => {
        console.log('Сохраненные данные:', eventData);
        // Отправка данных на сервер
    };

    return (
        <Container maxWidth="md" sx={{ padding: { xs: 2, sm: 4 } }}>
            <Typography variant="h4" gutterBottom align="center">
                Создание нового мероприятияCreate your Event
            </Typography>

            <Stepper activeStep={activeStep} alternativeLabel sx={{ marginBottom: 4 }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Box marginTop={4} sx={{ paddingX: { xs: 2, sm: 4 }, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {activeStep === 0 && (
                    <EventDetailsForm
                    title={eventData.title}
                    setTitle={(title) => setEventData({ ...eventData, title })}
                    description={eventData.description}
                    setDescription={(description) => setEventData({ ...eventData, description })}
                    clubName={eventData.clubName}
                    setClubName={(clubName) => setEventData({ ...eventData, clubName })}
                    eventDate={eventData.eventDate}
                    setEventDate={(eventDate) => setEventData({ ...eventData, eventDate })}
                    startTime={eventData.startTime}
                    setStartTime={(startTime) => setEventData({ ...eventData, startTime })}
                    eventImage={eventData.eventImage}
                    setEventImage={(eventImage) => setEventData({ ...eventData, eventImage })}
                    ageRestriction={eventData.ageRestriction}
                    setAgeRestriction={(ageRestriction) => setEventData({ ...eventData, ageRestriction })}
                    eventType={eventData.eventType}
                    setEventType={(eventType) => setEventData({ ...eventData, eventType })}
                />
                )}
                {activeStep === 1 && (
                    <AddressForm
                        address={eventData.address}
                        setAddress={(address) => setEventData({ ...eventData, address })}
                    />
                )}
                {activeStep === 2 && (
                    <TicketPoolsManager
                        pools={eventData.pricing.ticketPools}
                        setPools={(ticketPools) =>
                            setEventData({ ...eventData, pricing: { ...eventData.pricing, ticketPools } })
                        }
                    />
                )}
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 2,
                    marginTop: 4,
                    paddingX: { xs: 2, sm: 4 },
                }}
            >
                <Button
                    variant="outlined"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                >
                    Назад
                </Button>
                {activeStep === steps.length - 1 ? (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Создать мероприятие
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                    >
                        Далее
                    </Button>
                )}
            </Box>
        </Container>
    );
};

export default CreateEventPage;


