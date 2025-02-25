import React, { useState } from "react";
import { Container, Typography, Box, Button, Link, Alert } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useResendVerification from "../hooks/useResendVerification"; // Импортируем хук

const EmailVerificationNotice = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "ваш email";

  const { isLoading, errorMessage, successMessage, resendVerificationEmail } = useResendVerification();

  const handleResendEmail = () => {
    resendVerificationEmail(email);
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" gutterBottom>
          {t("verification.title")}
        </Typography>

        <Typography variant="body1" textAlign="center" mb={2}>
          {t("verification.message", { email })}
        </Typography>

        {/* Отображение сообщений */}
        {errorMessage && <Alert severity="error">{t(errorMessage)}</Alert>}
        {successMessage && <Alert severity="success">{t(successMessage)}</Alert>}

        {/* Кнопка для входа */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => navigate("/login")}
          sx={{ mt: 2 }}
        >
          {t("verification.login")}
        </Button>

        <Box mt={2}>
          <Typography variant="body2">
            {t("verification.noEmail")}{" "}
            <Button
              variant="text"
              onClick={handleResendEmail}
              disabled={isLoading}
            >
              {isLoading ? t("verification.sending") : t("verification.resend")}
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default EmailVerificationNotice;
