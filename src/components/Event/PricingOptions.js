import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField } from '@mui/material';
import TicketPoolsManager from './TicketPoolsManager';

const PricingOptions = ({ pricingMode, setPricingMode, ticketPrice, setTicketPrice, pools, setPools }) => {
    return (
        <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Способ ценообразования</FormLabel>
            <RadioGroup
                row
                value={pricingMode}
                onChange={(e) => setPricingMode(e.target.value)}
            >
                <FormControlLabel value="fixed" control={<Radio />} label="Фиксированная цена" />
                <FormControlLabel value="pools" control={<Radio />} label="Пулы билетов" />
            </RadioGroup>
            {pricingMode === 'fixed' && (
                <TextField
                    fullWidth
                    label="Цена билета"
                    value={ticketPrice}
                    onChange={(e) => setTicketPrice(e.target.value)}
                    margin="normal"
                    type="number"
                    required
                />
            )}
            {pricingMode === 'pools' && <TicketPoolsManager pools={pools} setPools={setPools} />}
        </FormControl>
    );
};

export default PricingOptions;
