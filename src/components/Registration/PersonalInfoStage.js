import React from "react";
import {
  TextField,
  Box,
  MenuItem,
  Grid
} from "@mui/material";
import { useTranslation } from "react-i18next";
import CountrySelect from "../Form/Select/CountrySelect";
import LanguageSelect from "../Form/Select/LanguageSelect";
import InfoTooltip from "../InfoTooltip";
import SocialLinksSection from "../SocialLinksSection";

const PersonalInfoStep = ({ formData, handleChange, errors }) => {
  const { t } = useTranslation();

  return (
    <Box>
      {/* Название организации */}
      <Box position="relative" mb={2}>
        <TextField
          label={t("registration.personalInfo.organizationName")}
          name="organizationName"
          value={formData.organizationName}
          onChange={handleChange}
          margin="normal"
          fullWidth
          error={!!errors.organizationName}
          helperText={errors.organizationName}
        />
        <Box
          position="absolute"
          top="50%"
          right={12}
          sx={{ transform: "translateY(-50%)" }}
        >
          <InfoTooltip text={t("registration.personalInfo.organizationNameTooltip")} />
        </Box>
      </Box>

      {/* Описание организации */}
      <Box position="relative" mb={2}>
        <TextField
          label={t("registration.personalInfo.organizationDescription")}
          name="organizationDescription"
          value={formData.organizationDescription}
          onChange={handleChange}
          fullWidth
          multiline
          minRows={4}
          error={!!errors.organizationDescription}
          helperText={errors.organizationDescription}
        />
        <Box position="absolute" top={30} right={12}>
          <InfoTooltip text={t("registration.personalInfo.organizationDescriptionTooltip")} />
        </Box>
      </Box>

      {/* Социальные сети — с обёрткой Grid */}
      <Grid container spacing={2} sx={{ mt: 3, mb: 2 }}>
      <SocialLinksSection data={formData} onChange={handleChange} />
    </Grid>

      {/* Имя */}
      <TextField
        label={t("registration.personalInfo.firstName")}
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        fullWidth
        error={!!errors.firstName}
        helperText={errors.firstName}
      />

      {/* Фамилия */}
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

      {/* Дата рождения */}
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

      {/* Пол */}
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

      {/* ИНН */}
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

      {/* Гражданство */}
      <CountrySelect
        name="citizenship"
        value={formData.citizenship}
        onChange={handleChange}
        error={!!errors.citizenship}
        helperText={errors.citizenship}
      />

      {/* Язык */}
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
