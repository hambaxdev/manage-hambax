import { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const API_URL = process.env.REACT_APP_API_URL;

const useResendVerification = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const resendVerificationEmail = async (email) => {
    if (!email) {
      setErrorMessage(t("verification.noEmailProvided"));
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(`${API_URL}/verification/resend`, { email });
      setSuccessMessage(response.data.message || t("verification.resentSuccess", { email }));
    } catch (error) {
      setErrorMessage(error.response?.data?.message || t("verification.resentError"));
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, errorMessage, successMessage, resendVerificationEmail };
};

export default useResendVerification;
