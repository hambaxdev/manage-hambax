import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import TicketPoolsManager from './TicketPoolsManager';

const PricingOptions = ({ pricingMode, setPricingMode, ticketPrice, setTicketPrice, pools, setPools }) => {
    const { t } = useTranslation();

    return (
        <FormControl component="fieldset" margin="normal">
            {/* Localized pricing mode label */}
            <FormLabel component="legend">{t('pricingOptions.label')}</FormLabel>
            <RadioGroup
                row
                value={pricingMode}
                onChange={(e) => setPricingMode(e.target.value)}
            >
                <FormControlLabel
                    value="fixed"
                    control={<Radio />}
                    label={t('pricingOptions.fixedPrice')}
                />
                <FormControlLabel
                    value="pools"
                    control={<Radio />}
                    label={t('pricingOptions.ticketPools')}
                />
            </RadioGroup>
            {/* Fixed price input */}
            {pricingMode === 'fixed' && (
                <TextField
                    fullWidth
                    label={t('pricingOptions.ticketPrice')}
                    value={ticketPrice}
                    onChange={(e) => setTicketPrice(e.target.value)}
                    margin="normal"
                    type="number"
                    required
                />
            )}
            {/* Ticket pools manager */}
            {pricingMode === 'pools' && <TicketPoolsManager pools={pools} setPools={setPools} />}
        </FormControl>
    );
};

export default PricingOptions;
