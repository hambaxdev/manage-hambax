import React from 'react';
import { Grid, Typography, TextField } from '@mui/material';
import CountrySelect from '../../components/Form/Select/CountrySelect';

const AddressInfoSection = ({ data, onChange }) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h6">Address Information</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <CountrySelect
                    name="country"
                    value={data.country}
                    onChange={(e) => onChange('country', e.target.value)}
                    error={false}
                    helperText=""
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label="City"
                    name="city"
                    value={data.city}
                    onChange={(e) => onChange('city', e.target.value)}
                    fullWidth
                    InputProps={{
                        sx: { height: 56 }, // Устанавливаем одинаковую высоту
                    }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label="ZIP Code"
                    name="zipCode"
                    value={data.zipCode}
                    onChange={(e) => onChange('zipCode', e.target.value)}
                    fullWidth
                    InputProps={{
                        sx: { height: 56 }, // Устанавливаем одинаковую высоту
                    }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label="Street Name"
                    name="streetName"
                    value={data.streetName}
                    onChange={(e) => onChange('streetName', e.target.value)}
                    fullWidth
                    InputProps={{
                        sx: { height: 56 }, // Устанавливаем одинаковую высоту
                    }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label="House Number"
                    name="houseNumber"
                    value={data.houseNumber}
                    onChange={(e) => onChange('houseNumber', e.target.value)}
                    fullWidth
                    InputProps={{
                        sx: { height: 56 }, // Устанавливаем одинаковую высоту
                    }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label="State"
                    name="state"
                    value={data.state}
                    onChange={(e) => onChange('state', e.target.value)}
                    fullWidth
                    InputProps={{
                        sx: { height: 56 }, // Устанавливаем одинаковую высоту
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default AddressInfoSection;
