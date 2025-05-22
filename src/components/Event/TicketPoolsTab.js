import React, { useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography, IconButton, Switch, FormControlLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

const TicketPoolsTab = ({ pools, setPools, errors = { general: '', pools: [] }, useTicketPools }) => {
    const { t } = useTranslation();

    useEffect(() => {

        if (useTicketPools === undefined) {
            return;
        }

        if (useTicketPools) {
            setPools((prevPools) => {
                if (prevPools.length > 0) {
                    return prevPools;
                }

                return [
                    { name: '', price: '', quantity: '', limitTickets: false, startDate: '', endDate: '' },
                    { name: '', price: '', quantity: '', limitTickets: false, startDate: '', endDate: '' },
                ];
            });
        } else {
            setPools([]); 
        }
    }, [useTicketPools, setPools]);

    const handleAddPool = () => {
        setPools((prevPools) => [
            ...prevPools,
            { name: '', price: '', quantity: '', limitTickets: false, startDate: '', endDate: '' }
        ]);
    };

    const handleRemovePool = (index) => {
        setPools((prevPools) => prevPools.length > 2 ? prevPools.filter((_, i) => i !== index) : prevPools);
    };

    const handlePoolChange = (index, field, value) => {
        setPools((prevPools) => {
            const newPools = [...prevPools];
            newPools[index][field] = value;
            return newPools;
        });
    };


    return (
        <Box mt={2}>
            {errors.general && (
                <Typography color="error" variant="body2" gutterBottom>
                    {errors.general}
                </Typography>
            )}

            {pools.length === 0 ? (
                <Typography color="error">{t('ticketPools.noPoolsAvailable')}</Typography>
            ) : (
                pools.map((pool, index) => (
                    <Box
                        key={index}
                        sx={{
                            border: '1px solid #ccc',
                            borderRadius: 2,
                            padding: 2,
                            mb: 2,
                            position: 'relative',
                        }}
                    >
                        <IconButton
                            size="small"
                            onClick={() => handleRemovePool(index)}
                            disabled={pools.length <= 2}
                            sx={{ position: 'absolute', top: 8, right: 8 }}
                        >
                            <CloseIcon />
                        </IconButton>

                        <Typography variant="subtitle1" mb={2}>
                            {t('ticketPools.pool')} {index + 1}
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label={t('ticketPools.poolName')}
                                    value={pool.name}
                                    onChange={(e) => handlePoolChange(index, 'name', e.target.value)}
                                    required
                                    error={!!errors.pools?.[index]?.name}
                                    helperText={errors.pools?.[index]?.name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label={t('ticketPools.price')}
                                    type="number"
                                    value={pool.price}
                                    onChange={(e) => handlePoolChange(index, 'price', e.target.value)}
                                    required
                                    error={!!errors.pools?.[index]?.price}
                                    helperText={errors.pools?.[index]?.price}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    type="date"
                                    label={t('ticketPools.startDate')}
                                    value={pool.startDate ? pool.startDate.slice(0, 10) : ''}
                                    onChange={(e) => handlePoolChange(index, 'startDate', e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    required
                                    error={!!errors.pools?.[index]?.startDate}
                                    helperText={errors.pools?.[index]?.startDate}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    type="date"
                                    label={t('ticketPools.endDate')}
                                    value={pool.endDate ? pool.endDate.slice(0, 10) : ''}
                                    onChange={(e) => handlePoolChange(index, 'endDate', e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    required
                                    error={!!errors.pools?.[index]?.endDate}
                                    helperText={errors.pools?.[index]?.endDate}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={pool.limitTickets}
                                            onChange={(e) => handlePoolChange(index, 'limitTickets', e.target.checked)}
                                            color="primary"
                                        />
                                    }
                                    label={t('ticketPools.limitTickets')}
                                />
                                {pool.limitTickets && (
                                    <TextField
                                        fullWidth
                                        label={t('ticketPools.quantity')}
                                        type="number"
                                        value={pool.quantity}
                                        onChange={(e) => handlePoolChange(index, 'quantity', e.target.value)}
                                        margin="normal"
                                        error={!!errors.pools?.[index]?.quantity}
                                        helperText={errors.pools?.[index]?.quantity}
                                    />
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                ))
            )}

            <Button
                variant="contained"
                color="primary"
                onClick={handleAddPool}
                sx={{ mt: 2 }}
            >
                {t('ticketPools.addPool')}
            </Button>
        </Box>
    );
};

export default TicketPoolsTab;
