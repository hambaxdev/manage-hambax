// src/components/TicketPoolsManager.js
import React from 'react';
import { Typography, TextField, Button, Grid } from '@mui/material';

const TicketPoolsManager = ({ pools, setPools }) => {
    const handleAddPool = () => {
        setPools([
            ...pools,
            { name: '', price: '', quantity: '', startDate: '', endDate: '' },
        ]);
    };

    const handleRemovePool = (index) => {
        const newPools = pools.filter((_, i) => i !== index);
        setPools(newPools);
    };

    const handlePoolChange = (index, field, value) => {
        const newPools = [...pools];
        newPools[index][field] = value;
        setPools(newPools);
    };

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Пулы билетов
            </Typography>
            {pools.map((pool, index) => (
                <Grid container spacing={2} key={index} style={{ marginBottom: '1rem' }}>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            label="Название пула"
                            value={pool.name}
                            onChange={(e) => handlePoolChange(index, 'name', e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            label="Цена"
                            type="number"
                            value={pool.price}
                            onChange={(e) => handlePoolChange(index, 'price', e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            label="Количество"
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
                            label="Дата начала"
                            value={pool.startDate}
                            onChange={(e) => handlePoolChange(index, 'startDate', e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Дата окончания"
                            value={pool.endDate}
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
                            Удалить
                        </Button>
                    </Grid>
                </Grid>
            ))}
            <Button variant="contained" color="primary" onClick={handleAddPool}>
                Добавить пул
            </Button>
        </>
    );
};

export default TicketPoolsManager;
