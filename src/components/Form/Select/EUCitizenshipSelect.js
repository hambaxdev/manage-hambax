import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { euCountries } from "../../../data/euCountries";

const EUCitizenshipSelect = ({ name, value, onChange, error, helperText }) => {
  const { t } = useTranslation(['common', 'countries']);

  return (
    <TextField
      select
      label={t("country")}
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
        {t("personalInfo.selectCountry")}
      </MenuItem>
      {euCountries.map((country) => (
        <MenuItem key={country.code} value={country.code}>
          {t(country.code, { ns: "countries", defaultValue: country.name })}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default EUCitizenshipSelect;
