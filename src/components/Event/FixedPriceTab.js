import React, { useEffect } from 'react';
import { Box, TextField, Switch, FormControlLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';

const FixedPriceTab = ({
    ticketPrice,
    setTicketPrice,
    limitTickets,
    setLimitTickets,
    ticketLimit,
    setTicketLimit,
    useTicketPools,
    errors = {},
}) => {
    const { t } = useTranslation();

    useEffect(() => {
        if (useTicketPools) {
            setTicketPrice('');
            setLimitTickets(false);
            setTicketLimit('');
        }
    }, [useTicketPools, setTicketPrice, setLimitTickets, setTicketLimit]);

    return (
        <Box mt={2}>
            <TextField
                fullWidth
                label={t('pricing.ticketPrice')}
                value={ticketPrice}
                onChange={(e) => setTicketPrice(e.target.value)}
                margin="normal"
                type="number"
                inputProps={{ min: 0, step: 0.01 }}
                required
                error={!!errors.ticketPrice}
                helperText={errors.ticketPrice}
                disabled={useTicketPools}
            />
            <Box mt={2}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={limitTickets}
                            onChange={(e) => setLimitTickets(e.target.checked)}
                            color="primary"
                            disabled={useTicketPools}
                        />
                    }
                    label={t('pricing.limitTickets')}
                />
                {limitTickets && (
                    <TextField
                        fullWidth
                        label={t('pricing.maximumTickets')}
                        value={ticketLimit}
                        onChange={(e) => setTicketLimit(e.target.value)}
                        margin="normal"
                        type="number"
                        inputProps={{ min: 1, step: 1 }}
                        required
                        error={!!errors.ticketLimit}
                        helperText={errors.ticketLimit}
                        disabled={useTicketPools}
                    />
                )}
            </Box>
        </Box>
    );
};

export default FixedPriceTab;
