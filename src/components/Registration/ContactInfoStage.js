import React from "react";
import { Box, Typography, TextField } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { useTranslation } from "react-i18next";

const ContactInfoStage = ({ formData, handleChange, errors }) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t("registration.contactInfo.phone")}
      </Typography>
      <Box mb={2}>
        <PhoneInput
          country={"de"}
          value={formData.phone}
          onChange={(phone) =>
            handleChange({ target: { name: "phone", value: phone } })
          }
          inputClass="MuiOutlinedInput-root MuiInputBase-root MuiInputBase-fullWidth MuiInputBase-formControl"
          inputStyle={{
            width: "100%",
            height: "56px",
            borderRadius: "4px",
            borderColor: errors.phone ? "#d32f2f" : "#c4c4c4",
            paddingLeft: "70px",
            fontSize: "16px",
          }}
          buttonStyle={{
            borderRight: "2px solid #ccc",
          }}
          dropdownStyle={{
            borderRadius: "4px",
          }}
          containerStyle={{
            width: "100%",
          }}
          specialLabel=""
        />

        {errors.phone && (
          <Typography variant="caption" color="error">
            {errors.phone}
          </Typography>
        )}
      </Box>

      <TextField
        fullWidth
        label={t("registration.contactInfo.website")}
        name="website"
        value={formData.website}
        onChange={handleChange}
        margin="normal"
        error={!!errors.website}
        helperText={errors.website}
      />
    </Box>
  );
};

export default ContactInfoStage;
