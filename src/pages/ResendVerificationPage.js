import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Alert } from "@mui/material";
import { useTranslation } from "react-i18next";
import useResendVerification from "../hooks/useResendVerification";

const ResendVerificationPage = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const { isLoading, errorMessage, successMessage, resendVerificationEmail } = useResendVerification();

  const handleResend = () => {
    resendVerificationEmail(email);
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" gutterBottom>
          {t("resend.title")}
        </Typography>

        {errorMessage && <Alert severity="error">{t(errorMessage)}</Alert>}
        {successMessage && <Alert severity="success">{t(successMessage)}</Alert>}

        <TextField
          label={t("resend.email")}
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleResend}
          disabled={isLoading}
          sx={{ mt: 2 }}
        >
          {isLoading ? t("resend.loading") : t("resend.submit")}
        </Button>
      </Box>
    </Container>
  );
};

export default ResendVerificationPage;
