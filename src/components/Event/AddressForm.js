import React from 'react';
import { TextField, Typography } from '@mui/material';

const AddressForm = ({ address, onChange }) => {
    const handleAddressChange = (field, value) => {
        onChange({ ...address, [field]: value });
    };

    return (
        <>
            <Typography variant="subtitle1" gutterBottom>
                Адрес:
            </Typography>
            <TextField
                fullWidth
                label="Улица"
                value={address.street}
                onChange={(e) => handleAddressChange('street', e.target.value)}
                margin="normal"
                required
            />
            <TextField
                fullWidth
                label="Здание"
                value={address.building}
                onChange={(e) => handleAddressChange('building', e.target.value)}
                margin="normal"
                required
            />
            <TextField
                fullWidth
                label="Город"
                value={address.city}
                onChange={(e) => handleAddressChange('city', e.target.value)}
                margin="normal"
                required
            />
            <TextField
                fullWidth
                label="Страна"
                value={address.country}
                onChange={(e) => handleAddressChange('country', e.target.value)}
                margin="normal"
                required
            />
            <TextField
                fullWidth
                label="Почтовый индекс"
                value={address.postalCode}
                onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                margin="normal"
                required
            />
        </>
    );
};

export default AddressForm;
