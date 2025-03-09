import { useState } from 'react';
import { completeUserRegistration } from '../services/registrationService';
import useAuth from './useAuth';

const useCompleteRegistration = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const { completeRegistration: updateAuthContext, updateUserProfile, setIsBasicRegistrationComplete } = useAuth();

    const completeRegistration = async (formData) => {
        setIsLoading(true);
        setErrorMessage('');
        setSuccessMessage('');
        setValidationErrors({});
        const token = localStorage.getItem('authToken');
    
        try {
            const response = await completeUserRegistration(formData, token);
            if (response.status === 200) {
                setSuccessMessage('Registration completed successfully!');
                
                console.log("🔄 Обновляем данные профиля...");
                await updateUserProfile();
    
                console.log("✅ Устанавливаем isBasicRegistrationComplete в true");
                setIsBasicRegistrationComplete(true);
                
                updateAuthContext();
            }
        } catch (error) {
            if (error.response?.data?.errors) {
                setValidationErrors(error.response.data.errors);
            } else {
                setErrorMessage(error.response?.data?.message || 'Failed to complete registration.');
            }
        } finally {
            setIsLoading(false);
        }
    };    

    return { isLoading, errorMessage, successMessage, validationErrors, completeRegistration };
};

export default useCompleteRegistration;
