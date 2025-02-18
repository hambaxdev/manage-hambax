import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { countries } from "../../../data/countries";

const CountrySelect = ({ name, value, onChange, error, helperText }) => {
  const { t } = useTranslation();

  return (
    <TextField
      select
      margin="normal"
      label={t('registration.personalInfo.citizenship')}
      name={name}
      value={value || ""}
      onChange={(event) => {
        
        onChange({
          target: {
            name: name,
            value: event.target.value,
          },
        });
      }}
      fullWidth
      error={!!error}
      helperText={helperText}
    >
      <MenuItem value="" disabled>
        {t('registration.personalInfo.selectCountry')}
      </MenuItem>
      {countries.map((country) => (
        <MenuItem key={country.code} value={country.code}>
          {t(`countries.${country.code}`, country.name)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CountrySelect;
