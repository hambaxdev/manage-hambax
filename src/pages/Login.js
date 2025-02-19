import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Link, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useLogin from '../hooks/useLogin';
import { validateLogin } from '../utils/validation';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { isLoading, apiError, handleLogin } = useLogin();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const onLogin = async () => {
        const values = { email, password };
        const validationErrors = validateLogin(values);
        setErrors(validationErrors);
    
        if (Object.keys(validationErrors).length === 0) {
            const result = await handleLogin({ email, password });
            console.log('Login response:', result);
    
            const { success, isBasicRegistrationComplete } = result;
    
            if (success) {
                console.log('Redirecting to:', isBasicRegistrationComplete ? '/admin' : '/complete-registration');
                navigate(isBasicRegistrationComplete ? '/' : '/complete-registration', { replace: true });
            } else {
                console.error('Login failed');
            }
        }
    };
    

    return (
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
                {/* Localized title */}
                <Typography variant="h4" gutterBottom>
                    {t('login.title')}
                </Typography>

                {apiError && (
                    <Typography color="error" variant="body2">
                        {apiError}
                    </Typography>
                )}

                {/* Email input */}
                <TextField
                    label={t('login.emailLabel')}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                />

                {/* Password input */}
                <TextField
                    label={t('login.passwordLabel')}
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
                />

                {/* Login button */}
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={onLogin}
                    sx={{ mt: 2 }}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress size={24} /> : t('login.loginButton')}
                </Button>

                {/* Links */}
                <Box mt={2} display="flex" justifyContent="space-between" width="100%">
                    <Link href="/register" variant="body2">
                        {t('login.registerLink')}
                    </Link>
                    <Link href="/forgot-password" variant="body2">
                        {t('login.forgotPasswordLink')}
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
