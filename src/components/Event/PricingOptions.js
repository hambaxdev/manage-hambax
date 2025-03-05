import React from 'react';
import { Box, Switch, FormControlLabel } from '@mui/material';
import FixedPriceTab from './FixedPriceTab';
import TicketPoolsTab from './TicketPoolsTab';
import InfoTooltip from '../InfoTooltip';
import { useTranslation } from 'react-i18next';

const PricingOptions = ({
    useTicketPools,
    setUseTicketPools,
    ticketPrice,
    setTicketPrice,
    limitTickets,
    setLimitTickets,
    ticketLimit,
    setTicketLimit,
    pools,
    setPools,
    errors,
}) => {
    const { t } = useTranslation();

    return (
        <Box>
            <Box display="flex" alignItems="center">
                <FormControlLabel
                    control={
                        <Switch
                            checked={useTicketPools}
                            onChange={(e) => setUseTicketPools(e.target.checked)}
                            color="primary"
                        />
                    }
                    label={t('pricing.useTicketPools')}
                />
                <InfoTooltip text={t('pricing.tooltipText')} />
            </Box>

            {!useTicketPools ? (
                <FixedPriceTab
                    ticketPrice={ticketPrice}
                    setTicketPrice={setTicketPrice}
                    limitTickets={limitTickets}
                    setLimitTickets={setLimitTickets}
                    ticketLimit={ticketLimit}
                    setTicketLimit={setTicketLimit}
                    errors={errors}
                />
            ) : (
                <TicketPoolsTab pools={pools} setPools={setPools} errors={errors} />
            )}
        </Box>
    );
};

export default PricingOptions;
