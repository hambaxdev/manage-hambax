import React from 'react';
import { Grid, Typography, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CountrySelect from '../../components/Form/Select/CountrySelect';

const BasicInfoSection = ({ data, onChange }) => {
    const { t } = useTranslation();

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h6">{t('profile.basicInfo.title')}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label={t('profile.basicInfo.firstName')}
                    name="firstName"
                    value={data.firstName}
                    onChange={(e) => onChange('firstName', e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label={t('profile.basicInfo.lastName')}
                    name="lastName"
                    value={data.lastName}
                    onChange={(e) => onChange('lastName', e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label={t('profile.basicInfo.email')}
                    name="email"
                    value={data.email}
                    onChange={(e) => onChange('email', e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <CountrySelect
                    name="citizenship"
                    value={data.citizenship}
                    onChange={(e) => onChange(e.target.name, e.target.value)}
                    error={false}
                    helperText=""
                />
            </Grid>
        </Grid>
    );
};

export default BasicInfoSection;
