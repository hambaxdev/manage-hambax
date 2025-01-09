import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next'; // Hook for localization
import useRegister from '../hooks/useRegister';

const RegisterPage = () => {
  const { t } = useTranslation(); // Hook for localization
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { isLoading, errorMessage, successMessage, validationErrors, register } = useRegister();

  const handleRegister = () => {
    register({ username, email, password, confirmPassword });
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        {/* Localized title */}
        <Typography variant="h4" gutterBottom>
          {t('register.title')}
        </Typography>

        {/* Localized messages */}
        {errorMessage && <Alert severity="error">{t(errorMessage)}</Alert>}
        {successMessage && <Alert severity="success">{t(successMessage)}</Alert>}

        {/* Username input */}
        <TextField
          label={t('register.username')}
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!validationErrors.username}
          helperText={validationErrors.username && t(validationErrors.username)}
        />

        {/* Email input */}
        <TextField
          label={t('register.email')}
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!validationErrors.email}
          helperText={validationErrors.email && t(validationErrors.email)}
        />

        {/* Password input */}
        <TextField
          label={t('register.password')}
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!validationErrors.password}
          helperText={validationErrors.password && t(validationErrors.password)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Confirm password input */}
        <TextField
          label={t('register.confirmPassword')}
          type={showConfirmPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!validationErrors.confirmPassword}
          helperText={
            validationErrors.confirmPassword &&
            t(validationErrors.confirmPassword)
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Register button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRegister}
          disabled={isLoading}
          sx={{ mt: 2 }}
        >
          {isLoading ? t('register.loading') : t('register.submit')}
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterPage;
