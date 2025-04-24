// src/components/EventForm.js
import React, { useState } from 'react';
import { Container, Button, Typography } from '@mui/material';
import EventDetailsForm from './EventDetailsForm';
import AddressForm from './AddressForm';
import PricingOptions from './PricingOptions';

const EventForm = ({ onSubmit, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [clubName, setClubName] = useState('');
    const [address, setAddress] = useState({
        street: '',
        building: '',
        city: '',
        country: '',
        postalCode: '',
    });
    const [pricingMode, setPricingMode] = useState('fixed');
    const [ticketPrice, setTicketPrice] = useState('');
    const [pools, setPools] = useState([
        { name: '', price: '', quantity: '' },
        { name: '', price: '', quantity: '' },
    ]);
    const [eventDate, setEventDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [eventImage, setEventImage] = useState('');
    const [ageRestriction, setAgeRestriction] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const eventData = {
            title,
            description,
            clubName,
            address,
            ticketPrice: pricingMode === 'fixed' ? Number(ticketPrice) : null,
            ticketPools: pricingMode === 'pools' ? pools : null,
            eventDate: new Date(eventDate),
            startTime,
            eventImage,
            ageRestriction: Number(ageRestriction),
        };
        onSubmit(eventData);
    };

    return (
        <Container>
            <Typography variant="h5" gutterBottom>
                Create your Event
            </Typography>
            <form onSubmit={handleSubmit}>
                <EventDetailsForm
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                    clubName={clubName}
                    setClubName={setClubName}
                    eventDate={eventDate}
                    setEventDate={setEventDate}
                    startTime={startTime}
                    setStartTime={setStartTime}
                    eventImage={eventImage}
                    setEventImage={setEventImage}
                    ageRestriction={ageRestriction}
                    setAgeRestriction={setAgeRestriction}
                />
                <AddressForm address={address} onChange={setAddress} />
                <PricingOptions
                    pricingMode={pricingMode}
                    setPricingMode={setPricingMode}
                    ticketPrice={ticketPrice}
                    setTicketPrice={setTicketPrice}
                    pools={pools}
                    setPools={setPools}
                />
                <Button variant="contained" color="primary" type="submit" style={{ marginRight: '10px' }}>
                    Создать
                </Button>
                <Button variant="outlined" color="secondary" onClick={onCancel}>
                    Отмена
                </Button>
            </form>
        </Container>
    );
};

export default EventForm;
