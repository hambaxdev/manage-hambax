import React, { useState } from 'react';
import { IconButton, Tooltip, Popover, Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const InfoTooltip = ({ text }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'info-popover' : undefined;

    return (
        <>
            {/* Отображаем иконку с tooltip при наведении */}
            <Tooltip title="Подробнее">
                <IconButton size="small" onClick={handleClick}>
                    <HelpOutlineIcon fontSize="small" />
                </IconButton>
            </Tooltip>

            {/* Всплывающее окно с информацией */}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 2, maxWidth: 300 }}>
                    {text}
                </Typography>
            </Popover>
        </>
    );
};

export default InfoTooltip;
