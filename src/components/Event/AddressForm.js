import React from 'react';
import { TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CountrySelect from '../Form/Select/CountrySelect';

const AddressForm = ({ address, onChange }) => {
    const { t } = useTranslation();

    const handleAddressChange = (field, value) => {
        onChange({ ...address, [field]: value });
    };

    return (
        <>
            {/* Section title */}
            <Typography variant="subtitle1" gutterBottom>
                {t('eventAddress.title')}
            </Typography>

            {/* Input for the street */}
            <TextField
                fullWidth
                label={t('eventAddress.streetLabel')}
                value={address.street}
                onChange={(e) => handleAddressChange('street', e.target.value)}
                margin="normal"
                required
            />

            {/* Input for the building */}
            <TextField
                fullWidth
                label={t('eventAddress.buildingLabel')}
                value={address.building}
                onChange={(e) => handleAddressChange('building', e.target.value)}
                margin="normal"
                required
            />

            {/* Input for the city */}
            <TextField
                fullWidth
                label={t('eventAddress.cityLabel')}
                value={address.city}
                onChange={(e) => handleAddressChange('city', e.target.value)}
                margin="normal"
                required
            />

            {/* Country selector */}
            <CountrySelect
                name="country"
                value={address.country}
                onChange={(value) => handleAddressChange('country', value)} // Получаем только значение
                helperText={t('eventAddress.countryHelperText')}
            />

            {/* Input for the postal code */}
            <TextField
                fullWidth
                label={t('eventAddress.postalCodeLabel')}
                value={address.postalCode}
                onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                margin="normal"
                required
            />
        </>
    );
};

export default AddressForm;
