import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert, IconButton, InputAdornment, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import useRegister from '../hooks/useRegister';
import { useNavigate } from "react-router-dom"; 

const RegisterPage = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { isLoading, errorMessage, successMessage, validationErrors, register } = useRegister();
  const navigate = useNavigate(); 

  const handleRegister = async () => {
    const result = await register({ email, password });
  
    if (result.success) {
      navigate("/email-verification", { state: { email } });
    }
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
        {/* Links */}
        <Box mt={2} display="flex" justifyContent="center" width="100%">
            <Link href="/login" variant="body2">
                {t('login.title')}
            </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
