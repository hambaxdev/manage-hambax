import React from 'react';
import { Grid, TextField, Typography  } from '@mui/material';

const ContactInfoSection = ({ data, onChange }) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h6">Contact Information</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label="Phone"
                    name="phone"
                    value={data.phone}
                    onChange={(e) => onChange('phone', e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label="Alternate Phone"
                    name="alternatePhone"
                    value={data.alternatePhone}
                    onChange={(e) => onChange('alternatePhone', e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label="Website"
                    name="website"
                    value={data.website}
                    onChange={(e) => onChange('website', e.target.value)}
                    fullWidth
                />
            </Grid>
        </Grid>
    );
};

export default ContactInfoSection;
