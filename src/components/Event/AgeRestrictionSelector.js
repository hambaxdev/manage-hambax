import React from 'react';
import { Box, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ageRestrictions = [
    { value: 16, labelKey: 'ageRestriction.16' },
    { value: 18, labelKey: 'ageRestriction.18' },
    { value: 21, labelKey: 'ageRestriction.21' },
];

const AgeRestrictionSelector = ({ ageRestriction, setAgeRestriction }) => {
    const { t } = useTranslation();

    const handleChange = (event) => {
        setAgeRestriction(event.target.value);
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                {t('ageRestriction.title')}
            </Typography>
            <FormControl fullWidth margin="normal">
                <InputLabel id="age-restriction-label">{t('ageRestriction.label')}</InputLabel>
                <Select
                    labelId="age-restriction-label"
                    value={ageRestriction}
                    onChange={handleChange}
                    label={t('ageRestriction.label')}
                >
                    {ageRestrictions.map(({ value, labelKey }) => (
                        <MenuItem key={value} value={value}>
                            {t(labelKey)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default AgeRestrictionSelector;
