import React, { useState } from 'react';
import { TextField, Button, FormControlLabel, Switch, Box } from '@mui/material';
import useCreateManualTicket from '../../hooks/useCreateManualTicket';
import CreatedTicketList from './CreatedTicketList';

const ManualTicketForm = ({ eventDetails }) => {
    const [sendEmail, setSendEmail] = useState(true);
    const [email, setEmail] = useState('');
    const [createdTickets, setCreatedTickets] = useState([]);
    const { createTickets } = useCreateManualTicket();

    console.log(eventDetails);
    const handleSubmit = async () => {
        try {
            const result = await createTickets({
                email: sendEmail ? email : undefined,
                quantity: 1,
                eventUserId: eventDetails.userId,
                eventId: eventDetails._id,
                eventTitle: eventDetails.title,
                eventLocation: eventDetails.address?.location,
                eventStreet: eventDetails.address?.street,
                eventBuilding: eventDetails.address?.building,
                eventCity: eventDetails.address?.city,
                eventCountry: eventDetails.address?.country,
                eventPostalCode: eventDetails.address?.postalCode,
                eventDate: eventDetails.eventDate,
                eventstartTime: eventDetails.startTime,
                eventAgeRestriction: eventDetails.ageRestriction,
                organizerName: eventDetails.userId,
                price: 0,
                currency: 'EUR',
                stripeProductId: eventDetails.stripeProductId,
                stripePriceId: eventDetails.stripePriceId,
            });

            if (result?.tickets?.length) {
                setCreatedTickets(result.tickets); // сохраняем билеты напрямую
            }

            setEmail('');
        } catch (err) {
            console.error('❌ Ошибка создания билета:', err);
        }
    };

    return (
        <Box display="flex" flexDirection="column" gap={4}>
            <Box display="flex" flexDirection="column" gap={2}>
                <FormControlLabel
                    control={<Switch checked={sendEmail} onChange={() => setSendEmail(!sendEmail)} />}
                    label="Отправить билет на email"
                />
                {sendEmail && (
                    <TextField
                        label="Email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                )}

                <Button
                    variant="contained"
                    disabled={sendEmail && !email}
                    onClick={handleSubmit}
                >
                    Сгенерировать билет
                </Button>
            </Box>

            {createdTickets.length > 0 && (
                <CreatedTicketList tickets={createdTickets} />
            )}
        </Box>
    );
};

export default ManualTicketForm;
