import React from 'react';
import { TextField, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import EUCitizenshipSelect from '../Form/Select/EUCitizenshipSelect';

const AddressForm = ({ address, onChange, errors = {} }) => {
    const { t } = useTranslation('event');

    const handleAddressChange = (field, value) => {
        onChange({ ...address, [field]: value });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
            <Typography variant="body2" color="textSecondary" gutterBottom sx={{ mt: 1 }}>
                {t('eventAddress.subtitle')}
            </Typography>

            <TextField
                fullWidth
                label={t('eventAddress.locationLabel')}
                value={address.location || ''}
                onChange={(e) => handleAddressChange('location', e.target.value)}
                margin="normal"
                required
                error={!!errors.location}
                helperText={errors.location}
            />

            {/* Input for the street */}
            <TextField
                fullWidth
                label={t('eventAddress.streetLabel')}
                value={address.street}
                onChange={(e) => handleAddressChange('street', e.target.value)}
                margin="normal"
                required
                error={!!errors.street}
                helperText={errors.street}
            />

            {/* Input for the building */}
            <TextField
                fullWidth
                label={t('eventAddress.buildingLabel')}
                value={address.building}
                onChange={(e) => handleAddressChange('building', e.target.value)}
                margin="normal"
                required
                error={!!errors.building}
                helperText={errors.building}
            />

            {/* Input for the city */}
            <TextField
                fullWidth
                label={t('eventAddress.cityLabel')}
                value={address.city}
                onChange={(e) => handleAddressChange('city', e.target.value)}
                margin="normal"
                required
                error={!!errors.city}
                helperText={errors.city}
                sx={{ mb: 3 }}
            />

            {/* Country selector */}
            <EUCitizenshipSelect
                name="country"
                value={address.country || ""}
                onChange={(e) => handleAddressChange(e.target.name, e.target.value)}
                helperText={(!address.country && errors.country) ? errors.country : ""}
                error={!!errors.country}
            />

            {/* Input for the postal code */}
            <TextField
                fullWidth
                label={t('eventAddress.postalCodeLabel')}
                value={address.postalCode}
                onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                margin="normal"
                required
                error={!!errors.postalCode}
                helperText={errors.postalCode}
                sx={{ mt: 3 }}
            />
        </Box>
    );
};

export default AddressForm;