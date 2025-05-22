import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import useAuthContext from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";

const RegistrationReminder = () => {
    const { t } = useTranslation();
    const { isBasicRegistrationComplete, profileData, updateAuthContext } = useAuthContext();
    const navigate = useNavigate();

    // Проверяем, завершена ли Stripe-онбординг после основной регистрации
    const stripeOnboardingIncomplete =
        isBasicRegistrationComplete &&
        profileData &&
        !profileData.stripeOnboardingCompleted &&
        profileData.stripeOnboardingCompleted !== "" &&
        profileData.stripeOnboardingCompleted !== null;

    const stripeOnboardingLink = profileData?.stripeOnboardingLink;

    // 🚀 При монтировании проверяем актуальность статуса пользователя
    useEffect(() => {
        const fetchUserStatus = async () => {
            try {
                await axios.get(`${process.env.REACT_APP_API_URL}/auth/user-status`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
                });
                updateAuthContext(); // Обновляем контекст аутентификации
            } catch (error) {
                console.error("Ошибка при получении статуса пользователя:", error);
            }
        };

        if (!isBasicRegistrationComplete) {
            fetchUserStatus();
        }
    }, [isBasicRegistrationComplete, updateAuthContext]);

    // Если регистрация полностью завершена и Stripe-онбординг не требуется, ничего не показываем
    if (!stripeOnboardingIncomplete && isBasicRegistrationComplete) {
        return null;
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

            {/* Напоминание о Stripe онбординге (если основная регистрация завершена) */}
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
