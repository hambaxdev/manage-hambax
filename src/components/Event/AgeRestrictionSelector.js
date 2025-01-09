import React from 'react';
import { Box, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const ageRestrictions = [
    { value: 16, label: '16+' },
    { value: 18, label: '18+' },
    { value: 21, label: '21+' },
];

const AgeRestrictionSelector = ({ ageRestriction, setAgeRestriction }) => {
    const handleChange = (event) => {
        setAgeRestriction(event.target.value);
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Возрастное ограничение
            </Typography>
            <FormControl fullWidth margin="normal">
                <InputLabel id="age-restriction-label">Выберите возрастное ограничение</InputLabel>
                <Select
                    labelId="age-restriction-label"
                    value={ageRestriction}
                    onChange={handleChange}
                    label="Выберите возрастное ограничение"
                >
                    {ageRestrictions.map(({ value, label }) => (
                        <MenuItem key={value} value={value}>
                            {label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default AgeRestrictionSelector;
