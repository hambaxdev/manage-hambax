import React from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

const TicketPoolsManager = ({ pools, setPools }) => {
    const { t } = useTranslation();

    console.log(pools);

    /**
     * Adds a new ticket pool to the list.
     */
    const handleAddPool = () => {
        setPools([
            ...pools,
            { name: '', price: '', quantity: '', startDate: '', endDate: '' },
        ]);
    };

    /**
     * Removes a specific ticket pool by index.
     * 
     * @param {number} index - The index of the pool to remove.
     */
    const handleRemovePool = (index) => {
        const newPools = pools.filter((_, i) => i !== index);
        setPools(newPools);
    };

    /**
     * Updates a specific field in the ticket pool.
     * 
     * @param {number} index - The index of the pool to update.
     * @param {string} field - The field to update.
     * @param {any} value - The new value to set.
     */
    const handlePoolChange = (index, field, value) => {
        const newPools = [...pools];
        newPools[index][field] = value;
        setPools(newPools);
    };

    /**
     * Formats a date string to be compatible with input[type="date"].
     * 
     * @param {string} dateString - The date string in ISO format.
     * @returns {string} - The formatted date string (YYYY-MM-DD).
     */
    const formatDate = (dateString) => {
        if (!dateString) return "";
        return dateString.split("T")[0];
    };

    return (
        <>
            {pools.map((pool, index) => (
                <Grid container spacing={2} key={index} style={{ marginBottom: '1rem' }}>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            label={t('ticketPools.poolName')}
                            value={pool.name}
                            onChange={(e) => handlePoolChange(index, 'name', e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            label={t('ticketPools.price')}
                            type="number"
                            value={pool.price}
                            onChange={(e) => handlePoolChange(index, 'price', e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            label={t('ticketPools.quantity')}
                            type="number"
                            value={pool.quantity}
                            onChange={(e) => handlePoolChange(index, 'quantity', e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            type="date"
                            label={t('ticketPools.startDate')}
                            value={formatDate(pool.startDate)}
                            onChange={(e) => handlePoolChange(index, 'startDate', e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            type="date"
                            label={t('ticketPools.endDate')}
                            value={formatDate(pool.endDate)}
                            onChange={(e) => handlePoolChange(index, 'endDate', e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleRemovePool(index)}
                            disabled={pools.length <= 2}
                        >
                            {t('ticketPools.remove')}
                        </Button>
                    </Grid>
                </Grid>
            ))}
            <Button variant="contained" color="primary" onClick={handleAddPool}>
                {t('ticketPools.add')}
            </Button>
        </>
    );
};

export default TicketPoolsManager;
