// src/components/DynamicCard.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const DynamicCard = ({ card }) => {
    switch (card.type) {
        case 'info':
            return (
                <Card>
                    <CardContent>
                        <Typography variant="h6">{card.title}</Typography>
                        <Typography>{card.message}</Typography>
                    </CardContent>
                </Card>
            );

        case 'scan-summary':
            return (
                <Card>
                    <CardContent>
                        <Typography variant="h6">{card.title}</Typography>
                        <Typography>Scanned: {card.count}</Typography>
                    </CardContent>
                </Card>
            );

        default:
            return null;
    }
};

export default DynamicCard;
