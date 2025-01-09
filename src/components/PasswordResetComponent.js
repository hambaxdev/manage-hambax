import React from 'react';
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';

const PasswordResetComponent = ({
  newPassword,
  confirmPassword,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onResetPassword,
  isLoading,
  showPassword,
  toggleShowPassword,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {/* New password input */}
      <TextField
        label={t('passwordReset.newPassword')}
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        fullWidth
        margin="normal"
        value={newPassword}
        onChange={onNewPasswordChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={toggleShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {/* Confirm password input */}
      <TextField
        label={t('passwordReset.confirmPassword')}
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        fullWidth
        margin="normal"
        value={confirmPassword}
        onChange={onConfirmPasswordChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={toggleShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {/* Reset password button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={onResetPassword}
        disabled={isLoading}
        sx={{ mt: 2 }}
      >
        {isLoading ? <CircularProgress size={24} /> : t('passwordReset.resetButton')}
      </Button>
    </>
  );
};

export default PasswordResetComponent;
