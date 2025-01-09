import React, { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import EventDetailsForm from '../components/Event/EventDetailsForm';
import AddressForm from '../components/Event/AddressForm';
import TicketPoolsManager from '../components/Event/TicketPoolsManager';
import EventStepper from '../components/Event/EventStepper';

const CreateEventPage = () => {
    const { t } = useTranslation();
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

    // Handle step navigation
    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    // Handle event submission
    const handleSubmit = () => {
        console.log(t('createEventPage.savedData'), eventData);
        // Add logic for sending eventData to the server
    };

    return (
        <Container maxWidth="md" sx={{ padding: { xs: 2, sm: 4 } }}>
            {/* Page Title */}
            <Typography variant="h4" gutterBottom align="center">
                {t('createEventPage.title')}
            </Typography>

            {/* Stepper Component */}
            <EventStepper activeStep={activeStep} />

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
                        onChange={(updatedAddress) => 
                            setEventData((prevData) => ({
                                ...prevData,
                                address: updatedAddress,
                            }))
                        }
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

            {/* Navigation Buttons */}
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
                    {t('createEventPage.backButton')}
                </Button>
                {activeStep === 2 ? (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        {t('createEventPage.submitButton')}
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                    >
                        {t('createEventPage.nextButton')}
                    </Button>
                )}
            </Box>
        </Container>
    );
};

export default CreateEventPage;