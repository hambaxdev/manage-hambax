import React from "react";
import { TextField, Box, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import CountrySelect from "../Form/Select/CountrySelect";
import LanguageSelect from "../Form/Select/LanguageSelect";

const PersonalInfoStep = ({ formData, handleChange, errors }) => {
  const { t } = useTranslation();

  return (
    <Box>
      <TextField
        label={t("registration.personalInfo.firstName")}
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        margin="normal"
        fullWidth
        error={!!errors.firstName}
        helperText={errors.firstName}
      />
      <TextField
        label={t("registration.personalInfo.lastName")}
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        margin="normal"
        fullWidth
        error={!!errors.lastName}
        helperText={errors.lastName}
      />

      <TextField
        label={t("registration.personalInfo.dateOfBirth")}
        name="dateOfBirth"
        type="date"
        value={formData.dateOfBirth}
        onChange={handleChange}
        margin="normal"
        fullWidth
        error={!!errors.dateOfBirth}
        helperText={errors.dateOfBirth}
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        select
        label={t("registration.personalInfo.gender")}
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        margin="normal"
        fullWidth
        error={!!errors.gender}
        helperText={errors.gender}
      >
        <MenuItem value="male">{t("registration.personalInfo.male")}</MenuItem>
        <MenuItem value="female">{t("registration.personalInfo.female")}</MenuItem>
        <MenuItem value="other">{t("registration.personalInfo.other")}</MenuItem>
      </TextField>

      <TextField
        label={t("registration.personalInfo.taxIdentificationNumber")}
        name="taxIdentificationNumber"
        value={formData.taxIdentificationNumber}
        onChange={handleChange}
        margin="normal"
        fullWidth
        error={!!errors.taxIdentificationNumber}
        helperText={errors.taxIdentificationNumber}
      />

      <CountrySelect
        name="citizenship"
        value={formData.citizenship}
        onChange={handleChange}
        error={!!errors.citizenship}
        helperText={errors.citizenship}
      />

      <LanguageSelect
        value={formData.language}
        onChange={handleChange}
        error={errors.language}
        helperText={errors.language}
      />
    </Box>
  );
};

export default PersonalInfoStep;
