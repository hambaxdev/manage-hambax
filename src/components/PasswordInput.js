import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordInput = ({ label, value, onChange, showPassword, toggleShowPassword, error, helperText }) => (
    <TextField
        label={label}
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        fullWidth
        margin="normal"
        value={value}
        onChange={onChange}
        error={error}
        helperText={helperText}
        InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton onClick={toggleShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            ),
        }}
    />
);

export default PasswordInput;
