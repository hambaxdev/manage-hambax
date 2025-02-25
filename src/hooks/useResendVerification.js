import { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const useResendVerification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const resendVerificationEmail = async (email) => {
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(`${API_URL}/verification/resend`, { email });
      setSuccessMessage(response.data.message || "Verification email has been resent.");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to resend verification email.");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, errorMessage, successMessage, resendVerificationEmail };
};

export default useResendVerification;
