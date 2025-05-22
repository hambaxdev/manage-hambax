import React from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ContactInfoSection = ({ data, onChange }) => {
    const { t } = useTranslation('profile');

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h6">{t('profile.contactInfo.title')}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label={t('profile.contactInfo.phone')}
                    name="phone"
                    value={data.phone}
                    onChange={(e) => onChange('phone', e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label={t('profile.contactInfo.alternatePhone')}
                    name="alternatePhone"
                    value={data.alternatePhone}
                    onChange={(e) => onChange('alternatePhone', e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label={t('profile.contactInfo.website')}
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
