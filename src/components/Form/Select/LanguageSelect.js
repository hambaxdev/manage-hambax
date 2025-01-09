import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "ru", label: "Русский" }
];

const LanguageSelect = ({ value, onChange, error, helperText }) => {
  const { t } = useTranslation();

  return (
    <TextField
      select
      label={t("registration.personalInfo.language")}
      name="language"
      value={value}
      onChange={onChange}
      fullWidth
      margin="normal"
      error={!!error}
      helperText={helperText}
    >
      <MenuItem value="" disabled>
        {t("registration.personalInfo.language")}
      </MenuItem>
      {languages.map((language) => (
        <MenuItem key={language.code} value={language.code}>
          {language.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default LanguageSelect;
