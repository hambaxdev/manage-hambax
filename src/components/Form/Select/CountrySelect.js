import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { countries } from "../../../data/countries";

const CountrySelect = ({ name, value, onChange, error, helperText }) => {
  const { t } = useTranslation(['profile', 'countries']);

  return (
    <TextField
      select
      label={t('personalInfo.citizenship')}
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
        {t('personalInfo.selectCountry', { ns: 'registration' })}
      </MenuItem>
      {countries.map((country) => (
        <MenuItem key={country.code} value={country.code}>
          {t(country.code, { ns: 'countries', defaultValue: country.name })}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CountrySelect;
