import React from 'react';
import { Box, TextField, Switch, FormControlLabel } from '@mui/material';

const FixedPriceTab = ({
    ticketPrice,
    setTicketPrice,
    limitTickets,
    setLimitTickets,
    ticketLimit,
    setTicketLimit,
    errors = {},
}) => {
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
            />
            <Box mt={2}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={limitTickets}
                            onChange={(e) => setLimitTickets(e.target.checked)}
                            color="primary"
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
                    />
                )}
            </Box>
        </Box>
    );
};

export default FixedPriceTab;
