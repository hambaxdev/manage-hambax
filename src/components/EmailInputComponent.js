import React from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';

const EmailInputComponent = ({ email, onEmailChange, onSendCode, isLoading }) => {
  const { t } = useTranslation();

  return (
    <>
      {/* Localized label for email input */}
      <TextField
        label={t('emailInput.label')}
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={onEmailChange}
      />
      {/* Localized button for sending the code */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={onSendCode}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : t('emailInput.sendCodeButton')}
      </Button>
    </>
  );
};

export default EmailInputComponent;
