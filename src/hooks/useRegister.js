import { useState } from 'react';
import { registerUser } from '../services/registrationService';

const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    const register = async (formData) => {
        setIsLoading(true);
        setErrorMessage('');
        setSuccessMessage('');
        setValidationErrors({});

        try {
            const response = await registerUser(formData);
            if (response.status === 200) {
                setSuccessMessage('Registration successful! Please check your email.');
            }
        } catch (error) {
            if (error.response?.data?.errors) {
                setValidationErrors(error.response.data.errors);
            } else {
                setErrorMessage(error.response?.data?.message || 'Registration failed. Try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, errorMessage, successMessage, validationErrors, register };
};

export default useRegister;
