import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const OnboardingSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const accountId = new URLSearchParams(location.search).get("accountId");

    useEffect(() => {
        if (accountId) {
            setTimeout(() => {
                navigate("/");
            }, 5000);
        }
    }, [accountId, navigate]);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <Typography variant="h5" gutterBottom>
                Онбординг завершён! 🎉
            </Typography>
            <Typography variant="body1" textAlign="center">
                Ваш аккаунт в Stripe успешно настроен. Сейчас мы перенаправим вас в профиль.
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => navigate("/profile")}>
                Перейти в профиль
            </Button>
        </Box>
    );
};

export default OnboardingSuccess;
