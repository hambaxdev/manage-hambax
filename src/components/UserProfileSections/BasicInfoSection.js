import React from 'react';
import { Grid, Typography, TextField } from '@mui/material';
import EUCitizenshipSelect from '../../components/Form/Select/EUCitizenshipSelect';

const BasicInfoSection = ({ data, onChange }) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h6">Basic Information</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label="First Name"
                    name="firstName"
                    value={data.firstName}
                    onChange={(e) => onChange('firstName', e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label="Last Name"
                    name="lastName"
                    value={data.lastName}
                    onChange={(e) => onChange('lastName', e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label="Email"
                    name="email"
                    value={data.email}
                    onChange={(e) => onChange('email', e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <EUCitizenshipSelect
                    name="citizenship"
                    value={data.citizenship}
                    onChange={(e) => onChange('citizenship', e.target.value)}
                    error={false}
                    helperText=""
                />
            </Grid>
        </Grid>
    );
};

export default BasicInfoSection;
