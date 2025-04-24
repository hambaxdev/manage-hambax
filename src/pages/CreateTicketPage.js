import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import ManualTicketForm from '../components/TicketManualCreate/ManualTicketForm';

const CreateTicketPage = () => {
    const { state } = useLocation();
    const eventDetails = state?.eventDetails;

    console.log(eventDetails);
    if (!eventDetails) return <Typography>Error: No event data provided</Typography>;

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h5" gutterBottom>
                Создание билета для: <strong>{eventDetails.title}</strong>
            </Typography>

            <Box mt={4}>
                <ManualTicketForm eventDetails={eventDetails} />
            </Box>
        </Container>
    );
};

export default CreateTicketPage;
