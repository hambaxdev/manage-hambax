import React from 'react';
import { TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CountrySelect from '../Form/Select/CountrySelect';
import EUCitizenshipSelect from '../Form/Select/EUCitizenshipSelect';

const AddressForm = ({ address, onChange, errors = {} }) => {
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
            />

            {/* Country selector */}
            <EUCitizenshipSelect
                name="country"
                value={address.country || ""} // Гарантируем, что передаем строку
                onChange={(value) => handleAddressChange('country', value)} // Получаем строку
                helperText={errors.country || t('eventAddress.countryHelperText')}
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
            />
        </>
    );
};

export default AddressForm;
