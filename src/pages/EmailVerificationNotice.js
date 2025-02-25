import React from "react";
import { Container, Typography, Box, Button, Link } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const EmailVerificationNotice = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "ваш email";

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" gutterBottom>
          {t("verification.title")}
        </Typography>

        <Typography variant="body1" textAlign="center" mb={2}>
          {t("verification.message", { email })}
        </Typography>

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
            <Link href="/resend-verification">{t("verification.resend")}</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default EmailVerificationNotice;
