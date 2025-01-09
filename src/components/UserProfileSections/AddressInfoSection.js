import React from 'react';
import { Grid, Typography, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CountrySelect from '../../components/Form/Select/CountrySelect';

const AddressInfoSection = ({ data, onChange }) => {
    const { t } = useTranslation();

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h6">{t('profile.addressInfo.title')}</Typography>
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
                    label={t('profile.addressInfo.city')}
                    name="city"
                    value={data.city}
                    onChange={(e) => onChange('city', e.target.value)}
                    fullWidth
                    InputProps={{
                        sx: { height: 56 },
                    }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label={t('profile.addressInfo.zipCode')}
                    name="zipCode"
                    value={data.zipCode}
                    onChange={(e) => onChange('zipCode', e.target.value)}
                    fullWidth
                    InputProps={{
                        sx: { height: 56 },
                    }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label={t('profile.addressInfo.streetName')}
                    name="streetName"
                    value={data.streetName}
                    onChange={(e) => onChange('streetName', e.target.value)}
                    fullWidth
                    InputProps={{
                        sx: { height: 56 },
                    }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label={t('profile.addressInfo.houseNumber')}
                    name="houseNumber"
                    value={data.houseNumber}
                    onChange={(e) => onChange('houseNumber', e.target.value)}
                    fullWidth
                    InputProps={{
                        sx: { height: 56 },
                    }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label={t('profile.addressInfo.state')}
                    name="state"
                    value={data.state}
                    onChange={(e) => onChange('state', e.target.value)}
                    fullWidth
                    InputProps={{
                        sx: { height: 56 },
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default AddressInfoSection;
