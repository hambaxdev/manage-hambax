// src/components/Registration/AddressStage.js
import React from 'react';
import { TextField, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import EUCitizenshipSelect from '../Form/Select/EUCitizenshipSelect';

const AddressStage = ({ formData, handleChange, errors }) => {
  const { t } = useTranslation();

  return (
    <Box>
      <EUCitizenshipSelect
        name="country"
        value={formData.country || ""}
        onChange={handleChange}
        error={!!errors.country}
        helperText={errors.country}
      />
      <TextField
        fullWidth
        label={t("registration.address.city")}
        name="city"
        value={formData.city}
        onChange={handleChange}
        margin="normal"
        error={!!errors.city}
        helperText={errors.city}
      />
      <TextField
        fullWidth
        label={t("registration.address.zipCode")}
        name="zipCode"
        value={formData.zipCode}
        onChange={handleChange}
        margin="normal"
        error={!!errors.zipCode}
        helperText={errors.zipCode}
      />
      <TextField
        fullWidth
        label={t("registration.address.streetName")}
        name="streetName"
        value={formData.streetName}
        onChange={handleChange}
        margin="normal"
        error={!!errors.streetName}
        helperText={errors.streetName}
      />
      <TextField
        fullWidth
        label={t("registration.address.houseNumber")}
        name="houseNumber"
        value={formData.houseNumber}
        onChange={handleChange}
        margin="normal"
        error={!!errors.houseNumber}
        helperText={errors.houseNumber}
      />
    </Box>
  );
};

export default AddressStage;
