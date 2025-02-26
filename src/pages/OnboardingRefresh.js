import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";

const OnboardingRefresh = () => {
    const location = useLocation();
    const accountId = new URLSearchParams(location.search).get("accountId");

    useEffect(() => {
        if (accountId) {
            setTimeout(() => {
                window.location.href = `${process.env.REACT_APP_API_URL}/stripe/refresh?accountId=${accountId}`;
            }, 3000);
        }
    }, [accountId]);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <Typography variant="h5" gutterBottom>
                Перезапуск онбординга...
            </Typography>
            <CircularProgress />
        </Box>
    );
};

export default OnboardingRefresh;
