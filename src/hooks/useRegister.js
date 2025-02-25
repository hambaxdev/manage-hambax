import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { registerUser } from '../services/registrationService';

const useRegister = () => {
    const { t } = useTranslation();

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
                setSuccessMessage(t("registration.success"));
                return { success: true };
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
    
        return { success: false };
    };

    return { isLoading, errorMessage, successMessage, validationErrors, register };
};

export default useRegister;
