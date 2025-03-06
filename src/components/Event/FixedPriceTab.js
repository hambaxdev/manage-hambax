import React, { useEffect } from 'react';
import { Box, TextField, Switch, FormControlLabel } from '@mui/material';

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

    useEffect(() => {
        if (useTicketPools) {
            setTicketPrice('');
            setLimitTickets(false);
            setTicketLimit('');
        }
    }, [useTicketPools]);

    return (
        <Box mt={2}>
            <TextField
                fullWidth
                label="Ticket Price"
                value={ticketPrice}
                onChange={(e) => setTicketPrice(e.target.value)}
                margin="normal"
                type="number"
                required
                error={!!errors.ticketPrice}
                helperText={errors.ticketPrice}
                disabled={useTicketPools} // ✅ Блокируем поле, если выбраны пулы билетов
            />
            <Box mt={2}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={limitTickets}
                            onChange={(e) => setLimitTickets(e.target.checked)}
                            color="primary"
                            disabled={useTicketPools} // ✅ Блокируем свитчер
                        />
                    }
                    label="Limit Tickets"
                />
                {limitTickets && (
                    <TextField
                        fullWidth
                        label="Maximum Tickets"
                        value={ticketLimit}
                        onChange={(e) => setTicketLimit(e.target.value)}
                        margin="normal"
                        type="number"
                        required
                        error={!!errors.ticketLimit}
                        helperText={errors.ticketLimit}
                        disabled={useTicketPools} // ✅ Блокируем ввод
                    />
                )}
            </Box>
        </Box>
    );
};

export default FixedPriceTab;
