import { useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const useSetStaffPassword = () => {
  const [params] = useSearchParams();
  const resetToken = params.get('token');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const submitPassword = useCallback(async ({ password, confirmPassword }) => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    if (!resetToken) {
      setErrorMessage(t('errors.token_missing') || 'Reset token is missing.');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage(t('errors.password_mismatch') || 'Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_HAMBAX_NEW_API_URL}/verification/staff/complete-registration`,
        { token: resetToken, newPassword: password }
      );

      setSuccessMessage(response.data.message || t('password.set_success'));
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      const fallbackMessage = t('errors.generic') || 'Something went wrong.';
      setErrorMessage(err?.response?.data?.message || fallbackMessage);
    } finally {
      setIsLoading(false);
    }
  }, [resetToken, t, navigate]);

  return {
    isLoading,
    errorMessage,
    successMessage,
    submitPassword,
  };
};

export default useSetStaffPassword;
