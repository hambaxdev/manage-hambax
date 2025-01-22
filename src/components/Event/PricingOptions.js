import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import FixedPriceTab from './FixedPriceTab';
import TicketPoolsTab from './TicketPoolsTab';

const PricingOptions = ({
    activeTab,
    setActiveTab,
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
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Box>
            <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
                <Tab label="Fixed Price" />
                <Tab label="Ticket Pools" />
            </Tabs>

            {activeTab === 0 && (
                <FixedPriceTab
                    ticketPrice={ticketPrice}
                    setTicketPrice={setTicketPrice}
                    limitTickets={limitTickets}
                    setLimitTickets={setLimitTickets}
                    ticketLimit={ticketLimit}
                    setTicketLimit={setTicketLimit}
                    errors={errors}
                />
            )}

            {activeTab === 1 && (
                <TicketPoolsTab
                    pools={pools}
                    setPools={setPools}
                    errors={errors}
                />
            )}
        </Box>
    );
};

export default PricingOptions;
