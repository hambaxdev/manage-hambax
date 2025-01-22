// src/components/Registration/EUCitizenshipSelect.js
import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { euCountries } from "../../../data/euCountries";

const EUCitizenshipSelect = ({ name, value, onChange, error, helperText }) => {
  const { t } = useTranslation();

  return (
    <TextField
      select
      label={t("registration.address.country")}
      name={name}
      value={value}
      onChange={(event) => {
        if (onChange) onChange(event.target.value);
      }}
      fullWidth
      error={error}
      helperText={helperText}
    >
      <MenuItem value="" disabled>
        {t("registration.personalInfo.selectCountry")}
      </MenuItem>
      {euCountries.map((country) => (
        <MenuItem key={country.code} value={country.code}>
          {t(`countries.${country.code}`, country.name)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default EUCitizenshipSelect;
