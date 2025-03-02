import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import useStripeOnboardingLink from "../hooks/useStripeOnboardingLink";

const OnboardingRefresh = () => {
    const location = useLocation();
    const { stripeLink, isLoading, error, fetchStripeOnboardingLink } = useStripeOnboardingLink();
    const accountId = new URLSearchParams(location.search).get("accountId");

    useEffect(() => {
        if (accountId) {
            fetchStripeOnboardingLink().then((link) => {
                if (link) {
                    window.location.href = link;
                }
            });
        }
    }, [accountId]);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            {isLoading ? (
                <>
                    <Typography variant="h5" gutterBottom>
                        Перезапуск онбординга...
                    </Typography>
                    <CircularProgress />
                </>
            ) : error ? (
                <Typography variant="h6" color="error">{error}</Typography>
            ) : null}
        </Box>
    );
};

export default OnboardingRefresh;
