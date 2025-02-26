import React from "react";
import { Box, Typography, Button } from "@mui/material";
import useAuthContext from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RegistrationReminder = () => {
    const { t } = useTranslation();
    const { isBasicRegistrationComplete, profileData } = useAuthContext();
    const navigate = useNavigate();

    const stripeOnboardingIncomplete =
        isBasicRegistrationComplete && // Stripe Reminder показывается только после завершения основной регистрации
        profileData &&
        !profileData.stripeOnboardingCompleted &&
        profileData.stripeOnboardingCompleted !== "" &&
        profileData.stripeOnboardingCompleted !== null;

    const stripeOnboardingLink = profileData?.stripeOnboardingLink;

    if (!stripeOnboardingIncomplete && isBasicRegistrationComplete) {
        return null; // Если все завершено, ничего не показываем
    }

    return (
        <Box
            sx={{
                color: "black",
                p: 2,
                textAlign: "center",
                borderRadius: "8px",
                backgroundColor: "#f5f5f5",
                mb: 2,
            }}
        >
            {/* Напоминание о базовой регистрации */}
            {!isBasicRegistrationComplete && (
                <>
                    <Typography variant="body1" gutterBottom>
                        {t("registrationReminder.completeRegistration.message")}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 1 }}
                        onClick={() => navigate("/complete-registration")}
                    >
                        {t("registrationReminder.completeRegistration.button")}
                    </Button>
                </>
            )}

            {/* Напоминание о Stripe онбординге (только если регистрация завершена) */}
            {stripeOnboardingIncomplete && (
                <>
                    <Typography variant="body1" gutterBottom>
                        {t("registrationReminder.stripeOnboarding.message")}
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 1 }}
                        onClick={() => (window.location.href = stripeOnboardingLink)}
                    >
                        {t("registrationReminder.stripeOnboarding.button")}
                    </Button>
                </>
            )}
        </Box>
    );
};

export default RegistrationReminder;
