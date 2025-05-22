import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Container, Typography, Button, Box, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import EventDetailsForm from '../components/Event/EventDetailsForm';
import AddressForm from '../components/Event/AddressForm';
import PricingOptions from '../components/Event/PricingOptions';
import EventStepper from '../components/Event/EventStepper';
import { validateEventDetails, validateAddress, validateFixedPrice, validateTicketPools } from '../utils/eventValidation';
import useSubmitEvent from '../hooks/useSubmitEvent';

// Utility function to normalize ticket pools data
const normalizeTicketPools = (pools) =>
  pools.map((pool) => ({
    name: pool.name?.trim() || '',
    price: parseFloat(pool.price) || 0,
    quantity: parseInt(pool.quantity) || 0,
    limitTickets: !!pool.limitTickets,
    startDate: pool.startDate?.slice(0, 10) || '',
    endDate: pool.endDate?.slice(0, 10) || '',
  }));

/**
 * CreateEventPage component
 * 
 * A multi-step form for creating new events with validation at each step.
 * Uses a unified state management approach for better maintainability.
 */
const CreateEventPage = () => {
    const { t } = useTranslation();
    const { submitEvent, loading, error, success } = useSubmitEvent();
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();
    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);
    const [useTicketPools, setUseTicketPools] = useState(false);
    const [errors, setErrors] = useState({});

    // Unified state for the entire form
    const [formData, setFormData] = useState({
        title: '',
        eventType: '',
        description: '',
        eventDate: '',
        startTime: '',
        ageRestriction: '',
        eventImage: '',
        address: {
            location: '',
            street: '',
            building: '',
            city: '',
            country: '',
            postalCode: '',
        },
        pricing: {
            ticketPrice: '',
            limitTickets: false,
            ticketLimit: '',
        },
    });

    // Default ticket pool template - used for consistency
    const defaultTicketPool = useMemo(() => ({
        name: '',
        price: '',
        quantity: '',
        startDate: '',
        endDate: '',
        limitTickets: false
    }), []);

    // Separate state for ticket pools
    const [ticketPoolsData, setTicketPoolsData] = useState([
        { ...defaultTicketPool },
        { ...defaultTicketPool },
    ]);

    // Initialize ticket pools if needed when switching to ticket pools mode
    useEffect(() => {
        if (useTicketPools && ticketPoolsData.length < 2) {
            setTicketPoolsData([
                { ...defaultTicketPool },
                { ...defaultTicketPool },
            ]);
        }
    }, [useTicketPools, ticketPoolsData.length, defaultTicketPool]);

    /**
     * Handle form field changes
     * Updates the form state with new values, supporting nested fields
     * 
     * @param {string} field - The field name to update
     * @param {any} value - The new value
     * @param {string|null} nestedField - Optional nested field name for updating nested objects
     */
    const handleChange = useCallback((field, value, nestedField = null) => {
        setFormData((prev) => {
            // Handle nested fields (e.g., address.street, pricing.ticketPrice)
            if (nestedField) {
                return {
                    ...prev,
                    [field]: {
                        ...prev[field],
                        [nestedField]: value,
                    },
                };
            }
            // Handle top-level fields
            return { ...prev, [field]: value };
        });
    }, []);

    /**
     * Handle next button click
     * Validates the current step and proceeds to the next if valid
     */
    const handleNext = () => {
        let validationErrors = {};

        // Validate based on current step
        if (activeStep === 0) {
            // Validate event details (step 1)
            validationErrors = validateEventDetails(formData);
        } else if (activeStep === 1) {
            // Validate address (step 2)
            validationErrors = validateAddress(formData.address);
        } else if (activeStep === 2) {
            // Validate pricing (step 3) - different validation based on pricing mode
            validationErrors = useTicketPools 
                ? validateTicketPools(ticketPoolsData) 
                : validateFixedPrice(formData.pricing);
        }

        // If there are validation errors, display them and stop
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Clear errors and proceed to next step
        setErrors({});
        setActiveStep((prevStep) => prevStep + 1);
    };

    /**
     * Handle back button click
     * Returns to the previous step
     */
    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    /**
     * Handle form submission
     * Validates the final step, prepares data, and submits the event
     */
    const handleSubmit = async () => {
        // Final validation before submission
        let validationErrors = useTicketPools 
            ? validateTicketPools(ticketPoolsData) 
            : validateFixedPrice(formData.pricing);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Prepare final data for submission
        const normalizedPools = useTicketPools ? normalizeTicketPools(ticketPoolsData) : [];

        const finalEventData = {
            ...formData,
            pricing: useTicketPools
                ? { ticketPools: normalizedPools }
                : { 
                    ticketPrice: formData.pricing.ticketPrice, 
                    limitTickets: formData.pricing.limitTickets, 
                    ticketLimit: formData.pricing.ticketLimit 
                },
        };

        // Submit the event
        const response = await submitEvent(finalEventData, selectedImageFile);

        // Navigate to events page on success
        if (response) {
            navigate('/events');
        }
    };




    // Handle image file selection with proper cleanup
    const handleImageChange = useCallback((file) => {
        if (file instanceof Blob || file instanceof File) {
            // Clean up previous preview URL to prevent memory leaks
            if (previewURL) {
                URL.revokeObjectURL(previewURL);
            }

            // Validate file type and size
            const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            const maxSize = 5 * 1024 * 1024; // 5MB

            if (!validTypes.includes(file.type)) {
                setErrors(prev => ({
                    ...prev,
                    eventImage: t('validation.eventDetails.invalidImageType')
                }));
                return;
            }

            if (file.size > maxSize) {
                setErrors(prev => ({
                    ...prev,
                    eventImage: t('validation.eventDetails.imageTooLarge')
                }));
                return;
            }

            // Set the file and create preview URL
            setSelectedImageFile(file);
            const objectURL = URL.createObjectURL(file);
            setPreviewURL(objectURL);

            // Update form data
            handleChange('eventImage', objectURL);
        } else {
            if (previewURL) {
                URL.revokeObjectURL(previewURL);
            }
            setPreviewURL(null);
            setSelectedImageFile(null);
            handleChange('eventImage', '');
        }
    }, [previewURL, handleChange, t]);

    // Effect to clean up preview URL on component unmount
    useEffect(() => {
        return () => {
            if (previewURL) {
                URL.revokeObjectURL(previewURL);
            }
        };
    }, [previewURL]);

    return (
        <Container maxWidth="md" sx={{ padding: { xs: 2, sm: 4 } }}>
            <Typography variant="h4" gutterBottom align="center">
                {t('createEventPage.title')}
            </Typography>

            <EventStepper activeStep={activeStep} />

            <Box marginTop={4} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {activeStep === 0 && (
                    <EventDetailsForm
                        title={formData.title}
                        setTitle={(title) => handleChange('title', title)}
                        description={formData.description}
                        setDescription={(description) => handleChange('description', description)}
                        eventDate={formData.eventDate}
                        setEventDate={(eventDate) => handleChange('eventDate', eventDate)}
                        startTime={formData.startTime}
                        setStartTime={(startTime) => handleChange('startTime', startTime)}
                        eventImage={selectedImageFile}
                        setEventImage={handleImageChange}
                        ageRestriction={formData.ageRestriction}
                        setAgeRestriction={(ageRestriction) => handleChange('ageRestriction', ageRestriction)}
                        eventType={formData.eventType}
                        setEventType={(eventType) => handleChange('eventType', eventType)}
                        errors={errors}
                    />
                )}
                {activeStep === 1 && (
                    <AddressForm
                        address={formData.address}
                        onChange={(address) => handleChange('address', address)}
                        errors={errors}
                    />
                )}
                {activeStep === 2 && (
                    <PricingOptions
                        ticketPrice={formData.pricing.ticketPrice}
                        useTicketPools={useTicketPools}
                        setUseTicketPools={setUseTicketPools}
                        setTicketPrice={(value) => handleChange('pricing', value, 'ticketPrice')}
                        limitTickets={formData.pricing.limitTickets}
                        setLimitTickets={(value) => handleChange('pricing', value, 'limitTickets')}
                        ticketLimit={formData.pricing.ticketLimit}
                        setTicketLimit={(value) => handleChange('pricing', value, 'ticketLimit')}
                        pools={ticketPoolsData}
                        setPools={setTicketPoolsData}
                        errors={errors}
                    />
                )}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button 
                    variant="contained" 
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
                        disabled={loading}
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

            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}
            {success && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    {t('createEventPage.successMessage')}
                </Alert>
            )}
        </Container>
    );
};

export default CreateEventPage;
