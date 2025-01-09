import { useState } from 'react';
import { sendCode, verifyCode, resetPassword } from '../services/authService';

const useForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState('');

  const handleSendCode = async (email) => {
    setIsLoading(true);
    setApiMessage('');
    try {
      await sendCode(email);
      return true;
    } catch (error) {
      setApiMessage(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (email, code) => {
    setIsLoading(true);
    setApiMessage('');
    try {
      await verifyCode(email, code);
      return true;
    } catch (error) {
      setApiMessage(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (email, password) => {
    setIsLoading(true);
    setApiMessage('');
    try {
      await resetPassword(email, password);
      setApiMessage('Пароль успешно сброшен');
      return true;
    } catch (error) {
      setApiMessage(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    apiMessage,
    handleSendCode,
    handleVerifyCode,
    handleResetPassword,
  };
};

export default useForgotPassword;
