import { useState } from 'react';
import axios from 'axios';
import useAuth from './useAuth';

const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const { login } = useAuth();

    const handleLogin = async ({ email, password }) => {
        setIsLoading(true);
        setApiError('');

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/login`,
                { email, password }
            );

            if (response.status === 200) {
                const { accessToken, isBasicRegistrationComplete } = response.data;
                login(accessToken); // Авторизация через контекст
                return { success: true, isBasicRegistrationComplete };
            }
        } catch (error) {
            setApiError(error.response?.data?.message || 'Ошибка авторизации');
            return { success: false };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        apiError,
        handleLogin,
    };
};

export default useLogin;
