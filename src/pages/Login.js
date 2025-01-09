// src/pages/Login.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Link, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import useAuth from '../hooks/useAuth'; // Хук аутентификации
import { validateLogin } from '../utils/validation'; // Утилита для валидации

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { isLoading, apiError, handleLogin } = useLogin();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const onLogin = async () => {
        const values = { email, password };
        const validationErrors = validateLogin(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const { success, isBasicRegistrationComplete } = await handleLogin({ email, password });
            
            if (success) {
                // Перенаправляем пользователя
                navigate(isBasicRegistrationComplete ? '/admin' : '/complete-registration', { replace: true });
            }
        }
    };

    return (
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
                <Typography variant="h4" gutterBottom>
                    Вход в админ-панель
                </Typography>

                {apiError && (
                    <Typography color="error" variant="body2">
                        {apiError}
                    </Typography>
                )}

                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                />

                <TextField
                    label="Пароль"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
                />

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={onLogin}
                    sx={{ mt: 2 }}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress size={24} /> : 'LoginS'}
                </Button>

                <Box mt={2} display="flex" justifyContent="space-between" width="100%">
                    <Link href="/register" variant="body2">
                        Нет аккаунта? Зарегистрироваться
                    </Link>
                    <Link href="/forgot-password" variant="body2">
                        Забыли пароль?
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
