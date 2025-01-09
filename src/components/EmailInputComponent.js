import React from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';

const EmailInputComponent = ({ email, onEmailChange, onSendCode, isLoading }) => {
  return (
    <>
      <TextField
        label="Введите ваш email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={onEmailChange}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={onSendCode}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Отправить код'}
      </Button>
    </>
  );
};

export default EmailInputComponent;
